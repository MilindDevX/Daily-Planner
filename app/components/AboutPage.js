import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar, Edit3, Plus } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">About Daily Planner</h1>
        <p className="text-xl text-gray-600">Your personal productivity companion</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">What is Daily Planner?</h2>
        <p className="text-gray-700 mb-6">
          Daily Planner is a comprehensive task management application designed to help you stay organized,
          productive, and on top of your daily responsibilities. Whether you're managing work projects,
          personal goals, or daily chores, our intuitive interface makes it easy to track and complete your tasks.
        </p>

        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Feature icon={<CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />} title="Task Management" desc="Create, edit, and delete tasks with ease" />
          <Feature icon={<Clock className="h-6 w-6 text-blue-500 mt-1" />} title="Real-time Timers" desc="Live countdown to deadlines with precise timing" />
          <Feature icon={<AlertCircle className="h-6 w-6 text-red-500 mt-1" />} title="Priority Levels" desc="Organize tasks by high, medium, and low priority" />
          <Feature icon={<Calendar className="h-6 w-6 text-purple-500 mt-1" />} title="Calendar View" desc="Visual calendar showing all tasks with monthly overview" />
          <Feature icon={<Edit3 className="h-6 w-6 text-orange-500 mt-1" />} title="Easy Editing" desc="Modify task details anytime with intuitive controls" />
          <Feature icon={<Plus className="h-6 w-6 text-indigo-500 mt-1" />} title="Quick Actions" desc="Mark tasks complete, edit, or delete with one click" />
        </div>

        <h3 className="text-xl font-semibold mb-3">How It Works</h3>
        <div className="space-y-3 text-gray-700">
          <p><strong>1. Add Tasks:</strong> Create new tasks with titles, descriptions, deadlines, and priority levels.</p>
          <p><strong>2. Track Progress:</strong> Monitor your tasks on the main dashboard and see urgent items at a glance with live timers.</p>
          <p><strong>3. Calendar View:</strong> Use the calendar to see all your tasks organized by date with monthly statistics.</p>
          <p><strong>4. Stay Organized:</strong> Use the Tasks page to manage all your tasks in one place.</p>
          <p><strong>5. Complete Goals:</strong> Mark tasks as complete and track your productivity over time.</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
        <p className="text-gray-600 mb-4">Begin organizing your life with Daily Planner today!</p>
        <Link href="/tasks">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Go to Tasks
          </button>
        </Link>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-3">
    {icon}
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

export default AboutPage;
