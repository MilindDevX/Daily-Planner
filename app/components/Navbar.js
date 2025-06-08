import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { pathname } = useRouter();

  const linkStyle = (path) =>
    pathname === path
      ? 'text-blue-600 border-b-2 border-blue-600'
      : 'text-gray-500 hover:text-gray-700';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-900">Daily Planner</h1>
          <div className="flex space-x-8">
            <Link href="/" className={`px-3 py-2 text-sm font-medium ${linkStyle('/')}`}>
              Home
            </Link>
            <Link href="/tasks" className={`px-3 py-2 text-sm font-medium ${linkStyle('/tasks')}`}>
              Tasks
            </Link>
            <Link href="/calendar" className={`px-3 py-2 text-sm font-medium ${linkStyle('/calendar')}`}>
              Calendar
            </Link>
            <Link href="/about" className={`px-3 py-2 text-sm font-medium ${linkStyle('/about')}`}>
              About
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
