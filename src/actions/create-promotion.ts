'use server'

import type { Promotion } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { db } from "../db";
import paths from "../paths";
import { fetchRestaurantById } from "@/db/queries/restaurants";

const createPromotionSchema = z.object({
    code: z.string().min(5).max(10).regex(/[\w-]+/, {
        message: 'Only between 5 and 10 characters.'
        }),
    percentage: z.preprocess((x) => Number(x), z.number().gt(9, {
        message:'Promotions start at 10%.'
        }).lt(51, {
            message: 'Maximum 50%.'
        }).int().positive()),
    start: z.string().regex(/[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}[.\s][0-9]{2}[\:][0-9]{2}/, {
        message: 'Start must follow the correct format.'
        }),
    end: z.string().regex(/[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}[.\s][0-9]{2}[\:][0-9]{2}/, {
        message: 'End must follow the correct format.'
        })
})

interface CreatePromotionFormState {
    errors: {
        code?: string[],
        percentage?: string[], 
        start?: string[],
        end?: string[],
        _form?: string[]
    };
}

export async function createPromotion(
    restaurantId: string,
    formState: CreatePromotionFormState,
    formData: FormData
): Promise<CreatePromotionFormState> {
    const result = createPromotionSchema.safeParse({
        code: formData.get('code'),
        percentage: formData.get('percentage'), 
        start: formData.get('start'),
        end: formData.get('end'),        
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

        let promotion: Promotion;

        try {
            promotion = await db.promotion.create({
                data: {
                    code: result.data.code,
                    percentage: result.data.percentage,
                    start: result.data.start,
                    end: result.data.end,
                    ownerId: restaurant.id
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
