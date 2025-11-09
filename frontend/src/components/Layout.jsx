import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

const Layout = ({ children, title, showBackButton = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button variant="secondary" onClick={() => navigate(-1)} size="sm">
                ← Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/dashboard')}>
                {title || 'LMS'}
              </h1>
              {user && (
                <p className="text-sm text-gray-600">
                  <span className="capitalize">{user.role}</span>
                  {user.email && ` • ${user.email}`}
                </p>
              )}
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/account')} size="sm">
                Account
              </Button>
              <Button variant="danger" onClick={logout} size="sm">
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;