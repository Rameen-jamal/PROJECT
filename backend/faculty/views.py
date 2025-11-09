from rest_framework import viewsets, permissions
from .models import FacultyProfile
from .serializers import FacultyProfileSerializer

class FacultyProfileViewSet(viewsets.ModelViewSet):
    queryset = FacultyProfile.objects.all()
    serializer_class = FacultyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
