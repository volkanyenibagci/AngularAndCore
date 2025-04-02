export interface Todo {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
} 