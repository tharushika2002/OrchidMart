from django.urls import path

from rest_framework.routers import DefaultRouter


from .views import (
    CategoryViewSet,
    OrchidViewSet,
    OrchidImageUploadView,
)


# ============================================================
# ROUTER
# ============================================================

router = DefaultRouter()


router.register(
    "categories",
    CategoryViewSet,
    basename="category",
)


router.register(
    "orchids",
    OrchidViewSet,
    basename="orchid",
)


# ============================================================
# URL PATTERNS
# ============================================================

urlpatterns = [

    # Upload orchid image
    path(
        "orchids/<int:orchid_id>/images/",
        OrchidImageUploadView.as_view(),
        name="orchid-image-upload",
    ),
]


# Add router URLs
urlpatterns += router.urls