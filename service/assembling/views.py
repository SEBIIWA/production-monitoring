from rest_framework import viewsets
from .models import AssemblingModel
from .serializer import AssemblingSerializer


class AssemblingViewSet(viewsets.ModelViewSet):
    queryset = AssemblingModel.objects.all()
    serializer_class = AssemblingSerializer
