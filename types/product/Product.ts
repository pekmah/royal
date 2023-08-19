export interface ProductEntity {
    id: number;
    feature?: null[] | null;
    average_rating?: null;
    pricing?: (ProductSizes | null)[] | null;
    thumbnails?: ProductThumbnail[] | null;
    thumbnail_colors?:string[] | null
    name: string;
    description: string;
    ingredients?: null;
    recommended: boolean;
    category: number;
    total_reviews: number;
    review_summary: number;
    roof_details:string[]
    length:string[]
    reviews?: Array<any> | null;
    qty?:number
}

export interface ProductCart {
    id:number
    user:string
    items:Array<any> | null
    quantity:number
    length:null | number
    color:null | string
    total_price: number
}

export interface    ProductSizes {
    id: number;
    gauge_size: number;
    price: number;
    width:string
    finish:string
    percentage_discount?: number | null;
    discounted: boolean;
    preparation_time: string;
    quantity: number;
    product: number;
}

export interface ProductThumbnail {
    id: number;
    thumbnail_code: string;
    thumbnail_color?:string
    color?: string;
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
