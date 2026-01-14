import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
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
import LoadingScreen from './components/LoadingScreen';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';

function AppContent() {
  const { loading, error, refreshData } = useApp();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Data</AlertTitle>
          <AlertDescription className="mt-2">
            {error}
            <div className="mt-4">
              <Button onClick={refreshData} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
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
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppProvider>
          <AppContent />
          <Toaster />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}