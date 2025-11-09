from django.db import models
from accounts.models import User
from core.models import Course

class FacultyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=15, blank=True)
    office = models.CharField(max_length=50, blank=True)
    courses_teaching = models.ManyToManyField(Course, blank=True, related_name='faculty_members')

    def __str__(self):
        return f"{self.user.username} - {self.department}"
