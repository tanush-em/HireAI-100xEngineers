import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  BarChart2, 
  MessageSquare, 
  Zap, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Hiring with{' '}
              <span className="text-blue-600">AI-Powered</span> Precision
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find the perfect candidates in minutes, not months. Our AI hiring copilot understands your needs and delivers qualified talent instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Hire Smarter
            </h2>
            <p className="text-xl text-gray-600">
              Our comprehensive suite of AI-powered tools streamlines your entire hiring process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-blue-600" />,
                title: "Natural Language Search",
                description: "Find candidates using plain English queries. Our AI understands your requirements and delivers precise matches."
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "Smart Resume Parsing",
                description: "Automatically extract skills, experience, and qualifications from resumes with high accuracy."
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-blue-600" />,
                title: "Intelligent Ranking",
                description: "Our AI ranks candidates based on your specific criteria, ensuring the best matches rise to the top."
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
                title: "AI Pre-screening",
                description: "Automated background checking and Q&A generation to streamline the screening process."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Talent Pool Analytics",
                description: "Gain insights into your talent pool with comprehensive analytics and monitoring."
              },
              {
                icon: <Zap className="h-8 w-8 text-blue-600" />,
                title: "Personalized Outreach",
                description: "Automate and personalize candidate outreach to engage top talent effectively."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Hiring Solution?
            </h2>
            <p className="text-xl text-gray-600">
              Transform your hiring process and achieve better results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Reduce Time-to-Hire",
                description: "Cut your hiring time from 60+ days to just days with AI-powered candidate matching and screening."
              },
              {
                title: "Eliminate Bias",
                description: "Our AI focuses on skills and qualifications, helping you build diverse and inclusive teams."
              },
              {
                title: "Lower Costs",
                description: "Reduce hiring costs by automating manual tasks and finding the right candidates faster."
              },
              {
                title: "Better Quality Hires",
                description: "Make data-driven hiring decisions with our comprehensive candidate scoring system."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your Hiring Process?
          </h2>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
