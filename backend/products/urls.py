from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, OrchidViewSet


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

urlpatterns = router.urls