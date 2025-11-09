from rest_framework import viewsets, permissions
from .models import StudentProfile
from .serializers import StudentProfileSerializer

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
