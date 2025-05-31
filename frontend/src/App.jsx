import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import CandidateList from './pages/CandidateList';
import CandidateDetail from './pages/CandidateDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/candidates/:filename" element={<CandidateDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
