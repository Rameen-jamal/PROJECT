import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';

const Dashboard = () => {
  const { user, isTeacher, isAdmin } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'Courses',
      icon: '📚',
      description: 'View and manage your courses',
      path: '/courses',
      color: 'from-blue-500 to-blue-600',
      roles: ['student', 'teacher', 'admin'],
    },
    {
      title: 'Account',
      icon: '👤',
      description: 'Manage your profile settings',
      path: '/account',
      color: 'from-purple-500 to-purple-600',
      roles: ['student', 'teacher', 'admin'],
    },
    {
      title: 'Teaching',
      icon: '👨‍🏫',
      description: 'Manage your teaching courses',
      path: '/teacher',
      color: 'from-green-500 to-green-600',
      roles: ['teacher', 'admin'],
    },
    {
      title: 'Administration',
      icon: '⚙️',
      description: 'System administration',
      path: '/admin',
      color: 'from-red-500 to-red-600',
      roles: ['admin'],
    },
  ];

  const visibleCards = dashboardCards.filter(card => 
    card.roles.includes(user?.role)
  );

  return (
    <Layout title="Dashboard">
      <h2 className="text-3xl font-bold mb-2">
        Welcome back, {user?.firstName || user?.username}!
      </h2>
      <p className="text-gray-600 mb-8">What would you like to do today?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCards.map((card) => (
          <Card key={card.path} onClick={() => navigate(card.path)}>
            <div className={`bg-gradient-to-br ${card.color} p-6 rounded-t-xl`}>
              <div className="text-5xl mb-2">{card.icon}</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-3xl font-bold text-blue-600">--</div>
            <p className="text-gray-600 mt-2">Enrolled Courses</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-green-600">--</div>
            <p className="text-gray-600 mt-2">Completed</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-purple-600">--</div>
            <p className="text-gray-600 mt-2">In Progress</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;