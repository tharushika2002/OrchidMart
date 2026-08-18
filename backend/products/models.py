from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Orchid(models.Model):

    class Status(models.TextChoices):
        AVAILABLE = "AVAILABLE", "Available"
        OUT_OF_STOCK = "OUT_OF_STOCK", "Out of Stock"
        INACTIVE = "INACTIVE", "Inactive"

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="orchids",
    )

    name = models.CharField(
        max_length=200,
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    stock_quantity = models.PositiveIntegerField(
        default=0,
    )

    size = models.CharField(
        max_length=50,
        blank=True,
    )

    care_level = models.CharField(
        max_length=50,
        blank=True,
    )

    light_requirement = models.CharField(
        max_length=100,
        blank=True,
    )

    watering_frequency = models.CharField(
        max_length=100,
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class OrchidImage(models.Model):

    orchid = models.ForeignKey(
        Orchid,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image_url = models.URLField()

    is_primary = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = [
            "-is_primary",
            "-created_at",
        ]

    def __str__(self):
        return f"{self.orchid.name} Image"