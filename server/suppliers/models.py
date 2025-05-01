from django.db import models


class Supplier(models.Model):
    name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    products = models.ManyToManyField("products.Product", related_name="suppliers")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ReplenishmentOrder(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pendente"),
        ("sent", "Enviado"),
        ("received", "Recebido"),
        ("cancelled", "Cancelado"),
    )

    supplier = models.ForeignKey(
        Supplier, on_delete=models.CASCADE, related_name="orders"
    )
    products = models.ManyToManyField(
        "products.Product", related_name="replenishment_orders"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Pedido #{self.id} - {self.supplier.name}"
