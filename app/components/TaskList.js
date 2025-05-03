"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import {
  CheckCircleIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';

// Priority order for sorting
const priorityOrder = { High: 1, Medium: 2, Low: 3 };

// Check if task is urgent (due within 24h and not completed)
function isUrgent(task) {
  if (!task.dueDate || task.completed) return false;
  const now = new Date();
  const due = new Date(task.dueDate);
  const diff = due - now;
  return diff <= 24 * 60 * 60 * 1000 && diff > 0;
}

// Sort tasks by priority, then due date
function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    const aDate = a.dueDate ? new Date(a.dueDate) : Infinity;
    const bDate = b.dueDate ? new Date(b.dueDate) : Infinity;
    return aDate - bDate;
  });
}

// Badge colors for due date and priority
const getDueDateBadgeColor = (task, isUrgentSection = false) => {
  if (isUrgentSection) return 'bg-red-500 text-white';
  if (task.completed) return 'bg-gray-300 text-gray-600';
  if (!task.dueDate) return 'bg-gray-100 text-gray-500';
  const today = new Date().toISOString().split('T')[0];
  if (task.dueDate < today) return 'bg-red-200 text-red-800';
  if (task.dueDate === today) return 'bg-blue-200 text-blue-800';
  return 'bg-green-200 text-green-800';
};
const getPriorityBadgeColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500 text-white';
    case 'Medium':
      return 'bg-yellow-400 text-gray-800';
    case 'Low':
      return 'bg-green-400 text-white';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

// Edit form component
function EditForm({
  editInput,
  setEditInput,
  editPriority,
  setEditPriority,
  editDueDate,
  setEditDueDate,
  saveEdit,
  cancelEdit,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveEdit();
      }}
      className="flex flex-col sm:flex-row gap-2 flex-1"
    >
      <input
        className="flex-1 border rounded px-2 py-1"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        required
      />
      <select
        className="border rounded px-2 py-1"
        value={editPriority}
        onChange={(e) => setEditPriority(e.target.value)}
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={editDueDate}
        onChange={(e) => setEditDueDate(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        Save
      </button>
      <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
}

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  // Edit state
  const [editingTask, setEditingTask] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editDueDate, setEditDueDate] = useState('');

  // Add new task
  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: input,
        completed: false,
        dueDate: dueDate || null,
        priority,
      },
    ]);
    setInput('');
    setPriority('Medium');
    setDueDate('');
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  // Start editing task
  const startEdit = (task) => {
    setEditingTask(task);
    setEditInput(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
  };

  // Save edited task
  const saveEdit = () => {
    setTasks(tasks.map((task) =>
      task.id === editingTask.id
        ? { ...task, title: editInput, priority: editPriority, dueDate: editDueDate }
        : task
    ));
    setEditingTask(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
  };

  // Urgent tasks exclude the one being edited (which moves to regular)
  const urgentTasks = sortTasks(
    tasks.filter(
      (task) =>
        isUrgent(task) && (!editingTask || editingTask.id !== task.id)
    )
  );

  // Regular tasks include the one being edited
  const regularTasks = sortTasks(
    tasks.filter(
      (task) =>
        !isUrgent(task) || (editingTask && editingTask.id === task.id)
    )
  );

  // Render each task or edit form
  function renderTaskItem(task, isUrgentSection = false) {
    const isEditing = editingTask && editingTask.id === task.id;
    return (
      <li
        key={task.id}
        className={`flex items-center justify-between mb-3 p-4 rounded-lg shadow transition
          ${task.completed ? 'bg-gray-100' : 'bg-white'}
          hover:shadow-lg`}
      >
        {isEditing ? (
          <EditForm
            editInput={editInput}
            setEditInput={setEditInput}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
            editDueDate={editDueDate}
            setEditDueDate={setEditDueDate}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        ) : (
          <>
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => toggleComplete(task.id)}
                className={`focus:outline-none`}
                title={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <CheckCircleIcon
                  className={`h-6 w-6 cursor-pointer ${
                    task.completed ? 'text-green-400' : 'text-gray-300 hover:text-green-600'
                  }`}
                />
              </button>
              <span
                className={`select-none text-lg ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.title}
              </span>
              <span
                className={`ml-2 text-xs px-2 py-1 rounded-full font-semibold ${getPriorityBadgeColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              {task.dueDate && (
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded-full font-semibold ${getDueDateBadgeColor(
                    task,
                    isUrgentSection
                  )}`}
                >
                  Due: {task.dueDate}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-blue-400 hover:text-blue-600"
                onClick={() => startEdit(task)}
                title="Edit Task"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => deleteTask(task.id)}
                title="Delete Task"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </li>
    );
  }

  return (
    <div className={`flex flex-col ${urgentTasks.length > 0 ? 'md:flex-row' : ''} min-h-screen gap-6`}>
      {/* Go to dashboard */}
      <div className="mb-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
      {/* Regular Tasks */}
      <div className={urgentTasks.length > 0 ? "md:w-2/3 w-full p-6 bg-gray-50 rounded-xl shadow" : "w-full p-6 bg-gray-50 rounded-xl shadow"}>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-blue-600">📝</span> Regular Tasks
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <select
            className="border rounded px-2 py-1"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
          />
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul>
          {regularTasks.length === 0 && (
            <li className="text-gray-400">No regular tasks.</li>
          )}
          {regularTasks.map(task => renderTaskItem(task, false))}
        </ul>
      </div>

      {/* Urgent Tasks (only if there are urgent tasks) */}
      {urgentTasks.length > 0 && (
        <div className="md:w-1/3 w-full p-6 bg-gradient-to-br from-red-200 to-red-100 border-l-2 border-red-300 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-700">
            <ExclamationTriangleIcon className="h-7 w-7 text-red-500" />
            Urgent Tasks (Due in 24h)
          </h2>
          <ul>
            {urgentTasks.map(task => renderTaskItem(task, true))}
          </ul>
        </div>
      )}
    </div>
  );
}
