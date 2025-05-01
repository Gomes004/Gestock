from django.db import models
import uuid
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O e-mail é obrigatório")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        #UserProfile.objects.get_or_create(user=user)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        extra_fields.setdefault("is_active", True)

        user = self.create_user(email, password, **extra_fields)

        if not hasattr(user, "userprofile"):
            UserProfile.objects.create(user=user)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("admin", "Administrador"),
        ("manager", "Gestor"),
        ("stock_operator", "Operador de Estoque"),
    ]

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default="stock_operator"
    )

    description = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to="media/", blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def is_admin(self):
        return self.role == "admin" or self.is_superuser

    def is_manager(self):
        return self.role == "manager" or self.is_admin()

    def is_stock_operator(self):
        return self.role == "stock_operator" or self.is_manager()


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    login_attempts = models.IntegerField(default=0)
    is_locked = models.BooleanField(default=False)
    reset_token = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Profile for {self.user.email}"


class EmailConfirmationToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token for {self.user.email}"
