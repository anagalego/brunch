'use server'

import type { MealTable } from "@prisma/client";
import { fetchRestaurantById } from "@/db/queries/restaurants";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { db } from "../db";
import paths from "../paths";

const createMealTableSchema = z.object({
    seats: z.preprocess((x) => Number(x), z.number().int().lt(50, {
            message: 'Is this a wedding!?'
        }).positive()),
    //outdoor: z.boolean()
})

interface CreateMealTableFormState {
    errors: {
        seats?: string[],
        outdoor?: string[], 
        _form?: string[]
    };
}

export async function createMealTable(
    restaurantId: string,
    formState: CreateMealTableFormState,
    formData: FormData
): Promise<CreateMealTableFormState> {
    const result = createMealTableSchema.safeParse({
        seats: formData.get('seats')      
    });
    
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if(!session || !session.user) {
        return {
            errors: {
                _form: ['You must sign in to do this.']
            },
        }
    } else {
        const restaurant = await fetchRestaurantById(restaurantId)

        if(!restaurant) {
            return {
                errors: {
                    _form: ['Can not find restaurant.']
                }
            }
        }

        let mealTable: MealTable;

        try {
            mealTable = await db.mealTable.create({
                data: {
                    outdoor: false,
                    seats: result.data.seats,
                    restaurantId: restaurant.id
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
                        _form: ['Something went wrong.']
                    }
                }
            }
        }
        revalidatePath(paths.brunchDetailEditMode(restaurant.slug))
        redirect(paths.brunchDetailEditMode(restaurant.slug))
    }
}
