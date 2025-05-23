"use client";
import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

function isUrgent(task) {
  if (!task.dueDate || task.completed) return false;
  const now = new Date();
  const due = new Date(task.dueDate);
  const diff = due - now;
  return diff <= 24 * 60 * 60 * 1000 && diff > 0;
}

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

const getDueDateBadgeColor = (task, isUrgentSection = false) => {
  if (isUrgentSection) return "bg-red-500 text-white";
  if (task.completed) return "bg-gray-300 text-gray-600";
  if (!task.dueDate) return "bg-gray-100 text-gray-500";
  const today = new Date().toISOString().split("T")[0];
  if (task.dueDate < today) return "bg-red-200 text-red-800";
  if (task.dueDate === today) return "bg-blue-200 text-blue-800";
  return "bg-green-200 text-green-800";
};

const getPriorityBadgeColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-500 text-white";
    case "Medium":
      return "bg-yellow-400 text-gray-800";
    case "Low":
      return "bg-green-400 text-white";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

const EditForm = React.memo(function EditForm({
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
        autoFocus
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
      <button
        type="button"
        className="bg-gray-300 px-3 py-1 rounded"
        onClick={cancelEdit}
      >
        Cancel
      </button>
    </form>
  );
});

const TaskItem = React.memo(function TaskItem({
  task,
  isEditing,
  isUrgentSection,
  editInput,
  setEditInput,
  editPriority,
  setEditPriority,
  editDueDate,
  setEditDueDate,
  saveEdit,
  cancelEdit,
  toggleComplete,
  startEdit,
  deleteTask,
}) {
  return (
    <li
      className={`flex items-center justify-between mb-3 p-4 rounded-lg shadow transition ${
        task.completed ? "bg-gray-100" : "bg-[#FBF5FF]"
      } hover:shadow-lg`}
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
              className="focus:outline-none"
              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <CheckCircleIcon
                className={`h-6 w-6 cursor-pointer ${
                  task.completed
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-600"
                }`}
              />
            </button>
            <span
              className={`select-none text-lg ${
                task.completed ? "line-through text-gray-400" : ""
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
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              className="text-red-400 hover:text-red-600"
              onClick={() => deleteTask(task.id)}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </li>
  );
});

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  const addTask = useCallback(() => {
    if (input.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
        title: input,
        completed: false,
        dueDate: dueDate || null,
        priority,
      },
    ]);
    setInput("");
    setPriority("Medium");
    setDueDate("");
  }, [input, priority, dueDate]);

  const toggleComplete = useCallback((id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  }, [editingTask]);

  const startEdit = useCallback((task) => {
    setEditingTask(task);
    setEditInput(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || "");
  }, []);

  const saveEdit = useCallback(() => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: editInput,
              priority: editPriority,
              dueDate: editDueDate,
            }
          : task
      )
    );
    setEditingTask(null);
  }, [editingTask, editInput, editPriority, editDueDate]);

  const cancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  const urgentTasks = useMemo(
    () =>
      sortTasks(
        tasks.filter(
          (task) =>
            isUrgent(task) && (!editingTask || editingTask.id !== task.id)
        )
      ),
    [tasks, editingTask]
  );

  const regularTasks = useMemo(
    () =>
      sortTasks(
        tasks.filter(
          (task) =>
            !isUrgent(task) || (editingTask && editingTask.id === task.id)
        )
      ),
    [tasks, editingTask]
  );

  const renderTaskItem = useCallback(
    (task, isUrgentSection = false) => {
      const isEditing = editingTask?.id === task.id;
      return (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={isEditing}
          isUrgentSection={isUrgentSection}
          editInput={editInput}
          setEditInput={setEditInput}
          editPriority={editPriority}
          setEditPriority={setEditPriority}
          editDueDate={editDueDate}
          setEditDueDate={setEditDueDate}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          toggleComplete={toggleComplete}
          startEdit={startEdit}
          deleteTask={deleteTask}
        />
      );
    },
    [
      editingTask,
      editInput,
      editPriority,
      editDueDate,
      saveEdit,
      cancelEdit,
      toggleComplete,
      startEdit,
      deleteTask,
    ]
  );

  return (
    <div className={`flex flex-col ${urgentTasks.length > 0 ? "md:flex-row" : ""} min-h-screen gap-6`}>
      <div className="mb-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ml-1">
            Go to Dashboard
          </button>
        </Link>
      </div>
      <div className={`${urgentTasks.length > 0 ? "md:w-2/3" : "w-full"} p-6 bg-[#FFFFFF] rounded-xl shadow`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-blue-600">📝</span> Regular Tasks
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            className="flex-1 border rounded px-2 py-1"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        </div>
        <ul>{regularTasks.map((task) => renderTaskItem(task))}</ul>
      </div>
      {urgentTasks.length > 0 && (
        <div className="md:w-1/3 p-6 bg-red-50 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-2">
            <span>⚠️</span> Urgent Tasks
          </h2>
          <ul>{urgentTasks.map((task) => renderTaskItem(task, true))}</ul>
        </div>
      )}
    </div>
  );
}
