from rest_framework import viewsets

from .models import ComponentInventoryModel, ComponentModel
from .serializer import ComponentSerializer, ComponentInventorySerializer


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = ComponentModel.objects.filter()
    serializer_class = ComponentSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = ComponentInventoryModel.objects.all()
    serializer_class = ComponentInventorySerializer
