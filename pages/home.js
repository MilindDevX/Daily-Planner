import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../app/context/TaskContext';
import Navbar from '../app/components/Navbar';
import HomePage from '../app/components/HomePage';

const Home = () => {
  const {
    tasks,
    getUrgentTasks,
    getUpcomingTasks,
    getDaysUntilDeadline,
    getPriorityColor
  } = useContext(TaskContext);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <HomePage
          tasks={tasks}
          currentTime={currentTime}
          getUrgentTasks={getUrgentTasks}
          getUpcomingTasks={getUpcomingTasks}
          getDaysUntilDeadline={getDaysUntilDeadline}
          getPriorityColor={getPriorityColor}
        />
      </main>
    </div>
  );
};

export default Home;
