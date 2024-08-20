from rest_framework import serializers
from .models import ComponentModel, ComponentInventoryModel


class ComponentInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentInventoryModel
        fields = '__all__'


class ComponentSerializer(serializers.ModelSerializer):
    inventory = ComponentInventorySerializer(many=True, read_only=True)

    class Meta:
        model = ComponentModel
        fields = '__all__'
