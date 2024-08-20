from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import ProductModel, ProductInventoryModel
from .serializer import ProductSerializer, ProductInventorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.filter(soft_delete=False)
    serializer_class = ProductSerializer

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
    queryset = ProductInventoryModel.objects.all()
    serializer_class = ProductInventorySerializer

