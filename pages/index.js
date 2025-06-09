import { useRouter } from 'next/router';
import Link from 'next/link';

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-purple-100 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Plan Your Day With Purpose
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-6">
          Daily Planner helps you organize tasks, track progress, and stay on top of what matters most.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Get Started for Free
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Everything You Need To Stay Organized</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <Feature icon="📋" title="Smart Task Manager" desc="Create, edit, and organize your to-dos with ease." />
          <Feature icon="📆" title="Visual Calendar" desc="See all tasks by date and never miss a deadline." />
          <Feature icon="⚡" title="Live Countdown" desc="Track time left for each task in real time." />
          <Feature icon="✅" title="Progress Tracking" desc="Mark tasks complete and celebrate wins." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Ready to take control of your time?</h2>
        <p className="text-gray-600 mb-6">Join hundreds of users planning better days with Daily Planner.</p>
        <Link href="/login">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">
            Start Planning Now
          </button>
        </Link>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default LandingPage;
