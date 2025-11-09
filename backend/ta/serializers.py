from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import TAProfile
from core.models import Course
from accounts.models import User

class TAProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    courses_assigned = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = TAProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        ta = TAProfile.objects.create(user=user, **validated_data)
        return ta

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
