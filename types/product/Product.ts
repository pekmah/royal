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
	reviews?: null;
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
