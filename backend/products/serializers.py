from rest_framework import serializers

from .models import Category, Orchid


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


class OrchidSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Orchid
        fields = [
            "id",
            "category",
            "category_name",
            "name",
            "description",
            "price",
            "stock_quantity",
            "size",
            "care_level",
            "light_requirement",
            "watering_frequency",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "category_name",
            "created_at",
            "updated_at",
        ]