from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import StockViewSet, ComponentViewSet

router = DefaultRouter()

router.register(r'components', ComponentViewSet)
router.register(r'stocks', StockViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
