import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../services/api';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const response = await uploadResume(file);
      navigate(`/candidates/${response.data.file_name}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Upload Resume
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Upload a PDF resume to process and analyze it.</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Resume (PDF)
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Processing...' : 'Upload and Process'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadResume; 