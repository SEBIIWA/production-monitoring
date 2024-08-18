from django.db import models


class ProductModel(models.Model):
    name = models.CharField(max_length=100)
    tva = models.DecimalField(max_digits=5, decimal_places=2, default=19)
    description = models.TextField()
    category = models.CharField(max_length=100)
    height = models.DecimalField(max_digits=10, decimal_places=2)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    length = models.DecimalField(max_digits=10, decimal_places=2)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    warranty_duration = models.IntegerField(default=1)
    warranty_description = models.TextField(blank=True, null=True)
    soft_delete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ProductInventoryModel(models.Model):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    stock = models.IntegerField()
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
