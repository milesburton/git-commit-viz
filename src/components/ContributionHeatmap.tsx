import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import _ from 'lodash';

interface DayData {
  date: string;
  count: number;
  weekday: number;
}

const ContributionHeatmap: React.FC = () => {
  const commitData = [
    '2025-01-07 16:58:25 +0000',
    '2025-01-07 12:16:14 +0000',
  ];

  const data = useMemo<DayData[][]>(() => {
    // Normalize dates to handle different timezones
    const normalizedCommits = commitData.map(commit => {
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
      allDates.push({
        date: dateStr,
        count: (commitsByDate[dateStr] || []).length,
        weekday: currentDate.getDay()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Group by weeks
    return _.chunk(allDates, 7);
  }, [commitData]);

  const getColor = (count: number): string => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-green-100';
    if (count <= 4) return 'bg-green-300';
    if (count <= 6) return 'bg-green-500';
    return 'bg-green-700';
  };

  const monthLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex gap-1">
            <div className="w-8" /> {/* Spacer for alignment with grid */}
            {monthLabels.map((month, i) => (
              <div key={i} className="flex-1 text-xs text-gray-600">{month}</div>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 text-xs text-gray-600 pr-2">
              <div className="h-3">Mon</div>
              <div className="h-3">Tue</div>
              <div className="h-3">Wed</div>
              <div className="h-3">Thu</div>
              <div className="h-3">Fri</div>
              <div className="h-3">Sat</div>
              <div className="h-3">Sun</div>
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
          <div className="w-3 h-3 bg-gray-100 rounded-sm" />
          <div className="w-3 h-3 bg-green-100 rounded-sm" />
          <div className="w-3 h-3 bg-green-300 rounded-sm" />
          <div className="w-3 h-3 bg-green-500 rounded-sm" />
          <div className="w-3 h-3 bg-green-700 rounded-sm" />
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionHeatmap;
