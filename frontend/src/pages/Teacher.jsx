import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Teacher = () => {
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
      const data = await api.teacher.getCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.teacher.deleteCourse(courseId);
      setCourses(courses.filter(c => c.id !== courseId));
      setError('');
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'published') return course.published;
    if (filter === 'draft') return !course.published;
    return true;
  });

  if (loading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  return (
    <Layout title="Teaching Dashboard" showBackButton>
      {error && (
        <Alert type="error" onClose={() => setError('')} className="mb-6">
          {error}
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {['all', 'published', 'draft'].map((f) => (
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
        <Button onClick={() => navigate('/teacher/courses/create')}>
          + Create Course
        </Button>
      </div>

      {filteredCourses.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? 'Create your first course to get started!' 
              : `No ${filter} courses`}
          </p>
          <Button onClick={() => navigate('/teacher/courses/create')}>
            Create Course
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id}>
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
                  <span className={`px-3 py-1 rounded-full ${
                    course.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {course.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => navigate(`/teacher/courses/${course.id}`)}
                    className="flex-1"
                  >
                    Manage
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/teacher/courses/${course.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCourse(course.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Teacher;