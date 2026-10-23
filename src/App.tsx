import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDownUp, Check, CheckCircle2, Circle, ClipboardList, Clock3,
  ListFilter, Plus, Search, Sparkles, Target, Trash2, X
} from 'lucide-react';
import { loadTasks, saveTasks } from './storage';
import type { Task, TaskCategory, TaskFilter, TaskPriority } from './types';

const categories: TaskCategory[] = ['Work', 'Learning', 'Personal'];
const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

function localDate(offset = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(date: string): string {
  if (!date) return 'No due date';
  const parsed = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(parsed);
}

function createTask(title: string, category: TaskCategory, priority: TaskPriority, dueDate: string): Task {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    category,
    priority,
    dueDate,
    completed: false,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<TaskFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All categories' | TaskCategory>('All categories');
  const [query, setQuery] = useState('');
  const [sortByPriority, setSortByPriority] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Work');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState(localDate());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const visibleTasks = useMemo(() => {
    const priorityRank: Record<TaskPriority, number> = { High: 0, Medium: 1, Low: 2 };
    return tasks
      .filter((task) => {
        const matchesStatus =
          filter === 'All' || (filter === 'Active' && !task.completed) ||
          (filter === 'Completed' && task.completed);
        const matchesCategory = categoryFilter === 'All categories' || task.category === categoryFilter;
        const matchesSearch = task.title.toLowerCase().includes(query.trim().toLowerCase());
        return matchesStatus && matchesCategory && matchesSearch;
      })
      .sort((a, b) => sortByPriority
        ? priorityRank[a.priority] - priorityRank[b.priority]
        : Number(a.completed) - Number(b.completed) || a.createdAt - b.createdAt);
  }, [tasks, filter, categoryFilter, query, sortByPriority]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedTitle = title.trim();
    if (!cleanedTitle) return;
    setTasks((current) => [createTask(cleanedTitle, category, priority, dueDate), ...current]);
    setTitle('');
    setCategory('Work');
    setPriority('Medium');
    setDueDate(localDate());
    setIsFormOpen(false);
    setFilter('All');
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed));
  }

  const todayTasks = tasks.filter((task) => !task.completed && task.dueDate === localDate()).length;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="FocusBoard home">
          <span className="brand-mark"><Target size={21} /></span>
          <span>focus<span className="brand-light">board</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Task filters">
          <button className={`nav-item ${filter === 'All' ? 'selected' : ''}`} onClick={() => setFilter('All')}>
            <ClipboardList size={18} /><span>All tasks</span><span className="nav-count">{tasks.length}</span>
          </button>
          <button className={`nav-item ${filter === 'Active' ? 'selected' : ''}`} onClick={() => setFilter('Active')}>
            <Circle size={18} /><span>In progress</span><span className="nav-count">{activeCount}</span>
          </button>
          <button className={`nav-item ${filter === 'Completed' ? 'selected' : ''}`} onClick={() => setFilter('Completed')}>
            <CheckCircle2 size={18} /><span>Completed</span><span className="nav-count">{completedCount}</span>
          </button>
        </nav>
        <div className="sidebar-divider" />
        <div className="workspace-label">CATEGORIES</div>
        <div className="category-list">
          {categories.map((item) => (
            <button key={item} className={`category-item ${categoryFilter === item ? 'category-selected' : ''}`} onClick={() => setCategoryFilter(categoryFilter === item ? 'All categories' : item)}>
              <span className={`category-dot ${item.toLowerCase()}`} />{item}
            </button>
          ))}
        </div>
        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon"><Sparkles size={17} /></div>
          <strong>Small steps count.</strong>
          <p>Focus on the next useful thing, not everything at once.</p>
        </div>
        <div className="sidebar-footer"><span className="online-dot" /> Local workspace <span className="footer-version">v1.0</span></div>
      </aside>

      <section className="main-panel" id="top">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>My tasks</strong></div>
          <div className="topbar-right"><span className="today-label">{new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date())}</span><div className="avatar" aria-label="Your profile">H</div></div>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL WORKSPACE</div>
              <h1>Make room for <span>good work.</span></h1>
              <p className="subtitle">A clearer plan for today starts with one small step.</p>
            </div>
            <button className="primary-button" onClick={() => setIsFormOpen(true)}><Plus size={18} /> Add a task</button>
          </div>

          <section className="stats-grid" aria-label="Task overview">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Total tasks</span><span className="stat-icon purple"><ClipboardList size={18} /></span></div>
              <div className="stat-value">{tasks.length}</div><div className="stat-caption">Across your workspace</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">In progress</span><span className="stat-icon blue"><Clock3 size={18} /></span></div>
              <div className="stat-value">{activeCount}</div><div className="stat-caption">{todayTasks} due today</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Completed</span><span className="stat-icon green"><Check size={18} /></span></div>
              <div className="stat-value">{completedCount}</div><div className="stat-caption">Nice work — keep going</div>
            </article>
            <article className="stat-card progress-card">
              <div className="stat-top"><span className="stat-label">Your progress</span><span className="stat-percent">{progress}%</span></div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
              <div className="stat-caption">Of all tasks completed</div>
            </article>
          </section>

          <section className="task-section">
            <div className="section-heading">
              <div><h2>My tasks <span className="heading-count">{visibleTasks.length}</span></h2><p>Keep the important things moving.</p></div>
              <button className={`text-button ${sortByPriority ? 'active-text-button' : ''}`} onClick={() => setSortByPriority((current) => !current)}><ArrowDownUp size={15} /> {sortByPriority ? 'Priority order' : 'Sort by priority'}</button>
            </div>
            <div className="toolbar">
              <label className="search-box"><Search size={17} /><span className="sr-only">Search tasks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your tasks..." /></label>
              <label className="filter-select"><ListFilter size={16} /><span className="sr-only">Filter by category</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value as typeof categoryFilter)}><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <div className="mobile-tabs" aria-label="Task status">
              {(['All', 'Active', 'Completed'] as TaskFilter[]).map((item) => <button key={item} className={filter === item ? 'mobile-tab active' : 'mobile-tab'} onClick={() => setFilter(item)}>{item}</button>)}
            </div>

            {visibleTasks.length > 0 ? (
              <div className="task-list">
                {visibleTasks.map((task) => (
                  <article className={`task-row ${task.completed ? 'task-completed' : ''}`} key={task.id}>
                    <button className={`task-check ${task.completed ? 'checked' : ''}`} onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Mark ${task.title} as active` : `Complete ${task.title}`}>
                      {task.completed && <Check size={14} strokeWidth={3} />}
                    </button>
                    <div className="task-copy"><div className="task-title">{task.title}</div><div className="task-meta"><span className={`category-pill ${task.category.toLowerCase()}`}>{task.category}</span><span className="meta-dot">·</span><span>{formatDate(task.dueDate)}</span></div></div>
                    <span className={`priority-pill ${task.priority.toLowerCase()}`}><span />{task.priority}</span>
                    <button className="icon-button delete-button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete task"><Trash2 size={16} /></button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state"><div className="empty-icon"><ClipboardList size={24} /></div><h3>{query ? 'No matching tasks' : 'Nothing on this list yet'}</h3><p>{query ? 'Try a different search or category.' : 'Add a task to turn your next step into progress.'}</p>{query ? <button className="secondary-button" onClick={() => { setQuery(''); setCategoryFilter('All categories'); }}>Clear filters</button> : <button className="primary-button" onClick={() => setIsFormOpen(true)}><Plus size={17} /> Add your first task</button>}</div>
            )}
            {completedCount > 0 && <div className="list-footer"><span>{completedCount} task{completedCount === 1 ? '' : 's'} completed</span><button onClick={clearCompleted} className="clear-button">Clear completed</button></div>}
          </section>
          <footer className="page-footer"><span>Designed for focus, built for progress.</span><span><span className="footer-heart">✦</span> Your tasks stay in this browser.</span></footer>
        </div>
      </section>

      {isFormOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsFormOpen(false); }}>
          <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-heading"><div><span className="modal-kicker">MAKE IT HAPPEN</span><h2 id="modal-title">Add a new task</h2></div><button className="icon-button" onClick={() => setIsFormOpen(false)} aria-label="Close dialog"><X size={19} /></button></div>
            <form onSubmit={handleSubmit}>
              <label className="field-label" htmlFor="task-title">Task name</label>
              <input id="task-title" className="form-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What do you want to get done?" maxLength={120} autoFocus required />
              <div className="form-two-col"><div><label className="field-label" htmlFor="task-category">Category</label><select id="task-category" className="form-input" value={category} onChange={(event) => setCategory(event.target.value as TaskCategory)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div><div><label className="field-label" htmlFor="task-priority">Priority</label><select id="task-priority" className="form-input" value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}>{priorities.map((item) => <option key={item}>{item}</option>)}</select></div></div>
              <label className="field-label" htmlFor="task-date">Due date</label><input id="task-date" className="form-input" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} min={localDate(-365)} />
              <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setIsFormOpen(false)}>Cancel</button><button type="submit" className="primary-button" disabled={!title.trim()}><Plus size={17} /> Create task</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}