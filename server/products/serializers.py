from rest_framework import serializers
from .models import Product, StockMovement


class StockMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMovement
        fields = [
            "id",
            "product",
            "movement_type",
            "quantity",
            "reason",
            "created_by",
            "created_at",
        ]
        read_only_fields = ["created_by", "created_at"]
        extra_kwargs = {
            "quantity": {"min_value": 1},
        }

    def validate(self, data):
        product = data.get("product")
        movement_type = data.get("movement_type")
        quantity = data.get("quantity")

        if movement_type == "out" and product.current_stock < quantity:
            raise serializers.ValidationError(
                {
                    "quantity": f"Estoque insuficiente. Disponível: {product.current_stock}"
                }
            )

        return data

    def create(self, validated_data):
        validated_data["created_by"] = self.context["request"].user
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    stock_status = serializers.SerializerMethodField()
    stock_warning = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "code",
            "name",
            "description",
            "category",
            "price",
            "current_stock",
            "minimum_stock",
            "is_active",
            "created_at",
            "updated_at",
            "stock_status",
            "stock_warning",
        ]
        read_only_fields = ["created_at", "updated_at", "stock_status", "stock_warning"]
        extra_kwargs = {
            "code": {"required": True},
            "name": {"required": True},
            "price": {"min_value": 0.01},
        }

    def get_stock_status(self, obj):
        return obj.stock_status

    def get_stock_warning(self, obj):
        if obj.current_stock <= obj.minimum_stock:
            return {
                "alert": "low_stock",
                "message": f"O produto {obj.name} atingiu o estoque mínimo",
                "current_stock": obj.current_stock,
                "minimum_stock": obj.minimum_stock,
            }
        return None
