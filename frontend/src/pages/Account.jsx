import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';

const Account = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await api.auth.updateProfile(profile);
      updateUser(data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Account Settings" showBackButton>
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

          {success && (
            <Alert type="success" onClose={() => setSuccess('')} className="mb-6">
              {success}
            </Alert>
          )}

          {error && (
            <Alert type="error" onClose={() => setError('')} className="mb-6">
              {error}
            </Alert>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                disabled={loading}
              />
              <Input
                label="Last Name"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                disabled={loading}
              />
            </div>

            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={loading}
            />

            <Input
              label="Username"
              value={user?.username || ''}
              disabled
              helperText="Username cannot be changed"
            />

            <Input
              label="Role"
              value={user?.role || ''}
              disabled
              helperText="Role is assigned by administrators"
            />

            <Button
              onClick={handleSubmit}
              loading={loading}
              className="w-full mt-6"
            >
              Save Changes
            </Button>
          </div>
        </Card>

        <Card className="p-8 mt-6">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <p className="text-gray-600 mb-4">
            Contact your administrator to reset your password.
          </p>
          <Button variant="outline">Request Password Reset</Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Account;