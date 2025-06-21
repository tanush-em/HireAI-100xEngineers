// Environment-specific configuration
const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api'  // Development backend
  : 'https://sunmasgroup.com/api'; // Production backend

export const MAIL_SERVER_URL = 'https://100xmailserver-production-bfb6.up.railway.app';
export const CANDIDATES_API_URL = 'https://100xmailserver-production-bfb6.up.railway.app/candidates';

// Vapi configuration (for voice interview)
export const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || "YOUR_VAPI_PUBLIC_KEY";
export const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || "YOUR_VAPI_ASSISTANT_ID";