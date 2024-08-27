from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from rest_framework import status
from django.shortcuts import get_object_or_404

from users.serializer import UserSerializer
from users.models import UserModel


class AuthViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def authenticated(self, request):
        user = get_object_or_404(UserModel, pk=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = get_object_or_404(UserModel, username=username)
        if user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'created': created})
        return Response({'detail': 'Incorrect password'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    @action(detail=False, methods=['get'])
    def logout(self, request):
        if request.auth:
            request.auth.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'Not authenticated'}, status=status.HTTP_400_BAD_REQUEST)
