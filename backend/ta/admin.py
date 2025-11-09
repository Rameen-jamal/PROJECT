from django.contrib import admin

# Register your models here.
# ta/admin.py
from django.contrib import admin
from .models import TAProfile

admin.site.register(TAProfile)
