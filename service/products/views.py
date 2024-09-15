from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import ProductModel, ProductInventoryModel
from .serializer import ProductSerializer, ProductInventorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = ProductInventoryModel.objects.all()
    serializer_class = ProductInventorySerializer

