import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, User, Briefcase, Star, Send, Search } from "lucide-react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";

const candidates = [
  { 
    id: 1, 
    name: "John Doe", 
    role: "Frontend Developer", 
    score: 95,
    skills: ["React", "TypeScript", "Next.js"],
    experience: "5+ years",
    avatar: "JD"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    role: "Backend Developer", 
    score: 92,
    skills: ["Node.js", "Python", "PostgreSQL"],
    experience: "7+ years",
    avatar: "JS"
  },
  { 
    id: 3, 
    name: "Alice Brown", 
    role: "Data Scientist", 
    score: 89,
    skills: ["Python", "Machine Learning", "SQL"],
    experience: "4+ years",
    avatar: "AB"
  },
  { 
    id: 4, 
    name: "Bob Wilson", 
    role: "Full Stack Developer", 
    score: 87,
    skills: ["React", "Node.js", "MongoDB"],
    experience: "6+ years",
    avatar: "BW"
  },
];

const chatMessages = [
  { id: 1, sender: "bot", message: "Hello! I'm here to help you learn more about your candidates. Ask me anything about their profiles, skills, or experience!" },
  { id: 2, sender: "user", message: "Tell me about John Doe's experience" },
  { id: 3, sender: "bot", message: "John Doe is a Frontend Developer with 5+ years of experience. He specializes in React, TypeScript, and Next.js with a score of 95/100." },
];

const ResultPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: messages.length + 1, sender: "user", message };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = { 
          id: messages.length + 2, 
          sender: "bot", 
          message: "I understand you're asking about that. Let me analyze the candidate data for you..." 
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Candidate Results</h1>
          <p className="text-gray-600">AI-powered candidate analysis and ranking</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Section - Candidates List */}
          <div className="lg:col-span-1">
            <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  Candidates ({filteredCandidates.length})
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[calc(100%-120px)]">
                <div className="space-y-3">
                  {filteredCandidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedCandidate.id === candidate.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          selectedCandidate.id === candidate.id
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {candidate.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{candidate.name}</h3>
                          <p className={`text-sm truncate ${
                            selectedCandidate.id === candidate.id ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            {candidate.role}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm font-medium">{candidate.score}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Section - Candidate Details */}
          <div className="lg:col-span-1">
            <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Candidate Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  key={selectedCandidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {selectedCandidate.avatar}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCandidate.name}</h2>
                  <p className="text-gray-600 text-lg mb-4">{selectedCandidate.role}</p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-5 h-5 fill-current text-yellow-500" />
                      <span className="text-2xl font-bold text-gray-800">{selectedCandidate.score}%</span>
                    </div>
                    <p className="text-sm text-gray-600">Match Score</p>
                  </div>

                  <div className="text-left space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Experience</h3>
                      <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{selectedCandidate.experience}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Key Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - AI Chatbot */}
          <div className="lg:col-span-1">
            <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[calc(100%-80px)]">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Input
                    placeholder="Ask about candidates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

