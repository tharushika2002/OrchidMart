import uuid

from django.conf import settings
from supabase import create_client


supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_KEY,
)


def upload_orchid_image(image_file):
    """
    Upload an orchid image to Supabase Storage
    and return the public URL.
    """

    file_extension = image_file.name.split(".")[-1].lower()

    file_name = f"{uuid.uuid4()}.{file_extension}"

    file_path = f"orchids/{file_name}"

    file_content = image_file.read()

    supabase.storage \
        .from_(settings.SUPABASE_BUCKET) \
        .upload(
            file_path,
            file_content,
            {
                "content-type": image_file.content_type,
            },
        )

    public_url = supabase.storage \
        .from_(settings.SUPABASE_BUCKET) \
        .get_public_url(file_path)

    return public_url