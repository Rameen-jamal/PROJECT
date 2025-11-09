from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from students.views import StudentProfileViewSet
from faculty.views import FacultyProfileViewSet
from ta.views import TAProfileViewSet
from core.views import CourseViewSet

router = routers.DefaultRouter()
router.register(r'students', StudentProfileViewSet)
router.register(r'faculty', FacultyProfileViewSet)
router.register(r'tas', TAProfileViewSet)
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
