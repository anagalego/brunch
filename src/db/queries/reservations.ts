import type { Reservation } from '@prisma/client' 
import { db } from '@/db'

export type ReservationWithData = Reservation & {
    user?: { id: string | null };
    mealTable?: { restaurantId: string | null }
}

export function fetchReservationsByUserId(userId: string): Promise<ReservationWithData[]> {
    return db.reservation.findMany({
        where: {
            userId: userId
        },
        include: {
            mealTable: {
                select: { restaurantId: true }
            }
        }
    })
}

export function fetchReservationsById(id: string): Promise<ReservationWithData> {
    return db.reservation.findFirstOrThrow({
        where: {
            id: id
        },
        include: {
            mealTable: true
        }
    })
}

//Delete
export function fetchReservations(): Promise<ReservationWithData[]> {
    return db.reservation.findMany({
        take: 10,
    })
}