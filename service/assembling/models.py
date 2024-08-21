from django.db import models
from components.models import ComponentModel
from products.models import ProductModel


class AssemblingModel(models.Model):
    components = models.ForeignKey(ComponentModel, on_delete=models.CASCADE)
    products = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
