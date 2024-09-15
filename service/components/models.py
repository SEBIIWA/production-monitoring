from django.db import models


class ComponentModel(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    model_number = models.CharField(max_length=100)
    ref = models.CharField(max_length=100, unique=True)
    manufacturer = models.CharField(max_length=100)
    image = models.ImageField(upload_to='components/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ComponentInventoryModel(models.Model):
    component = models.ForeignKey(ComponentModel, on_delete=models.CASCADE)
    stock = models.IntegerField()
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
