from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssemblingViewSet

router = DefaultRouter()
router.register(r'assembling', AssemblingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
