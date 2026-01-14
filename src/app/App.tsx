import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import CandidateDetail from './pages/CandidateDetail';
import Sessions from './pages/Sessions';
import SessionDetail from './pages/SessionDetail';
import Analysis from './pages/Analysis';
import Recordings from './pages/Recordings';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import MainLayout from './components/layout/MainLayout';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Main app routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidates/:id" element={<CandidateDetail />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster />
      </AppProvider>
    </BrowserRouter>
  );
}