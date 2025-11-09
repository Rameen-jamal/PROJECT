from rest_framework import serializers
from .models import Course 
from students.models import Enrollment # <-- CORRECTED IMPORT
from faculty.serializers import FacultyProfileSerializer
from students.serializers import StudentProfileSerializer

class CourseSerializer(serializers.ModelSerializer):
    faculty = FacultyProfileSerializer()  # nested faculty

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'code',
            'description',
            'credits',
            'faculty',
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer()
    course = CourseSerializer()

    class Meta:
        model = Enrollment
        fields = [
            'id',
            'student',
            'course',
            'date_enrolled',
            'status',
        ]
