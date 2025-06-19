"use client"

import { useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Brain,
  Mic,
  BarChart3,
  MessageSquare,
  Upload,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react"

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState("professional")

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Hiring Process with <span className="text-blue-600">AI-Powered Precision</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Screen resumes instantly, conduct voice interviews, and find perfect candidates 10x faster than
              traditional methods
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                onClick={() => window.open('https://youtu.be/WDCImbNodM4', '_blank')}
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No setup required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Results in minutes
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Enterprise-grade security
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Traditional Hiring is Broken</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HR teams are drowning in resumes while great candidates slip away to competitors
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Manual resume screening takes weeks",
                desc: "HR teams spend countless hours reviewing resumes manually",
              },
              {
                icon: Users,
                title: "High-quality candidates slip away",
                desc: "Slow processes mean losing top talent to faster competitors",
              },
              {
                icon: Target,
                title: "Inconsistent interview processes",
                desc: "Different interviewers ask different questions, creating bias",
              },
              {
                icon: Upload,
                title: "Overwhelming volume of applications",
                desc: "Hundreds of resumes for each position create analysis paralysis",
              },
              {
                icon: Brain,
                title: "Bias in candidate selection",
                desc: "Human bias affects hiring decisions and diversity goals",
              },
              {
                icon: BarChart3,
                title: "No data-driven insights",
                desc: "Lack of metrics makes it impossible to improve hiring processes",
              },
            ].map((problem, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <problem.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What if you could hire 10x faster with better accuracy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the dramatic transformation HireAI brings to your recruitment process
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600 mb-6">Before: Traditional Hiring</h3>
              {[
                { metric: "Time to hire", value: "6-8 weeks", icon: Clock },
                { metric: "Screening accuracy", value: "Manual guesswork", icon: Target },
                { metric: "Interview consistency", value: "Highly variable", icon: Users },
                { metric: "Candidate experience", value: "Delayed feedback", icon: MessageSquare },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                  <item.icon className="w-6 h-6 text-red-500" />
                  <div>
                    <div className="font-semibold text-gray-900">{item.metric}</div>
                    <div className="text-red-600">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-600 mb-6">After: With HireAI</h3>
              {[
                { metric: "Time to hire", value: "2-3 hours", icon: Zap },
                { metric: "Screening accuracy", value: "AI-powered precision", icon: Brain },
                { metric: "Interview consistency", value: "Standardized AI interviews", icon: Mic },
                { metric: "Candidate experience", value: "Instant feedback", icon: CheckCircle },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <item.icon className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-gray-900">{item.metric}</div>
                    <div className="text-green-600">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How HireAI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform streamlines every step of your hiring process
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Smart Resume Processing</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Upload multiple PDFs instantly and let our AI extract skills, experience, and qualifications into
                structured data for easy analysis.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Bulk PDF upload support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>AI-powered data extraction</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Structured output format</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">Resume Processing</span>
                  <span className="text-sm text-green-600">Complete</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-green-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-full"></div>
                  </div>
                  <p className="text-sm text-gray-600">15 resumes processed in 30 seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Intelligent Candidate Ranking</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Compare candidates against job descriptions with AI-powered relevance scoring and bias-free evaluation
                processes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Job description matching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>AI relevance scoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Bias-free evaluation</span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-4">Top Candidates</h4>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson", score: 95, match: "Excellent" },
                    { name: "Mike Chen", score: 87, match: "Very Good" },
                    { name: "Lisa Rodriguez", score: 82, match: "Good" },
                  ].map((candidate, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{candidate.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{candidate.score}%</div>
                        <div className="text-xs text-gray-500">{candidate.match}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Mic className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AI Voice Interviews</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Conduct automated voice interviews with consistent questions and real-time transcript analysis for fair
                evaluation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Automated scheduling</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Consistent questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Real-time analysis</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Interview in Progress</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-purple-500 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm text-gray-600">Question 3 of 4 • 12:30 elapsed</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">"Tell me about a challenging project you've worked on..."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Interactive Analytics Dashboard</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get visual candidate comparisons, hiring pipeline insights, and performance metrics to optimize your
                recruitment process.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Visual comparisons</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Pipeline insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Performance metrics</span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-gradient-to-br from-orange-50 to-amber-100 p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-4">Hiring Pipeline</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Applications</span>
                    <span className="font-semibold">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Screened</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interviewed</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Offers</span>
                    <span className="font-semibold">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Conversational AI Assistant</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Query candidate information naturally, get instant answers about applicants, and use smart filtering and
                search capabilities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Natural language queries</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Instant answers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Smart filtering</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm">"Show me candidates with React experience"</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="text-sm">
                      Found 12 candidates with React experience. Top 3 matches: Sarah Johnson (5 years), Mike Chen (3
                      years), Lisa Rodriguez (4 years).
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm">"Who has the most leadership experience?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your hiring needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$49",
                period: "/month",
                description: "Perfect for small teams",
                features: [
                  "Unlimited resume screening",
                  "Basic candidate ranking",
                  "Email support",
                  "No voice interviews",
                ],
                cta: "Start Free Trial",
                popular: false,
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                description: "Most Popular - Ideal for growing companies",
                features: [
                  "Unlimited resume screening",
                  "Advanced AI ranking",
                  "500 voice interviews/month",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$149",
                period: "/month",
                description: "For large organizations",
                features: [
                  "Unlimited resume screening",
                  "Unlimited voice interviews",
                  "Custom integrations",
                  "Advanced analytics",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border-2 p-8 relative ${plan.popular ? "border-blue-500" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">All plans include: 14-day free trial • No setup fees • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about HireAI</p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "How does the AI resume screening work?",
                answer:
                  "Our AI uses advanced natural language processing to extract and analyze key information from resumes including skills, experience, education, and qualifications. It then matches this data against your job requirements to provide accurate relevance scores.",
              },
              {
                question: "What file formats are supported?",
                answer:
                  "HireAI supports PDF files for resume uploads. Our system can process multiple PDFs simultaneously and extract structured data from various resume formats and layouts.",
              },
              {
                question: "How accurate is the voice interview analysis?",
                answer:
                  "Our voice interview AI achieves over 95% accuracy in transcript generation and provides consistent evaluation criteria. The system analyzes communication skills, technical knowledge, and cultural fit based on predefined parameters.",
              },
              {
                question: "Can I integrate with my existing ATS?",
                answer:
                  "Yes, HireAI offers API integrations with popular ATS platforms. Our Enterprise plan includes custom integrations and dedicated support for seamless workflow integration.",
              },
              {
                question: "Is my candidate data secure?",
                answer:
                  "Absolutely. HireAI is SOC 2 compliant and GDPR ready. We use enterprise-grade encryption, secure data centers, and follow strict privacy protocols to protect all candidate information.",
              },
              {
                question: "How quickly can I see results?",
                answer:
                  "You can start seeing results immediately. Resume screening takes seconds, candidate ranking is instant, and you can begin conducting voice interviews within minutes of setup.",
              },
              {
                question: "What's included in the free trial?",
                answer:
                  "The 14-day free trial includes full access to all features of your chosen plan. No credit card required, no setup fees, and you can cancel anytime during the trial period.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xl text-blue-100 mb-8">Join the companies already hiring smarter with HireAI</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free 14-Day Trial
            </button>
            <button className="border border-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Schedule Demo
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Setup in under 5 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">HireAI</span>
              </div>
              <p className="text-gray-400 mb-4">AI-Powered Hiring Made Simple</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Built by:</p>
                <p>Rakhesh Krishna P</p>
                <p>Tanush T M</p>
                <p>Rohit P</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HireAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
