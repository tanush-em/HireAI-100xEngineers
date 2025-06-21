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
      <section className="pt-20 pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Hiring Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transform Your Hiring Process with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Precision
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Screen resumes instantly, conduct voice interviews, and find perfect candidates{" "}
              <span className="font-semibold text-gray-800">10x faster</span> than traditional methods
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                onClick={() => window.open('https://youtu.be/WDCImbNodM4', '_blank')}
              >
                <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No setup required
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Results in minutes
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Enterprise-grade security
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              The Challenge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Traditional Hiring is Broken</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              HR teams are drowning in resumes while great candidates slip away to competitors
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Manual resume screening takes weeks",
                desc: "HR teams spend countless hours reviewing resumes manually",
                color: "red",
              },
              {
                icon: Users,
                title: "High-quality candidates slip away",
                desc: "Slow processes mean losing top talent to faster competitors",
                color: "orange",
              },
              {
                icon: Target,
                title: "Inconsistent interview processes",
                desc: "Different interviewers ask different questions, creating bias",
                color: "yellow",
              },
              {
                icon: Upload,
                title: "Overwhelming volume of applications",
                desc: "Hundreds of resumes for each position create analysis paralysis",
                color: "green",
              },
              {
                icon: Brain,
                title: "Bias in candidate selection",
                desc: "Human bias affects hiring decisions and diversity goals",
                color: "blue",
              },
              {
                icon: BarChart3,
                title: "No data-driven insights",
                desc: "Lack of metrics makes it impossible to improve hiring processes",
                color: "purple",
              },
            ].map((problem, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-12 h-12 bg-${problem.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <problem.icon className={`w-6 h-6 text-${problem.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              The Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What if you could hire <span className="text-green-600">10x faster</span> with better accuracy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See the dramatic transformation HireAI brings to your recruitment process
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border border-red-200">
                <h3 className="text-2xl font-bold text-red-700 mb-8 flex items-center">
                  <Clock className="w-6 h-6 mr-3" />
                  Before: Traditional Hiring
                </h3>
                {[
                  { metric: "Time to hire", value: "6-8 weeks", icon: Clock },
                  { metric: "Screening accuracy", value: "Manual guesswork", icon: Target },
                  { metric: "Interview consistency", value: "Highly variable", icon: Users },
                  { metric: "Candidate experience", value: "Delayed feedback", icon: MessageSquare },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl mb-4 last:mb-0">
                    <item.icon className="w-6 h-6 text-red-500" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.metric}</div>
                      <div className="text-red-600 font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                <h3 className="text-2xl font-bold text-green-700 mb-8 flex items-center">
                  <Zap className="w-6 h-6 mr-3" />
                  After: With HireAI
                </h3>
                {[
                  { metric: "Time to hire", value: "2-3 hours", icon: Zap },
                  { metric: "Screening accuracy", value: "AI-powered precision", icon: Brain },
                  { metric: "Interview consistency", value: "Standardized AI interviews", icon: Mic },
                  { metric: "Candidate experience", value: "Instant feedback", icon: CheckCircle },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl mb-4 last:mb-0">
                    <item.icon className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.metric}</div>
                      <div className="text-green-600 font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How HireAI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform streamlines every step of your hiring process
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">AI Voice Interviews</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Conduct automated voice interviews with consistent questions and real-time transcript analysis for fair
                evaluation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Automated scheduling</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Consistent questions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Real-time analysis</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-3xl shadow-lg">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Interview in Progress</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Question 3 of 4 • 12:30 elapsed</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-700 font-medium">"Tell me about a challenging project you've worked on..."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Interactive Analytics Dashboard</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Get visual candidate comparisons, hiring pipeline insights, and performance metrics to optimize your
                recruitment process.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Visual comparisons</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Pipeline insights</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Performance metrics</span>
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-gradient-to-br from-orange-50 to-amber-100 p-8 rounded-3xl shadow-lg">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
                <h4 className="font-bold text-xl mb-6 text-gray-900">Hiring Pipeline</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">Applications</span>
                    <span className="font-bold text-gray-900">247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">Screened</span>
                    <span className="font-bold text-gray-900">89</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">Interviewed</span>
                    <span className="font-bold text-gray-900">23</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">Offers</span>
                    <span className="font-bold text-gray-900">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Conversational AI Assistant</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Query candidate information naturally, get instant answers about applicants, and use smart filtering and
                search capabilities.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Natural language queries</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Instant answers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Smart filtering</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-3xl shadow-lg">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100">
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-700">"Show me candidates with React experience"</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-700 font-medium">
                      Found 12 candidates with React experience. Top 3 matches: Sarah Johnson (5 years), Mike Chen (3
                      years), Lisa Rodriguez (4 years).
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-700">"Who has the most leadership experience?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your hiring needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
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
                color: "gray",
              },
              {
                name: "Professional",
                price: "$49",
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
                color: "blue",
              },
              {
                name: "Enterprise",
                price: "$99",
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
                color: "purple",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`group bg-white rounded-3xl shadow-sm border-2 p-8 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  plan.popular 
                    ? "border-blue-500 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 font-medium">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-6 text-gray-600 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="font-medium">No setup fees</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 leading-relaxed">Everything you need to know about HireAI</p>
          </div>
          <div className="space-y-6">
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
              <div key={index} className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 rounded-2xl transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-lg text-gray-900 pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">Join the companies already hiring smarter with HireAI</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-white text-blue-600 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
              Start Free 14-Day Trial
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-blue-300 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center bg-white/10 backdrop-blur-sm">
              Schedule Demo
              <Play className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="font-medium">Setup in under 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HireAI</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">AI-Powered Hiring Made Simple</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="font-medium text-gray-300 mb-2">Built by:</p>
                <p>Rakhesh Krishna P</p>
                <p>Tanush T M</p>
                <p>Rohit P</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HireAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
