 
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hire Top Talent in{' '}
              <span className="text-blue-600">Minutes, Not Months</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The AI-powered hiring copilot that finds perfect candidates instantly. Used by 500+ companies to reduce hiring time by 85%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                See Demo
              </Link>
            </div>
            <p className="text-sm text-gray-500">✨ No credit card required • 14-day free trial</p>
          </motion.div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Traditional Hiring is Broken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Companies waste 60+ days and $15,000+ per hire while great candidates slip away to competitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="text-4xl font-bold text-red-500 mb-2">67 Days</div>
              <p className="text-gray-600">Average time to hire</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="text-4xl font-bold text-red-500 mb-2">$15,000+</div>
              <p className="text-gray-600">Cost per hire</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="text-4xl font-bold text-red-500 mb-2">70%</div>
              <p className="text-gray-600">Of great candidates lost</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transformation Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              What if you could hire 10x faster?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Our AI hiring copilot transforms your recruitment process from weeks to hours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">3 Days</div>
                <p className="text-blue-100">Average time to hire</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$3,000</div>
                <p className="text-blue-100">Cost per hire</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                <p className="text-blue-100">Quality hire rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-12">
            Trusted by 500+ companies worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center font-semibold">TechCorp</div>
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center font-semibold">StartupCo</div>
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center font-semibold">GrowthInc</div>
            <div className="h-12 bg-gray-200 rounded flex items-center justify-center font-semibold">ScaleUp</div>
          </div>
        </div>
      </div>

      {/* Solution: Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our AI Hiring Copilot Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to transform your hiring process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Job Requirements</h3>
              <p className="text-gray-600">Simply describe what you're looking for in plain English</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Finds Perfect Matches</h3>
              <p className="text-gray-600">Our AI scans millions of profiles and ranks the best candidates</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interview & Hire</h3>
              <p className="text-gray-600">Get pre-screened candidates ready for interviews</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-blue-600" />,
                title: "Smart Search",
                description: "Natural language queries that understand context and intent"
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "Resume Parsing",
                description: "Extract skills and experience with 99% accuracy"
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-blue-600" />,
                title: "AI Ranking",
                description: "Candidates ranked by fit score and relevance"
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
                title: "Auto Screening",
                description: "Pre-screening questions and background checks"
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Analytics",
                description: "Deep insights into your talent pipeline"
              },
              {
                icon: <Zap className="h-8 w-8 text-blue-600" />,
                title: "Auto Outreach",
                description: "Personalized candidate engagement at scale"
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

      {/* Pricing Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that works for your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$99<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Perfect for small teams</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />Up to 10 searches/month</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />Basic AI matching</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />Email support</li>
              </ul>
              <Link to="/signup" className="w-full inline-flex justify-center items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Start Free Trial
              </Link>
            </div>

            <div className="bg-blue-600 rounded-xl shadow-xl p-8 border-2 border-blue-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="text-4xl font-bold text-white mb-2">$299<span className="text-lg text-blue-200">/month</span></div>
              <p className="text-blue-200 mb-6">For growing companies</p>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />Unlimited searches</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />Advanced AI matching</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />Priority support</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />Analytics dashboard</li>
              </ul>
              <Link to="/signup" className="w-full inline-flex justify-center items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
              <p className="text-gray-600 mb-6">For large organizations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />Everything in Professional</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />Custom integrations</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />Dedicated support</li>
                <li className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />SLA guarantee</li>
              </ul>
              <Link to="/contact" className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div className="ml-4">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-gray-600 text-sm">VP of Engineering, TechCorp</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"We reduced our time-to-hire from 45 days to just 5 days. The quality of candidates has never been better. This tool is a game-changer."</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div className="ml-4">
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-gray-600 text-sm">Head of Talent, StartupCo</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The AI matching is incredibly accurate. We're finding candidates we never would have discovered through traditional methods."</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">L</div>
                <div className="ml-4">
                  <div className="font-semibold">Lisa Rodriguez</div>
                  <div className="text-gray-600 text-sm">Recruiting Manager, GrowthInc</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"Our hiring costs dropped by 60% and we're making better hires. The ROI is incredible - paid for itself in the first month."</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How does the AI matching work?</h3>
              <p className="text-gray-600">Our AI analyzes job requirements and candidate profiles using natural language processing and machine learning to identify the best matches based on skills, experience, and cultural fit.</p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What's included in the free trial?</h3>
              <p className="text-gray-600">The 14-day free trial includes access to all Professional plan features: unlimited searches, advanced AI matching, analytics dashboard, and priority support.</p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How quickly can I see results?</h3>
              <p className="text-gray-600">Most customers see their first qualified candidates within hours of uploading job requirements. The average time-to-hire is reduced from 67 days to just 3-5 days.</p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use enterprise-grade security with SOC 2 compliance, end-to-end encryption, and GDPR compliance. Your data is never shared with third parties.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I integrate with my existing ATS?</h3>
              <p className="text-gray-600">Yes, we offer integrations with popular ATS platforms including Greenhouse, Lever, Workday, and more. Custom integrations are available for Enterprise customers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 500+ companies already hiring 10x faster with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free 14-Day Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">✨ No credit card required • Setup in under 5 minutes</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Hiring Copilot</h3>
              <p className="text-gray-400">Transform your hiring process with AI-powered precision.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Hiring Copilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
