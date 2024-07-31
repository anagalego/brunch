'use server'

import type { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { db } from "../db";
import paths from "../paths";
import { fetchRestaurantById } from "@/db/queries/restaurants";

const createProductSchema = z.object({
    name: z.string().min(5).max(50).regex(/[\w-]+/, {
        message: 'Only between 5 and 50 characters.'
        }),
    description: z.string().min(25, {
            message: 'Please, elaborate more...'
        }).max(250, {
            message: 'Are you writing a novel?'
        }).regex(/[\w-]+/, {
            message: 'Only characters or numbers.'
        }),
    allergens: z.string().min(25, {
            message: 'Please, elaborate more...'
        }).max(250, {
            message: 'Are you writing a novel?'
        }).regex(/[\w-]+/, {
            message: 'Only characters or numbers.'
        }),
    price: z.preprocess((x) => Number(x), z.number().gt(5, {
        message:'Too cheap to be true...'
        }).lt(80, {
            message: 'This platform is not for you... Btw do you need a chef!?'
        }).positive())
})

interface CreateProductFormState {
    errors: {
        name?: string[],
        description?: string[], 
        allergens?: string[],
        price?: string[],
        _form?: string[]
    };
}

export async function createProduct(
    restaurantId: string,
    formState: CreateProductFormState,
    formData: FormData
): Promise<CreateProductFormState> {
    const result = createProductSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'), 
        allergens: formData.get('allergens'),
        price: formData.get('price'),        
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

        let product: Product;

        try {
            product = await db.product.create({
                data: {
                    name: result.data.name,
                    description: result.data.description,
                    allergens: result.data.allergens,
                    price: result.data.price,
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
