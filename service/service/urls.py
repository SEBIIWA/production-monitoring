from django.urls import path, include


urlpatterns = [
    #    path('admin/', admin.site.urls),
    path('api/', include('products.url')),
    path('api/', include('components.url')),
    path('api/',include('assembling.url')),
    path('api/', include('tasks.url')),
    path('api/', include('users.url')),
    # path('auth/', include('guard.url')),
]
