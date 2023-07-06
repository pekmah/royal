export interface ProductEntity {
    id: number;
    feature?: null[] | null;
    average_rating?: null;
    sizes?: (ProductSizes | null)[] | null;
    thumbnails?: ProductThumbnail[] | null;
    name: string;
    description: string;
    ingredients?: null;
    recommended: boolean;
    category: number;
    total_reviews: number;
    review_summary: number;
    reviews?: Array<any> | null;
}

export interface ProductSizes {
    id: number;
    size: string;
    price: number;
    percentage_discount?: number | null;
    discounted: boolean;
    preparation_time: string;
    quantity: number;
    product: number;
}

export interface ProductThumbnail {
    id: number;
    thumbnail_code: string;
}

export interface ProductReview {
    id: number;
    product: number;
    rating: number;
    comments: string;
    hidden: boolean;
    review_date: string;
    user: string;
}
