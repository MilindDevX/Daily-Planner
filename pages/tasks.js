import React, { useContext } from 'react';
import { TaskContext } from '../app/context/TaskContext';
import TasksPage from '../app/components/TasksPage';
import Navbar from '../app/components/Navbar';

const Tasks = () => {
  const {
    tasks,
    toggleComplete,
    deleteTask,
    setShowTaskModal,
    setEditingTask,
    setTaskForm,
    getDaysUntilDeadline,
    getPriorityColor,
  } = useContext(TaskContext);

  const openEditModal = (task) => {
    setEditingTask(task);
    setTaskForm(task);
    setShowTaskModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <TasksPage
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          openEditModal={openEditModal}
          getDaysUntilDeadline={getDaysUntilDeadline}
          getPriorityColor={getPriorityColor}
          setShowTaskModal={setShowTaskModal}
        />
      </main>
    </div>
  );
};

export default Tasks;
