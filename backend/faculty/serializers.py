from accounts.serializers import UserSerializer
from rest_framework import serializers
from .models import FacultyProfile
from accounts.models import User
from core.models import Course

class FacultyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    courses_teaching = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = FacultyProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        faculty = FacultyProfile.objects.create(user=user, **validated_data)
        return faculty

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
