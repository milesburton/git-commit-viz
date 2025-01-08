export type MonthLabel = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
export type WeekdayLabel = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface CommitData {
  timestamp: string;
  timezone: string;
}

export interface DayData {
  date: string;
  count: number;
  weekday: number;
  commits: CommitData[];
}

export type WeekData = DayData[];

export interface ContributionLevel {
  threshold: number;
  color: string;
  label: string;
}
