# Frontend - HireAI Resume Screening Platform

This React frontend application provides a user interface for the AI-powered resume screening platform with comprehensive authentication and security features.

## 🔐 Authentication & Security Features

### **Implemented Security Features:**
- ✅ **JWT-based Authentication** - Secure token-based authentication
- ✅ **Protected Routes** - All sensitive pages require authentication
- ✅ **Global Auth State Management** - Centralized authentication context
- ✅ **Automatic Token Inclusion** - JWT tokens automatically added to API requests
- ✅ **Token Validation** - Automatic token validation on app load
- ✅ **Automatic Logout** - Handles expired/invalid tokens
- ✅ **Environment-specific Configuration** - Different API URLs for dev/prod
- ✅ **Input Validation** - Client-side form validation
- ✅ **Secure Navigation** - Redirects to intended page after login

### **Protected Routes:**
- `/dashboard` - Resume analysis dashboard
- `/upload` - Resume upload functionality
- `/candidates` - Candidate list view
- `/candidates/:filename` - Individual candidate details
- `/interview/:interviewId` - Voice interview interface
- `/loading` - Processing status page
- `/results` - Analysis results page

### **Public Routes:**
- `/` - Landing page
- `/login` - Authentication login
- `/signup` - User registration

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory:
```bash
cp .env.sample .env
```

Edit `.env` with your configuration:
```env
# Vapi Configuration (for voice interview feature)
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here

# API Configuration (optional - defaults are set in config.js)
# VITE_API_BASE_URL=http://localhost:5000/api

# Development Configuration
VITE_DEV_MODE=true
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Architecture

### **Authentication Flow:**
1. **App Load**: Checks for existing JWT token in localStorage
2. **Token Validation**: Validates token with backend `/api/validate` endpoint
3. **State Management**: Updates global auth state based on validation result
4. **Route Protection**: Redirects unauthenticated users to login
5. **API Requests**: Automatically includes JWT token in Authorization header
6. **Error Handling**: Handles 401 responses by clearing auth state and redirecting

### **Key Components:**

#### **AuthContext (`src/contexts/AuthContext.jsx`)**
- Global authentication state management
- Token validation and storage
- Login/signup/logout functions
- Automatic token refresh handling

#### **ProtectedRoute (`src/components/ProtectedRoute.jsx`)**
- Route guard component
- Loading state handling
- Redirect to login for unauthenticated users
- Preserves intended destination

#### **API Service (`src/services/api.js`)**
- Axios interceptors for automatic token inclusion
- Response interceptor for auth error handling
- Centralized API endpoint management

#### **Configuration (`src/config.js`)**
- Environment-specific API URLs
- Development vs production configuration
- Feature flags and external service URLs

## 🔧 API Integration

### **Authentication Endpoints:**
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `GET /api/validate` - Token validation

### **Protected Endpoints:**
- `GET /api/candidates` - Get all candidates
- `POST /api/upload` - Upload resume file
- `POST /api/analyze_resumes` - Process resume batch
- `GET /api/status/:sessionId` - Check processing status
- `GET /api/result/:sessionId` - Get processing results
- `POST /api/chat/:sessionId` - Chat with session data

### **Request Headers:**
All protected API requests automatically include:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 🛡️ Security Features

### **Token Management:**
- JWT tokens stored in localStorage
- Automatic token validation on app load
- Token expiration handling (7 days)
- Secure token transmission in headers

### **Route Protection:**
- All sensitive routes wrapped with `ProtectedRoute`
- Automatic redirect to login for unauthenticated access
- Preserves intended destination after login

### **Error Handling:**
- 401 responses trigger automatic logout
- Clear error messages for authentication failures
- Graceful handling of network errors

### **Input Validation:**
- Email format validation
- Password strength requirements
- Form validation before submission

## 🔄 State Management

### **Authentication State:**
```javascript
{
  user: string | null,        // User email
  token: string | null,       // JWT token
  loading: boolean,           // Loading state
  isAuthenticated: () => boolean  // Auth check function
}
```

### **Auth Functions:**
- `loginUser(email, password)` - Authenticate user
- `signupUser(email, password)` - Register new user
- `logout()` - Clear auth state and redirect
- `isAuthenticated()` - Check if user is logged in

## 🎨 UI/UX Features

### **Loading States:**
- Spinner during authentication
- Loading indicators for API calls
- Skeleton screens for data loading

### **Error Handling:**
- Clear error messages
- Form validation feedback
- Network error notifications

### **Navigation:**
- Responsive navigation bar
- Conditional menu items based on auth state
- Breadcrumb navigation

## 🚨 Troubleshooting

### **Common Issues:**

1. **"Token validation failed"**
   - Check if backend is running
   - Verify JWT_SECRET is set in backend
   - Clear localStorage and re-login

2. **"API requests failing"**
   - Check API_BASE_URL in config.js
   - Verify backend is accessible
   - Check CORS configuration

3. **"Protected routes not working"**
   - Ensure AuthProvider wraps the app
   - Check ProtectedRoute implementation
   - Verify authentication state

4. **"Environment variables not loading"**
   - Restart development server
   - Check .env file format
   - Verify VITE_ prefix for variables

### **Development Tips:**
- Use browser dev tools to inspect network requests
- Check localStorage for token storage
- Monitor console for authentication errors
- Test with different user accounts

## 🔗 Integration with Backend

This frontend is designed to work with the Flask backend that includes:
- JWT authentication endpoints
- Protected API routes
- MongoDB integration
- Resume processing functionality

Ensure the backend is properly configured with:
- Valid JWT_SECRET
- MongoDB connection
- CORS enabled for frontend domain
- All required environment variables 