import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, Brain, FileText, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../config';

const stages = [
  { 
    message: "Uploading resumes...", 
    progress: 20, 
    icon: Upload,
    description: "Securely processing your files"
  },
  { 
    message: "Extracting information...", 
    progress: 50, 
    icon: FileText,
    description: "Analyzing candidate profiles"
  },
  { 
    message: "Ranking candidates using LLM...", 
    progress: 80, 
    icon: Brain,
    description: "AI-powered candidate evaluation"
  },
  { 
    message: "Finalizing results...", 
    progress: 100, 
    icon: Sparkles,
    description: "Preparing your dashboard"
  }
];

const TransitionLoading = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing...");
  const [description, setDescription] = useState("Setting up your workspace");
  const [currentStage, setCurrentStage] = useState(-1);
  const [completedStages, setCompletedStages] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status/${state.session_id}`);
        const data = await response.json();

        const stage = parseInt(data.status);

        if (!isNaN(stage) && stage < stages.length) {
          const current = stages[stage];
          setProgress(current.progress);
          setMessage(current.message);
          setDescription(current.description);
          setCurrentStage(stage);

          if (stage > 0) {
            setCompletedStages(prev => {
              const updated = new Set(prev);
              for (let i = 0; i < stage; i++) updated.add(i);
              return [...updated];
            });
          }

          if (stage === stages.length - 1) {
            setCompletedStages(prev => [...new Set([...prev, stage])]);
            setTimeout(() => {
              navigate("/results", { state: { session_id: state.session_id } });
            }, 1500);
          }
        }

      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    const interval = setInterval(fetchStatus, 2000);
    fetchStatus();

    return () => clearInterval(interval);
  }, [navigate, state.session_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Main loading spinner */}
        <motion.div 
          className="flex items-center justify-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 border-4 border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              style={{
                border: '4px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #3b82f6, #6366f1, #8b5cf6)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box'
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 bg-white rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Status message */}
        <motion.div 
          className="text-center mb-8"
          key={message}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
          <p className="text-gray-600">{description}</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Stage indicators */}
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = completedStages.includes(index);
            const isCurrent = currentStage === index;
            
            return (
              <motion.div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-50 border border-green-200' 
                    : isCurrent 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ 
                  opacity: isCompleted || isCurrent ? 1 : 0.6,
                  scale: isCurrent ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isCurrent 
                    ? 'bg-blue-500 animate-pulse' 
                    : 'bg-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-600'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    {stage.message.replace('...', '')}
                  </p>
                  <p className={`text-xs ${
                    isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stage.description}
                  </p>
                </div>
                {isCurrent && (
                  <motion.div
                    className="flex-shrink-0 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer message */}
        <motion.div
          className="text-center mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Please wait while we process your data...
        </motion.div>
      </div>
    </div>
  );
};
export default TransitionLoading;

