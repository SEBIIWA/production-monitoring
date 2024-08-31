from django.db import models


class CategoryModel(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=200)
    isForProduct = models.BooleanField(default=True)
    isForComponent = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
