import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();
  const router = useRouter();

  const linkStyle = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-600 hover:text-blue-500";

  async function handleLogout() {
    await logout();
    router.push("/login");
  }
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Daily Planner
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/home"
              className={`px-3 py-2 text-sm ${linkStyle("/")}`}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              className={`px-3 py-2 text-sm ${linkStyle("/tasks")}`}
            >
              Tasks
            </Link>
            <Link
              href="/calendar"
              className={`px-3 py-2 text-sm ${linkStyle("/calendar")}`}
            >
              Calendar
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm ${linkStyle("/about")}`}
            >
              About
            </Link>

            {!user ? (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm shadow transition">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-md text-sm shadow-sm transition">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 hidden sm:inline">
                  Hi, {user.email.split("@")[0]}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-sm px-3 py-1.5 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
