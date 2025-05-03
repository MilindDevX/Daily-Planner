"use client";
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import supabase from '../../utils/supabaseClient';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current date in YYYY-MM-DD format for filtering today's tasks
  const today = new Date().toISOString().split('T')[0];

  // Fetch tasks and user on component mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // If user is logged in, fetch their tasks
      if (user) {
        const { data, error } = await supabase
          .from('tasks') // Replace with your actual table name
          .select('*')
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error fetching tasks:', error);
        } else {
          setTasks(data || []);
        }
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, []);

  // Filter tasks for today
  const todaysTasks = tasks.filter(task => task.dueDate === today);
  
  // Calculate completion statistics
  const completed = todaysTasks.filter(task => task.completed).length;
  const pending = todaysTasks.length - completed;
  
  // Calculate percentages (avoid division by zero)
  const completedPercentage = todaysTasks.length > 0 
    ? Math.round((completed / todaysTasks.length) * 100) 
    : 0;
  const pendingPercentage = todaysTasks.length > 0 
    ? Math.round((pending / todaysTasks.length) * 100) 
    : 0;

  // Pie chart data configuration
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#4CAF50', '#FFC107'], // Green for completed, yellow for pending
        hoverBackgroundColor: ['#45a049', '#ffb300'],
        borderWidth: 0,
      },
    ],
  };

  // Chart options for better appearance
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = todaysTasks.length > 0 
              ? Math.round((value / todaysTasks.length) * 100) 
              : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };

  // Display loading state while fetching data
  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Daily Planner Dashboard</h1>
      
      {/* Main navigation */}
      <nav className="mb-8 flex flex-wrap justify-center gap-4">
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
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </nav>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Today's tasks section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {todaysTasks.length === 0 ? (
              <p className="text-gray-500">No tasks scheduled for today!</p>
            ) : (
              <ul className="space-y-2">
                {todaysTasks.map(task => (
                  <li key={task.id} className="p-2 border-b flex justify-between items-center">
                    <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      task.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Pie chart section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Task Progress</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {todaysTasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks to show progress</p>
            ) : (
              <div>
                <div className="max-w-xs mx-auto">
                  <Pie data={data} options={options} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="p-2 bg-green-100 rounded">
                    <div className="text-2xl font-bold text-green-800">{completedPercentage}%</div>
                    <div className="text-green-600">Completed</div>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded">
                    <div className="text-2xl font-bold text-yellow-800">{pendingPercentage}%</div>
                    <div className="text-yellow-600">Pending</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
