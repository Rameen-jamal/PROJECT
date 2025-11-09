from django.db import models
from accounts.models import User
from core.models import Course

class TAProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courses_assigned = models.ManyToManyField(Course, blank=True)
    contact_number = models.CharField(max_length=15, blank=True)
    department = models.CharField(max_length=50, blank=True)
    tasks = models.TextField(blank=True)  # Optional summary of TA tasks

    def __str__(self):
        return f"{self.user.username} - TA"
