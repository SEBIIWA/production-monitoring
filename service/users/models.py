from django.db import models
from django.contrib.auth.hashers import make_password


class UserModel(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cin = models.CharField(max_length=255, unique=True)
    telephone = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=255, default='EMPLOYEE')
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Check if the password is already hashed (assuming the length of a hashed password is 88)
        if not self.password.startswith('pbkdf2_') or len(self.password) != 88:
            self.password = make_password(self.password)
        super(UserModel, self).save(*args, **kwargs)
