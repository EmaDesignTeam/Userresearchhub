import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState('');

  // Check for session or verify token from URL
  useEffect(() => {
    const checkAuthAndVerify = async () => {
      // First, check if user already has a session (from ConfirmationURL redirect)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User is already authenticated via the invite link
        setVerified(true);
        setVerifying(false);
        return;
      }

      // If no session, try to verify token from URL params
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (!token_hash) {
        // No token and no session - check URL hash for access_token (Supabase redirect format)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          // Session should be set automatically by Supabase client
          const { data: { session: newSession } } = await supabase.auth.getSession();
          if (newSession?.user) {
            setVerified(true);
            setVerifying(false);
            return;
          }
        }
        
        setTokenError('Invalid invitation link. Please use the link from your invitation email.');
        setVerifying(false);
        return;
      }

      try {
        // Verify the OTP token (for invite type)
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash,
          type: (type as 'invite' | 'email') || 'invite',
        });

        if (error) {
          console.error('Token verification error:', error);
          setTokenError(error.message || 'This invitation link is invalid or has expired.');
          setVerifying(false);
          return;
        }

        if (data?.user) {
          setVerified(true);
        } else {
          setTokenError('Unable to verify invitation. Please request a new invite.');
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setTokenError(err?.message || 'An error occurred while verifying your invitation.');
      } finally {
        setVerifying(false);
      }
    };

    checkAuthAndVerify();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) {
        setErrors({ general: error.message });
        setLoading(false);
        return;
      }

      // Update user status to Active in the users table
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        await supabase
          .from('users')
          .update({ status: 'Active' })
          .eq('email', user.email);
      }

      setSuccess(true);
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setErrors({ general: err?.message || 'Failed to set password' });
      setLoading(false);
    }
  };

  // Loading state while verifying token
  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
            <p className="text-neutral-600">Verifying your invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state - invalid or expired token
  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Invalid Invitation</CardTitle>
            <CardDescription className="text-red-600">
              {tokenError}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Link to="/signin" className="w-full">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Go to sign in
              </Button>
            </Link>
            <p className="text-sm text-neutral-600 text-center">
              Need a new invitation? Contact your administrator.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome to ResearchHub!</CardTitle>
            <CardDescription>
              Your password has been set successfully. Redirecting to dashboard...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main form - set password
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded bg-emerald-600" />
            <span className="text-xl">ResearchHub</span>
          </div>
          <CardTitle className="text-2xl">Set your password</CardTitle>
          <CardDescription>
            Create a password to complete your account setup
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errors.general && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {errors.general}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={errors.password ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={errors.confirmPassword ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={loading || !verified}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting password...
                </>
              ) : (
                'Set password'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
