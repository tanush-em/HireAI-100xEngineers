import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCandidates } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    averageScore: 0,
    topSkills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const candidates = await getAllCandidates();
        
        // Calculate total candidates
        const totalCandidates = candidates.length;
        
        // Calculate average score
        const averageScore = candidates.length > 0
          ? Math.round(candidates.reduce((acc, curr) => acc + curr.score, 0) / candidates.length)
          : 0;
        
        // Get top skills
        const skillCounts = {};
        candidates.forEach(candidate => {
          candidate.skills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
          });
        });
        
        const topSkills = Object.entries(skillCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([skill]) => skill);

        setStats({
          totalCandidates,
          averageScore,
          topSkills,
        });
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Welcome to HireAI
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Your AI-powered recruitment assistant</p>
          </div>
          <div className="mt-5">
            <Link
              to="/upload"
              className="btn-primary"
            >
              Upload New Resume
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Candidates
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalCandidates}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Average Score
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.averageScore}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Top Skills
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex flex-wrap gap-2">
                {stats.topSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </dd>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/upload"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="mt-2 block text-sm font-medium text-gray-900">
                Upload New Resume
              </div>
            </Link>
            <Link
              to="/candidates"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="mt-2 block text-sm font-medium text-gray-900">
                View All Candidates
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 