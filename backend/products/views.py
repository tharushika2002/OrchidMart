from rest_framework import viewsets

from .models import Category, Orchid
from .serializers import CategorySerializer, OrchidSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrchidViewSet(viewsets.ModelViewSet):
    queryset = Orchid.objects.select_related("category").all()
    serializer_class = OrchidSerializer