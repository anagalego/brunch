import type { Favourite } from '@prisma/client' 
import { db } from '@/db'

export function fetchFavouritesByOwnerId(ownerId: string): Promise<Favourite[]> {
    return db.favourite.findMany({
        where: {
            ownerId: ownerId
        }
    })
}