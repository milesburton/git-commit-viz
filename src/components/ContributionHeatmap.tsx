import React, { useMemo } from 'react';
import _ from 'lodash';
import type { DayData, WeekData, MonthLabel, WeekdayLabel, ContributionLevel } from '@/types';

interface CommitPattern {
  probability: number;
  maxCommits: number;
}

const contributionLevels: ContributionLevel[] = [
  { threshold: 0, color: 'bg-zinc-100', label: 'No contributions' },
  { threshold: 1, color: 'bg-emerald-100', label: 'Low contributions' },
  { threshold: 3, color: 'bg-emerald-300', label: 'Medium contributions' },
  { threshold: 5, color: 'bg-emerald-500', label: 'High contributions' },
  { threshold: 7, color: 'bg-emerald-700', label: 'Very high contributions' },
];

const monthLabels: MonthLabel[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayLabels: WeekdayLabel[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateRandomCommits = (): string[] => {
  const commits: string[] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 365); // Go back one year

  const patterns: CommitPattern[] = [
    { probability: 0.8, maxCommits: 8 },  // Weekdays (Mon-Fri)
    { probability: 0.3, maxCommits: 3 },  // Weekends
    { probability: 0.95, maxCommits: 12 }, // Random "busy" days
  ];

  let currentDate = new Date(startDate);
  
  while (currentDate <= now) {
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const weekdayPattern = patterns[0] ?? { probability: 0.8, maxCommits: 8 };
    const weekendPattern = patterns[1] ?? { probability: 0.3, maxCommits: 3 };
    const busyPattern = patterns[2] ?? { probability: 0.95, maxCommits: 12 };
    
    const defaultPattern = isWeekend ? weekendPattern : weekdayPattern;
    const isBusyDay = Math.random() < 0.1;
    const activePattern = isBusyDay ? busyPattern : defaultPattern;

    if (Math.random() < activePattern.probability) {
      const numCommits = Math.floor(Math.random() * activePattern.maxCommits) + 1;
      
      for (let i = 0; i < numCommits; i++) {
        const hours = Math.floor(Math.random() * 13) + 9;
        const minutes = Math.floor(Math.random() * 60);
        const seconds = Math.floor(Math.random() * 60);
        
        const commitDate = new Date(currentDate);
        commitDate.setHours(hours, minutes, seconds);
        
        commits.push(commitDate.toISOString().replace('T', ' ').slice(0, -5) + ' +0000');
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return commits.sort();
};

const ContributionHeatmap: React.FC = () => {
  const commitData = useMemo(() => generateRandomCommits(), []);

  const data = useMemo<WeekData[]>(() => {
    const normalizedCommits = commitData.map((commit: string): string => {
      const date = new Date(commit);
      return date.toISOString().split('T')[0] ?? '';
    }).filter(Boolean);

    const commitsByDate: Record<string, string[]> = _.groupBy(normalizedCommits);
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 371);
    
    const allDates: DayData[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (!dateStr) continue;

      const dateCommits = commitsByDate[dateStr] ?? [];
      
      allDates.push({
        date: dateStr,
        count: dateCommits.length,
        weekday: currentDate.getDay(),
        commits: dateCommits.map(commit => ({
          timestamp: commit,
          timezone: commit.split(' ')[2] ?? '+0000'
        }))
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return _.chunk(allDates, 7) as WeekData[];
  }, [commitData]);

  const getColor = (count: number): string => {
    const level = contributionLevels
      .slice()
      .reverse()
      .find(level => count >= level.threshold);
    
    return level?.color ?? contributionLevels[0]?.color ?? 'bg-zinc-100';
  };

  const totalContributions = useMemo(() => 
    data.flat().reduce((sum, day) => sum + day.count, 0)
  , [data]);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Contribution Activity</h3>
        <p className="mt-2 text-sm text-gray-600">{totalContributions} contributions in the last year</p>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex gap-1">
            <div className="w-8" />
            {monthLabels.map((month, i) => (
              <div key={i} className="flex-1 text-xs text-gray-600">{month}</div>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 text-xs text-gray-600 pr-2">
              {weekdayLabels.map((day, index) => (
                <div key={index} className="h-3">{day}</div>
              ))}
            </div>
            {data.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                    title={`${day.date}: ${day.count} commits`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
          <span>Less</span>
          {contributionLevels.map((level, index) => (
            <div 
              key={index}
              className={`w-3 h-3 ${level.color} rounded-sm`} 
              title={level.label}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
