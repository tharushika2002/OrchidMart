from django.contrib import admin

from .models import Category, Orchid


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)


@admin.register(Orchid)
class OrchidAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "stock_quantity",
        "status",
    )

    list_filter = (
        "category",
        "status",
    )

    search_fields = (
        "name",
        "description",
    )