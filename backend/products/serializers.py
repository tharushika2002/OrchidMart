from rest_framework import serializers

from .models import Category, Orchid, OrchidImage


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


class OrchidImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrchidImage

        fields = [
            "id",
            "orchid",
            "image_url",
            "is_primary",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "image_url",
            "created_at",
        ]


class OrchidSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    images = OrchidImageSerializer(
        many=True,
        read_only=True,
    )

    primary_image = serializers.SerializerMethodField()

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
            "images",
            "primary_image",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "category_name",
            "images",
            "primary_image",
            "created_at",
            "updated_at",
        ]

    def get_primary_image(self, obj):
        primary_image = obj.images.filter(
            is_primary=True
        ).first()

        if primary_image:
            return primary_image.image_url

        first_image = obj.images.first()

        if first_image:
            return first_image.image_url

        return None