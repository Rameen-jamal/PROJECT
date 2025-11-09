import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'users') {
        const data = await api.admin.getUsers();
        setUsers(data);
      } else {
        const data = await api.admin.getCourses();
        setCourses(data);
      }
    } catch (err) {
      setError(`Failed to load ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await api.admin.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      setError('');
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading admin data..." />;
  }

  return (
    <Layout title="Administration" showBackButton>
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'users' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('users')}
        >
          Users
        </Button>
        <Button
          variant={activeTab === 'courses' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </Button>
        <Button
          variant={activeTab === 'stats' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </Button>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      {activeTab === 'users' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="p-6">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>👥 {course.studentCount || 0} students</span>
                <span>👨‍🏫 {course.instructor}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-4xl font-bold text-blue-600">{users.length}</div>
            <p className="text-gray-600 mt-2">Total Users</p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl font-bold text-green-600">{courses.length}</div>
            <p className="text-gray-600 mt-2">Total Courses</p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl font-bold text-purple-600">--</div>
            <p className="text-gray-600 mt-2">Active Sessions</p>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default Admin;