import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto w-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<ResumeDashboard />} />
            <Route path="/loading" element={<TransitionLoading />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/candidates/:filename" element={<CandidateDetail />} />
            <Route path="/interview/:interviewId" element={<VoiceInterview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
