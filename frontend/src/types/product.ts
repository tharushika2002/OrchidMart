export interface ProductImage {
    id: number;
    orchid: number;
    image_url: string;
    is_primary: boolean;
    created_at: string;
}

export interface Product {
    id: number;

    category: number;
    category_name: string;

    name: string;
    description: string;

    price: string;
    stock_quantity: number;

    size: string;
    care_level: string;
    light_requirement: string;
    watering_frequency: string;

    status: string;

    images?: ProductImage[];

    created_at: string;
    updated_at: string;
}