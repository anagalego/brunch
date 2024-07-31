import type { MealTable } from '@prisma/client' 
import { db } from '@/db'

export type MealTableWithData = MealTable & {
    restaurant?: { id: string | null, name: string | null };
}

export function fetchMealTablesBySeats(seats: number): Promise<MealTableWithData[]> {
    return db.mealTable.findMany({
        where: {
            seats: {
                gt: seats-1
            }
        }
    })
}

export function fetchMealTablesByRestaurantId(restaurantId: string): Promise<MealTableWithData[]> {
    return db.mealTable.findMany({
        where: {
            restaurantId: restaurantId
        }
    })
}

export function fetchSmallestMealTableByRestaurantId(restaurantId: string, seats: number): Promise<MealTableWithData> {
    return db.mealTable.findFirstOrThrow({
        where: {
            restaurantId: restaurantId,
            seats: {
                gt: seats-1
            }
        },
        orderBy: [
            {
              seats: 'asc',
            }
        ]
    })
}
//
export function fetchMealTableById(id: string): Promise<MealTableWithData> {
    return db.mealTable.findFirstOrThrow({
        where: {
            id: id
        }
    })
}

export function fetchAllMealTables(): Promise<MealTableWithData[]> {
    return db.mealTable.findMany()
}