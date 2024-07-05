from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from serializers.auth import AuthSerializer

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def me(request):
    user = get_object_or_404(User, pk=request.user.id)
    serializer = AuthSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = get_object_or_404(User, username=username)
    if user.check_password(password):
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'created': created})
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def register(request):
    serializer = AuthSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user':serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# {
#   "token": "94927c6674bedb070b188b895948a4c8f59c7d36",
#   "user": {
#     "id": 1,
#     "username": "wale",
#     "password": "azerty",
#     "email": "test@email.com"
#   }
# }