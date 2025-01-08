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

export interface WeekData extends Array<DayData> {}

export type MonthLabel = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
export type WeekdayLabel = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface ContributionLevel {
  threshold: number;
  color: string;
  label: string;
}

export type CommitIntensity = 'none' | 'low' | 'medium' | 'high' | 'very-high';
