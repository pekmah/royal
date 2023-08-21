"use server"
import { PaginatedResponse } from "@/types/api/Response";
import { CarouselEntity } from "@/types/carousel/Carousel";

export default async function getCarouselImages(
    page = 1
): Promise<PaginatedResponse<CarouselEntity>> {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/carousel?page=${page}`
        );
        if (!res.ok) {
            throw new Error('Failed to fetch carousel images');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching carousel images:', error);
        throw error; // Rethrow the error to be caught by the query
    }
}