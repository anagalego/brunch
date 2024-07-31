'use server'

import type { Reservation } from "@prisma/client";
import { fetchSmallestMealTableByRestaurantId } from "../db/queries/meal-tables"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createReservationSchema = z.object({
    seats: z.preprocess((x) => Number(x), z.number().gt(8, {
        message:'Are you that exclusive?'
        }).lt(80, {
            message: 'Is this a school cafeteria?'
        }).int().positive()),
    time: z.string().regex(/[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}[.\s][0-9]{2}[\:][0-9]{2}/, {
        message: 'Time must follow the correct format.'
        }),
    name: z.string().min(5).max(50).regex(/[\w-]+/, {
        message: 'Only between 5 and 50 characters.'
        }),
    description: z.string().max(250, {
            message: 'Are you writing a novel?'
        }),
})

interface CreateReservationFormState {
    errors: {
        seats?: string[],
        time?: string[],
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}

export async function createReservation(
    restaurantId: string,
    formState: CreateReservationFormState,
    formData: FormData
): Promise<CreateReservationFormState> {
    const result = createReservationSchema.safeParse({
        time: formData.get('time'),
        seats: formData.get('seats'),
        comment: formData.get('comment')
    });

    if(!result.success) {
        console.log(formData.get('time'))
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth();
    if(!session || !session.user) {
        return {
            errors: {
                _form: ['You must sign in to do this.']
            }
        }
    } else {
        //ISO-8601 DateTime :: 2020-07-10 15:00:00.000
        const time = result.data.time.replace(/\s+/g, 'T') + ":00.000Z"


        const mealTable = await fetchSmallestMealTableByRestaurantId(restaurantId, result.data.seats)
        if(!mealTable) {
            return {
                errors: {
                    _form: ['Can not find table.']
                }
            }
        }

        let reservation: Reservation;
        try {
            reservation = await db.reservation.create({
                data: {
                    seats: result.data.seats,
                    time: time,
                    name: result.data.name,
                    description: result.data.description,
                    status: "confirmed",
                    userId: session.user.id,
                    mealTableId: mealTable.id
                }
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                return {
                    errors: {
                        _form: [err.message]
                    }
                }
            } else {
                return {
                    errors: {
                        _form: ['Failed to create post.']
                    }
                }
            }
        }
    }    
    revalidatePath(paths.reservations())
    redirect('/')
}