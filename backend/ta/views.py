from rest_framework import viewsets, permissions
from .models import TAProfile
from .serializers import TAProfileSerializer

class TAProfileViewSet(viewsets.ModelViewSet):
    queryset = TAProfile.objects.all()
    serializer_class = TAProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
