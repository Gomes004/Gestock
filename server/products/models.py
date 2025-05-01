from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings


class Product(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=200)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)]
    )
    current_stock = models.PositiveIntegerField(default=0)
    minimum_stock = models.PositiveIntegerField(
        default=1, help_text="Quantidade mínima em estoque para gerar alertas"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Products"

    def __str__(self):
        return f"{self.name} ({self.code})"

    @property
    def stock_status(self):
        if self.current_stock == 0:
            return "out_of_stock"
        elif self.current_stock <= self.minimum_stock:
            return "low_stock"
        return "in_stock"


class StockMovement(models.Model):
    MOVEMENT_TYPES = (
        ("in", "Entrada"),
        ("out", "Saída"),
    )

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="movements"
    )
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_TYPES)
    quantity = models.PositiveIntegerField()
    reason = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Stock Movements"

    def __str__(self):
        return f"{self.get_movement_type_display()} - {self.product.name} ({self.quantity})"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_product_stock()

    def update_product_stock(self):
        product = self.product
        if self.movement_type == "in":
            product.current_stock += self.quantity
        else:  # 'out'
            product.current_stock -= self.quantity
        product.save()
