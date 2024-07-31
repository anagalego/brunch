import { notFound } from 'next/navigation'
import { Restaurant } from '@prisma/client';

interface RestaurantDetailProps {
    restaurant: Restaurant
}

export default async function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
    if(!restaurant) {
        notFound()
    }

    return (
    <div className="m-4">
        <h1 className="text-2xl font-bold my-2">{restaurant.name}</h1>
        <p className="p-4 border rounded">{restaurant.description}</p>
    </div>
    );
}
