from django.db import models

from assembling.models import AssemblingModel
from users.models import UserModel


class TaskModel(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)  # ForeignKey to UserModel (one-to-many relationship)
    assembling = models.ForeignKey(AssemblingModel, on_delete=models.CASCADE)
    description = models.TextField()
    instructions = models.CharField(max_length=100)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
