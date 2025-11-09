from django.contrib import admin

# students/admin.py
from django.contrib import admin
from .models import StudentProfile

admin.site.register(StudentProfile)

