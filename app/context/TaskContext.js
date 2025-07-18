import React, { createContext, useState, useEffect } from 'react';
import { Tasks } from '../data.js'; 
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    completed: false,
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setTasks(Tasks);
  }, []);

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      deadline: '',
      priority: 'medium',
      completed: false,
    });
    setEditingTask(null);
    setShowTaskModal(false);
  };

  const addTask = () => {
    const newTask = { id: Date.now(), ...taskForm };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  const updateTask = () => {
    setTasks(tasks.map(task => (task.id === editingTask.id ? { ...editingTask, ...taskForm } : task)));
    resetForm();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTimeUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(`${deadline}T23:59:59`);
    const diff = deadlineDate - now;
    if (diff <= 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    return tasks.filter(task => task.deadline === dateStr);
  };

  const getUrgentTasks = () => {
    const today = new Date();
    const inThreeDays = new Date();
    inThreeDays.setDate(today.getDate() + 3);
    return tasks
      .filter(task => !task.completed)
      .filter(task => new Date(task.deadline) <= inThreeDays)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    return tasks
      .filter(task => !task.completed)
      .filter(task => new Date(task.deadline) >= today)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        editingTask,
        setEditingTask,
        showTaskModal,
        setShowTaskModal,
        taskForm,
        setTaskForm,
        currentMonth,
        setCurrentMonth,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        getDaysUntilDeadline,
        getTimeUntilDeadline,
        getPriorityColor,
        getTasksForDate,
        getUrgentTasks,
        getUpcomingTasks,
        resetForm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
