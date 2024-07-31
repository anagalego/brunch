import type { Promotion } from '@prisma/client' 
import { db } from '@/db'

export type PromotionWithData = Promotion & {
    restaurant?: { id: string | null };
}

export function fetchPromotionsByRestaurantId(restaurantId: string): Promise<PromotionWithData[]> {
    return db.promotion.findMany({
        where: {
            ownerId: restaurantId
        }
    })
}