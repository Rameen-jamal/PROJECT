import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await api.courses.getAll();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.courses.enroll(courseId);
      await fetchCourses();
      setError('');
    } catch (err) {
      setError('Failed to enroll in course');
    }
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'enrolled') return course.isEnrolled;
    if (filter === 'available') return !course.isEnrolled;
    return true;
  });

  if (loading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  return (
    <Layout title="Courses" showBackButton>
      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      <div className="flex gap-4 mb-6">
        {['all', 'enrolled', 'available'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'outline'}
            onClick={() => setFilter(f)}
            size="sm"
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? 'No courses available at the moment' 
              : `No ${filter} courses`}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} onClick={() => navigate(`/courses/${course.id}`)}>
              {course.thumbnail && (
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>👥 {course.studentCount || 0} students</span>
                  <span>👨‍🏫 {course.instructor}</span>
                </div>
                {course.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <Button 
                  variant={course.isEnrolled ? 'secondary' : 'primary'}
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!course.isEnrolled) {
                      handleEnroll(course.id);
                    }
                  }}
                >
                  {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Courses;