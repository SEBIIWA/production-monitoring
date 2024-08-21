from rest_framework import viewsets
from .models import UserModel
from .serializer import UserSerializer  # Corrected import path


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
