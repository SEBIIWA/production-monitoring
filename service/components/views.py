from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import ComponentInventoryModel, ComponentModel
from .serializer import ComponentSerializer, ComponentInventorySerializer


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = ComponentModel.objects.filter(soft_delete=False)
    serializer_class = ComponentSerializer

    def destroy(self, request, *args, **kwargs):
        """
        Custom delete method that allows for soft delete
        """

        if request.query_params.get('soft') is not None:
            instance = self.get_object()
            # Update the `soft_delete` field with the value from the soft query parameter
            instance.soft_delete = request.query_params.get('soft')
            instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        # Perform the regular delete operation
        return super().destroy(request, *args, **kwargs)


class StockViewSet(viewsets.ModelViewSet):
    queryset = ComponentInventoryModel.objects.all()
    serializer_class = ComponentInventorySerializer
