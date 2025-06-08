import React from 'react';
import { Plus, Edit3, Trash2, Calendar, CheckCircle2 } from 'lucide-react';
import TaskTimer from './TaskTimer';

const TasksPage = ({
  tasks,
  toggleComplete,
  deleteTask,
  openEditModal,
  getDaysUntilDeadline,
  getPriorityColor,
  setShowTaskModal
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <button
          onClick={() => setShowTaskModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className={`bg-white border rounded-lg p-4 shadow-sm ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                    task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                </button>
                <div className="flex-1">
                  <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                  <p className={`text-gray-600 mt-1 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
                <button onClick={() => openEditModal(task)} className="text-blue-600 hover:text-blue-800 p-1">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Deadline: {task.deadline}
              </span>
              {!task.completed && (
                <div className="flex items-center space-x-3">
                  <TaskTimer task={task} />
                  <span className={`font-medium ${getDaysUntilDeadline(task.deadline) <= 1 ? 'text-red-600' : 'text-blue-600'}`}>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
