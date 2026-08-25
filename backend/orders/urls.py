from django.urls import path

from .views import (
    CreateOrderView,
    OrderListView,
    OrderDetailView,
)


urlpatterns = [

    path(
        "create/",
        CreateOrderView.as_view(),
        name="create-order",
    ),

    path(
        "",
        OrderListView.as_view(),
        name="order-list",
    ),

    path(
        "<int:pk>/",
        OrderDetailView.as_view(),
        name="order-detail",
    ),

]