"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "../../utils/supabaseClient";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching tasks:", error);
        } else {
          setTasks(data || []);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const todaysTasks = tasks.filter((task) => task.dueDate === today);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Daily Planner Dashboard
        </h1>

        {/* Navigation */}
        <nav className="flex justify-center flex-wrap gap-4 mb-10">
          <Link href="/tasks">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Tasks
            </button>
          </Link>
          <Link href="/calendar">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Calendar
            </button>
          </Link>
          <Link href="/settings">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Settings
            </button>
          </Link>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </nav>

        {/* Tasks Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Today's Tasks
          </h2>

          {todaysTasks.length === 0 ? (
            <p className="text-gray-500">No tasks scheduled for today!</p>
          ) : (
            <ul className="space-y-3">
              {todaysTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
