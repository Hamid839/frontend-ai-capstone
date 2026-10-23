export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskCategory = 'Work' | 'Learning' | 'Personal';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  createdAt: number;
}

export type TaskFilter = 'All' | 'Active' | 'Completed';