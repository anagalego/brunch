import type { TimeSlot } from '@prisma/client' 
import { db } from '@/db'

export type TimeSlotWithData = TimeSlot & {
    day?: { restaurantId: string | null };
}

//
export function fetchOpenByHour(hour: string): Promise<TimeSlotWithData[]> {
    return db.timeSlot.findMany({
        where: {
            time: hour
        },
        take: 20
    })
}