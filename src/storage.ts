import type { Task } from './types';

const STORAGE_KEY = 'focusboard.tasks.v1';

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getStarterTasks();

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return getStarterTasks();

    // Validate the basic shape before trusting persisted browser data.
    return parsed.filter((item): item is Task =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.completed === 'boolean' &&
      typeof item.createdAt === 'number' &&
      ['Work', 'Learning', 'Personal'].includes(item.category) &&
      ['Low', 'Medium', 'High'].includes(item.priority) &&
      typeof item.dueDate === 'string'
    );
  } catch {
    return getStarterTasks();
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // The app remains usable for the current session if storage is unavailable.
  }
}

function getStarterTasks(): Task[] {
  const today = new Date();
  const date = (offset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };

  return [
    { id: 'starter-1', title: 'Review the React component structure', category: 'Learning', priority: 'High', dueDate: date(0), completed: false, createdAt: 1 },
    { id: 'starter-2', title: 'Finish the internship task notes', category: 'Work', priority: 'Medium', dueDate: date(1), completed: false, createdAt: 2 },
    { id: 'starter-3', title: 'Take a short screen break', category: 'Personal', priority: 'Low', dueDate: date(0), completed: true, createdAt: 3 }
  ];
}