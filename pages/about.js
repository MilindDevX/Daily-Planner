import React from 'react';
import Navbar from '../app/components/Navbar';
import AboutPage from '../app/components/AboutPage';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AboutPage />
      </main>
    </div>
  );
};

export default About;
