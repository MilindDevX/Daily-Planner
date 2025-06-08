import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';
import TaskTimer from './TaskTimer';

const HomePage = ({ tasks, currentTime, getUrgentTasks, getUpcomingTasks, getDaysUntilDeadline, getPriorityColor }) => {
  const urgentTasks = getUrgentTasks();
  const upcomingTasks = getUpcomingTasks();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Daily Planner</h1>
        <p className="text-blue-100">Stay organized and productive with your personalized task management</p>
        <div className="mt-4 text-lg font-mono">{currentTime.toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox icon={<CheckCircle2 className="h-8 w-8 text-green-500 mr-3" />} title="Total Tasks" value={tasks.length} />
        <StatBox icon={<Clock className="h-8 w-8 text-orange-500 mr-3" />} title="Pending" value={tasks.filter(t => !t.completed).length} />
        <StatBox icon={<AlertCircle className="h-8 w-8 text-red-500 mr-3" />} title="Urgent" value={urgentTasks.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList title="Urgent Tasks (Next 3 Days)" icon={<AlertCircle className="h-5 w-5 text-red-500 mr-2" />} tasks={urgentTasks} getDaysUntilDeadline={getDaysUntilDeadline} getPriorityColor={getPriorityColor} />
        <TaskList title="Upcoming Tasks" icon={<Clock className="h-5 w-5 text-blue-500 mr-2" />} tasks={upcomingTasks.slice(0, 5)} getDaysUntilDeadline={getDaysUntilDeadline} getPriorityColor={getPriorityColor} />
      </div>
    </div>
  );
};

const StatBox = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border">
    <div className="flex items-center mb-4">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
      </div>
    </div>
  </div>
);

const TaskList = ({ title, icon, tasks, getDaysUntilDeadline, getPriorityColor }) => (
  <div className="bg-white rounded-lg shadow-md border">
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold flex items-center">
        {icon} {title}
      </h2>
    </div>
    <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks found.</p>
      ) : (
        tasks.map(task => {
          const daysLeft = getDaysUntilDeadline(task.deadline);
          return (
            <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{task.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {task.deadline}
                </span>
                <div className="flex items-center space-x-2">
                  
                  <span className={`text-sm font-medium ${daysLeft <= 1 ? 'text-red-600' : daysLeft <= 2 ? 'text-orange-600' : 'text-blue-600'}`}>
                    {daysLeft === 0 ? 'Due Today' : daysLeft === 1 ? 'Due Tomorrow' : `${daysLeft} days left`}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);

export default HomePage;
