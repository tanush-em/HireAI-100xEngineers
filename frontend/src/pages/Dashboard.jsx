import React from 'react';
import { FileText, Users, Search, Clock, TrendingUp, Award, Briefcase, GraduationCap } from 'lucide-react';

const Dashboard = () => {
  // Dummy data for charts and statistics
  const topSkills = [
    { name: 'Python', count: 45, percentage: 85 },
    { name: 'JavaScript', count: 38, percentage: 72 },
    { name: 'React', count: 32, percentage: 60 },
    { name: 'Node.js', count: 28, percentage: 53 },
    { name: 'Machine Learning', count: 25, percentage: 47 },
  ];

  const recentActivities = [
    { type: 'upload', name: 'John Doe', role: 'Senior Software Engineer', time: '2 hours ago' },
    { type: 'search', query: 'Python developers with ML experience', time: '3 hours ago' },
    { type: 'upload', name: 'Jane Smith', role: 'Full Stack Developer', time: '5 hours ago' },
    { type: 'search', query: 'React developers with 5+ years experience', time: '6 hours ago' },
    { type: 'upload', name: 'Mike Johnson', role: 'Data Scientist', time: '8 hours ago' },
  ];

  const experienceDistribution = [
    { range: '0-2 years', count: 15 },
    { range: '2-5 years', count: 35 },
    { range: '5-8 years', count: 25 },
    { range: '8+ years', count: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your resume analysis dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                <p className="text-2xl font-semibold text-gray-900">248</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Candidates</p>
                <p className="text-2xl font-semibold text-gray-900">42</p>
                <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Searches Today</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
                <p className="text-sm text-green-600 mt-1">↑ 15% from yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-semibold text-gray-900">2.4s</p>
                <p className="text-sm text-green-600 mt-1">↓ 0.3s from last week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Skills */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Top Skills Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.count} candidates</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Experience Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {experienceDistribution.map((exp, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600">{exp.range}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(exp.count / 90) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">{exp.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'upload' ? 'bg-blue-50' : 'bg-green-50'
                      }`}>
                        {activity.type === 'upload' ? (
                          <FileText className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Search className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        {activity.type === 'upload' ? (
                          <>
                            <p className="text-sm font-medium text-gray-900">New resume uploaded</p>
                            <p className="text-sm text-gray-500">{activity.name} - {activity.role}</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900">New search performed</p>
                            <p className="text-sm text-gray-500">{activity.query}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 