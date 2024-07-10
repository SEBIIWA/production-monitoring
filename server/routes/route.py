from django.urls import path
from django.contrib import admin

from views.auth import me, login, logout, register


urlpatterns = [
    path('me', me),
    path('login', login),
    path('logout', logout),
    path('register', register),
    path('/', admin.site.urls),
]