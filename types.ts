export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO String
  source: 'local' | 'api';
}

export type FilterType = 'all' | 'pending' | 'completed';

export type ScreenType = 'list' | 'details' | 'add' | 'edit' | 'settings';
