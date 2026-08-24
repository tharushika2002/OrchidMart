from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    class Meta:
        model = OrderItem

        fields = [
            "product",
            "product_name",
            "quantity",
            "unit_price",
            "total_price",
        ]

        read_only_fields = [
            "product_name",
            "unit_price",
            "total_price",
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "address",
            "city",
            "postal_code",
            "province",
            "payment_method",
            "status",
            "subtotal",
            "delivery_fee",
            "total",
            "items",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "subtotal",
            "delivery_fee",
            "total",
            "items",
            "created_at",
        ]