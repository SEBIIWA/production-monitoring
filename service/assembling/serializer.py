from rest_framework import serializers
from .models import AssemblingModel


class AssemblingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssemblingModel
        fields = '__all__'


def validate(data):
    if not data.get('component'):
        raise serializers.ValidationError("Component ID is required.")
    if not data.get('product'):
        raise serializers.ValidationError("Product ID is required.")
    return data
