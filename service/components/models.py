from django.db import models


class ComponentModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Increased max_digits for more flexibility
    height = models.DecimalField(max_digits=10, decimal_places=2)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)  # To classify the component into categories
    manufacturer = models.CharField(max_length=100)  # To record the manufacturer of the component
    model_number = models.CharField(max_length=100)  # To identify the specific model of the component
    stock_quantity = models.PositiveIntegerField()  # To track the quantity in stock
    soft_delete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ComponentInventoryModel(models.Model):
    component = models.ForeignKey(ComponentModel, on_delete=models.CASCADE)
    stock = models.IntegerField()
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
