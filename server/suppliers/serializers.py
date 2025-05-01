from rest_framework import serializers
from .models import Supplier, ReplenishmentOrder
from products.models import Product


class SupplierSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Product.objects.all()
    )

    class Meta:
        model = Supplier
        fields = "__all__"


class ReplenishmentOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplenishmentOrder
        fields = ["id", "supplier", "status", "products", "created_at", "updated_at"]
