import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await api.courses.getById(id);
      setCourse(data);
    } catch (err) {
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading course..." />;
  }

  if (error || !course) {
    return (
      <Layout title="Course" showBackButton>
        <Alert type="error">{error || 'Course not found'}</Alert>
      </Layout>
    );
  }

  return (
    <Layout title={course.title} showBackButton>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.modules?.map((module, idx) => (
                <div key={idx} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg">{module.title}</h3>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
              ))}
              {!course.modules?.length && (
                <p className="text-gray-500">No content available yet.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Course Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Instructor:</span>
                <span className="font-semibold">{course.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{course.duration || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Students:</span>
                <span className="font-semibold">{course.studentCount || 0}</span>
              </div>
              {course.progress !== undefined && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
            <Button className="w-full mt-6">
              Continue Learning
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                📝 Assignments
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                💬 Discussions
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                📊 Grades
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;