import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, FileText, Search, Database, Brain } from 'lucide-react';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [stages, setStages] = useState([]);
  const [currentStage, setCurrentStage] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let eventSource = null;

    const connectSSE = () => {
      // Create new EventSource connection
      eventSource = new EventSource('http://localhost:5000/analyze_progress');

      // Handle incoming messages
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'stage') {
            setStages(prev => [...prev, data]);
            setCurrentStage(data);
            setProgress(data.progress || 0);
          } else if (data.type === 'done') {
            // Close connection and navigate to results
            eventSource.close();
            navigate('/result', { state: { analysisData: data.data } });
          }
        } catch (err) {
          console.error('Error parsing SSE data:', err);
          setError('Error processing server response');
        }
      };

      // Handle errors
      eventSource.onerror = (err) => {
        console.error('SSE Error:', err);
        setError('Connection error. Please try again.');
        eventSource.close();
      };
    };

    connectSSE();

    // Cleanup on component unmount
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [navigate]);

  const getStageIcon = (stage) => {
    switch (stage.name) {
      case 'upload':
        return <FileText className="w-6 h-6" />;
      case 'processing':
        return <Database className="w-6 h-6" />;
      case 'analysis':
        return <Brain className="w-6 h-6" />;
      case 'search':
        return <Search className="w-6 h-6" />;
      default:
        return <Loader2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Processing Your Resumes
          </h1>
          <p className="text-lg text-gray-600">
            We're analyzing your resumes and preparing the results
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {progress}% Complete
          </p>
        </div>

        {/* Stages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`p-4 ${
                  currentStage?.name === stage.name ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    stage.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : stage.status === 'error'
                      ? 'bg-red-100 text-red-600'
                      : stage.status === 'current'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {stage.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : stage.status === 'error' ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      getStageIcon(stage)
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-gray-500">{stage.description}</p>
                  </div>
                  {stage.status === 'current' && (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Current Stage Info */}
        {currentStage && !error && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {currentStage.details || 'Processing...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;

