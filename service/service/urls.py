from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    #    path('admin/', admin.site.urls),
    path('api/', include('products.url')),
    path('api/', include('components.url')),
    path('api/', include('assembling.url')),
    path('api/', include('tasks.url')),
    path('api/', include('users.url')),
    # path('auth/', include('guard.url')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
