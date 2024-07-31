import type { Day } from '@prisma/client' 
import { db } from '@/db'

export type DayWithData = Day & {
    restaurant?: { id: string | null, name: string | null };
}

export function fetchDayById(id: number): Promise<DayWithData> {
    return db.day.findFirstOrThrow({
        where: {
            id: id
        }
    })
}
//
export function fetchDayByRestaurantId(restaurantId: string): Promise<DayWithData[]> {
    return db.day.findMany({
        where: {
            restaurantId: restaurantId
        },
        orderBy: [
            {
              id: 'asc',
            }
        ],
    })
}

//
export function fetchOpenByWeekday(weekday: string): Promise<DayWithData[]> {
    return db.day.findMany({
        where: {
            weekday: weekday,
            closed: false
        },
        take: 20
    })
}