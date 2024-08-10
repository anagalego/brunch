'use server'

import type { Restaurant } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { db } from "../db";
import paths from "../paths";
import { createSchedule } from "./create-schedule";

const createRestaurantSchema = z.object({
    name: z.string().min(3).max(100).regex(/[\w-]+/, {
        message: 'Only between 5 and 50 characters.'
        }),
    description: z.string().min(25, {
        message: 'Please, elaborate more...'
        }).max(1500, {
            message: 'Are you writing a novel?'
        }).regex(/[\w-]+/, {
            message: 'Only characters or numbers.'
        }),
    style: z.string().min(3).max(100).regex(/[\w-]+/, {
        message: 'Only between 5 and 50 characters.'
        }),
    categories: z.string().min(3).max(100).regex(/[\w-]+/, {
        message: 'Only between 5 and 50 characters.'
        }),
    city: z.string().min(3).max(50).regex(/[A-Za-z0-9]+/, {
        message: 'Only between 5 and 50 characters.'
        }),
    address: z.string().min(10).max(20).regex(/[A-Za-z0-9.\s_-]+/, {
        message: 'Only between 5 and 50 characters or numbers.'
        }),
    zip: z.string().min(10).max(50).regex(/[A-Za-z0-9.\s_-]+/, {
        message: 'Only between 5 and 50 characters or numbers.'
        }),
    averagePrice: z.preprocess((x) => Number(x), z.number().gt(1, {
        message:'Place a number between 5-100'
        }).lt(100, {
            message: 'Number between 5-100'
        }).positive())
})

interface CreateRestaurantFormState {
    errors: {
        name?: string[],
        description?: string[],
        style?: string[],
        categories?: string[],
        city?: string[],
        address?: string[],
        zip?: string[],
        averagePrice?: string[],
        _form?: string[]
    };
}

export async function createRestaurant(
    formState: CreateRestaurantFormState,
    formData: FormData
): Promise<CreateRestaurantFormState> {
    const result = createRestaurantSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        style: formData.get('style'),
        categories: formData.get('categories'),
        city: formData.get('city'),
        address: formData.get('address'),
        zip: formData.get('zip'),
        averagePrice: formData.get('averagePrice')
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
        let restaurant: Restaurant;
        try {
            restaurant = await db.restaurant.create({
                data: {
                    slug: encodeURIComponent(result.data.name),
                    name: result.data.name,
                    description: result.data.description,
                    style: result.data.style,
                    categories: result.data.categories,
                    city: result.data.city,
                    address: result.data.address,
                    zip: result.data.zip,
                    averagePrice: result.data.averagePrice,
                    ownerId: session.user.id
                }
            })
            createSchedule(restaurant.id)

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
        revalidatePath('/')
        redirect(paths.brunchDetailEditMode(restaurant.slug))
    }
}
