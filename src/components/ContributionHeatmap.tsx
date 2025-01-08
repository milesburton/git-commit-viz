import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import _ from 'lodash';
import type { DayData, WeekData, MonthLabel, WeekdayLabel, ContributionLevel } from '@/types';

const contributionLevels: ContributionLevel[] = [
  { threshold: 0, color: 'bg-gray-100', label: 'No contributions' },
  { threshold: 1, color: 'bg-green-100', label: 'Low contributions' },
  { threshold: 3, color: 'bg-green-300', label: 'Medium contributions' },
  { threshold: 5, color: 'bg-green-500', label: 'High contributions' },
  { threshold: 7, color: 'bg-green-700', label: 'Very high contributions' },
];

const monthLabels: MonthLabel[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayLabels: WeekdayLabel[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ContributionHeatmap: React.FC = () => {
  const commitData = [
    '2025-01-07 16:58:25 +0000',
    '2025-01-07 12:16:14 +0000',
  ];

  const data = useMemo<WeekData[]>(() => {
    // Normalize dates to handle different timezones
    const normalizedCommits = commitData.map((commit): string => {
      const date = new Date(commit);
      return date.toISOString().split('T')[0];
    });

    // Group commits by date
    const commitsByDate = _.groupBy(normalizedCommits);
    
    // Get date range
    const endDate = new Date(); // Today
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 371); // Go back 53 weeks
    
    // Create array of all dates in range
    const allDates: DayData[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const commits = commitsByDate[dateStr] || [];
      
      allDates.push({
        date: dateStr,
        count: commits.length,
        weekday: currentDate.getDay(),
        commits: commits.map(commit => ({
          timestamp: commit,
          timezone: commit.split(' ')[2]
        }))
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Group by weeks
    return _.chunk(allDates, 7);
  }, [commitData]);

  const getColor = (count: number): string => {
    const level = contributionLevels
      .slice()
      .reverse()
      .find(level => count >= level.threshold);
    
    return level?.color ?? contributionLevels[0].color;
  };

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default ContributionHeatmap;
