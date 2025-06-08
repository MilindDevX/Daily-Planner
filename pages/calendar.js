import React, { useContext } from 'react';
import Navbar from '../app/components/Navbar';
import { TaskContext } from '../app/context/TaskContext';

const Calendar = () => {
  const { tasks, currentMonth, setCurrentMonth, getTasksForDate } = useContext(TaskContext);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const navigateMonth = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const renderCalendarCells = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth);
    const startDay = getFirstDayOfMonth(currentMonth);

    const today = new Date();

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`blank-${i}`} className="h-24 border" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const isToday = date.toDateString() === today.toDateString();
      const dayTasks = getTasksForDate(date);

      days.push(
        <div key={d} className={`h-24 border p-1 ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}>
          <div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : ''}`}>{d}</div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`text-xs p-1 rounded truncate ${
                  task.completed ? 'bg-green-100 text-green-800 line-through'
                  : task.priority === 'high' ? 'bg-red-100 text-red-800'
                  : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
                }`}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getTaskStats = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const filtered = tasks.filter(task => {
      const date = new Date(task.deadline);
      return date.getMonth() === month && date.getFullYear() === year;
    });

    const completed = filtered.filter(t => t.completed).length;
    const pending = filtered.filter(t => !t.completed).length;
    const overdue = filtered.filter(t => !t.completed && new Date(t.deadline) < new Date()).length;

    return { total: filtered.length, completed, pending, overdue };
  };

  const stats = getTaskStats();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calendar View</h1>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateMonth(-1)} className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← Prev</button>
            <h2 className="text-lg font-semibold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
            <button onClick={() => navigateMonth(1)} className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next →</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Tasks" value={stats.total} color="text-gray-800" />
          <StatCard label="Completed" value={stats.completed} color="text-green-600" />
          <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
          <StatCard label="Overdue" value={stats.overdue} color="text-red-600" />
        </div>

        <div className="bg-white border rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 text-center font-medium text-sm text-gray-600">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="p-2 border-b">{d}</div>)}
          </div>
          <div className="grid grid-cols-7">{renderCalendarCells()}</div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-white border rounded-lg p-4 text-center shadow">
    <div className={`text-xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

export default Calendar;
