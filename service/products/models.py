from django.db import models


class ProductModel(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    warranty_duration = models.IntegerField(default=1)
    ref = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    tva = models.DecimalField(max_digits=5, decimal_places=2, default=19)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ProductInventoryModel(models.Model):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    stock = models.IntegerField()
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
