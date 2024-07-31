import type { Product } from '@prisma/client' 
import { db } from '@/db'

export type ProductWithData = Product & {
    restaurant?: { id: string | null };
}

export function fetchProductsByRestaurantId(restaurantId: string): Promise<ProductWithData[]> {
    return db.product.findMany({
        where: {
            restaurantId: restaurantId
        }
    })
}