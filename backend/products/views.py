from rest_framework import (
    status,
    viewsets,
)

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework.response import Response

from rest_framework.views import APIView


from .models import (
    Category,
    Orchid,
    OrchidImage,
)

from .serializers import (
    CategorySerializer,
    OrchidSerializer,
    OrchidImageSerializer,
)

from .services.supabase_storage import (
    upload_orchid_image,
)


# ============================================================
# CATEGORY
# ============================================================

class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer


# ============================================================
# ORCHID
# ============================================================

class OrchidViewSet(viewsets.ModelViewSet):

    queryset = (
        Orchid.objects
        .select_related("category")
        .prefetch_related("images")
        .all()
    )

    serializer_class = OrchidSerializer


# ============================================================
# ORCHID IMAGE UPLOAD
# ============================================================

class OrchidImageUploadView(APIView):

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    permission_classes = [
        IsAuthenticated,
    ]

    def post(
        self,
        request,
        orchid_id,
    ):

        # ----------------------------------------------------
        # Find Orchid
        # ----------------------------------------------------

        try:

            orchid = Orchid.objects.get(
                id=orchid_id,
            )

        except Orchid.DoesNotExist:

            return Response(
                {
                    "detail": "Orchid not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # ----------------------------------------------------
        # Get Image
        # ----------------------------------------------------

        image = request.FILES.get(
            "image",
        )

        if not image:

            return Response(
                {
                    "detail": "Image is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ----------------------------------------------------
        # Validate Image Type
        # ----------------------------------------------------

# ----------------------------------------------------
# Validate Image Type
# ----------------------------------------------------

            allowed_extensions = [
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
            ]

            allowed_types = [
                "image/jpeg",
                "image/png",
                "image/webp",
            ]

            file_name = image.name.lower()
            file_extension = "." + file_name.split(".")[-1]

            if (
                file_extension not in allowed_extensions
                and image.content_type not in allowed_types
            ):

                return Response(
                    {
                        "detail": (
                            "Only JPG, JPEG, PNG and WEBP "
                            "images are allowed."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # ----------------------------------------------------
        # Validate Image Size
        # ----------------------------------------------------

        max_size = 5 * 1024 * 1024

        if image.size > max_size:

            return Response(
                {
                    "detail": (
                        "Image size must be less than 5MB."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ----------------------------------------------------
        # Upload to Supabase
        # ----------------------------------------------------

        try:

            image_url = upload_orchid_image(
                image,
            )

        except Exception:

            return Response(
                {
                    "detail": (
                        "Failed to upload image "
                        "to Supabase."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # ----------------------------------------------------
        # Primary Image
        # ----------------------------------------------------

        is_primary = request.data.get(
            "is_primary",
            "false",
        )

        is_primary = (
            str(is_primary).lower() == "true"
        )

        # If this image is primary,
        # remove primary status from other images.

        if is_primary:

            OrchidImage.objects.filter(
                orchid=orchid,
            ).update(
                is_primary=False,
            )

        # ----------------------------------------------------
        # Save Image URL
        # ----------------------------------------------------

        orchid_image = OrchidImage.objects.create(
            orchid=orchid,
            image_url=image_url,
            is_primary=is_primary,
        )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        serializer = OrchidImageSerializer(
            orchid_image,
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )