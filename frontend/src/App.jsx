import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ResumeDashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import CandidateList from './pages/CandidateList';
import CandidateDetail from './pages/CandidateDetail';
import LandingPage from './pages/landingPage.jsx'
import TransitionLoading from './pages/loadingPage.jsx'
import ResultPage from './pages/resultPage.jsx'
import VoiceInterview from './pages/VoiceInterview'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto w-screen bg-gray-100">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <ResumeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/upload" element={
                <ProtectedRoute>
                  <UploadResume />
                </ProtectedRoute>
              } />
              <Route path="/candidates" element={
                <ProtectedRoute>
                  <CandidateList />
                </ProtectedRoute>
              } />
              <Route path="/candidates/:filename" element={
                <ProtectedRoute>
                  <CandidateDetail />
                </ProtectedRoute>
              } />
              <Route path="/interview/:interviewId" element={
                <ProtectedRoute>
                  <VoiceInterview />
                </ProtectedRoute>
              } />
              
              {/* Processing routes */}
              <Route path="/loading" element={
                <ProtectedRoute>
                  <TransitionLoading />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
