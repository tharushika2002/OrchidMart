from decimal import Decimal

from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Orchid

from .models import Order, OrderItem
from .serializers import OrderSerializer


class CreateOrderView(APIView):

    @transaction.atomic
    def post(self, request):

        data = request.data

        items = data.get("items", [])

        if not items:
            return Response(
                {
                    "error": "Your cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


        subtotal = Decimal("0.00")


        # =====================================================
        # VALIDATE PRODUCTS + CALCULATE SUBTOTAL
        # =====================================================

        validated_items = []


        for item in items:

            product_id = item.get("product_id")
            quantity = item.get("quantity")


            if not product_id or not quantity:

                return Response(
                    {
                        "error": "Product ID and quantity are required."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )


            try:
                quantity = int(quantity)

            except (TypeError, ValueError):

                return Response(
                    {
                        "error": "Invalid quantity."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )


            if quantity <= 0:

                return Response(
                    {
                        "error": "Quantity must be greater than zero."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )


            try:
                product = Orchid.objects.get(
                    id=product_id
                )

            except Orchid.DoesNotExist:

                return Response(
                    {
                        "error": f"Product {product_id} does not exist."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )


            # =================================================
            # STOCK CHECK
            # =================================================

            if product.stock_quantity < quantity:

                return Response(
                    {
                        "error": (
                            f"Only {product.stock_quantity} "
                            f"units of {product.name} are available."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )


            unit_price = Decimal(
                str(product.price)
            )

            item_total = unit_price * quantity

            subtotal += item_total


            validated_items.append(
                {
                    "product": product,
                    "quantity": quantity,
                    "unit_price": unit_price,
                    "total_price": item_total,
                }
            )


        # =====================================================
        # DELIVERY FEE
        # =====================================================

        delivery_fee = Decimal("0.00")


        # =====================================================
        # CREATE ORDER
        # =====================================================

        order = Order.objects.create(

            user=(
                request.user
                if request.user.is_authenticated
                else None
            ),

            first_name=data.get(
                "first_name",
                ""
            ),

            last_name=data.get(
                "last_name",
                ""
            ),

            email=data.get(
                "email",
                ""
            ),

            phone=data.get(
                "phone",
                ""
            ),

            address=data.get(
                "address",
                ""
            ),

            city=data.get(
                "city",
                ""
            ),

            postal_code=data.get(
                "postal_code",
                ""
            ),

            province=data.get(
                "province",
                ""
            ),

            payment_method=data.get(
                "payment_method",
                "COD"
            ).upper(),

            subtotal=subtotal,

            delivery_fee=delivery_fee,

            total=subtotal + delivery_fee,
        )


        # =====================================================
        # CREATE ORDER ITEMS + UPDATE STOCK
        # =====================================================

        for item in validated_items:

            product = item["product"]

            OrderItem.objects.create(

                order=order,

                product=product,

                quantity=item["quantity"],

                unit_price=item["unit_price"],

                total_price=item["total_price"],
            )


            product.stock_quantity -= item["quantity"]

            product.save(
                update_fields=["stock_quantity"]
            )


        # =====================================================
        # RESPONSE
        # =====================================================

        serializer = OrderSerializer(order)

        return Response(
            {
                "message": "Order created successfully.",
                "order": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )