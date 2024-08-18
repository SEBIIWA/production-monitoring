from rest_framework import serializers
from .models import ProductModel, ProductInventoryModel


class ProductInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInventoryModel
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    inventory = ProductInventorySerializer(many=True, read_only=True)

    class Meta:
        model = ProductModel
        fields = "__all__"
