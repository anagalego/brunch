'use server'

import type { Favourite } from "@prisma/client";
import { fetchRestaurantById } from "@/db/queries/restaurants";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { db } from "../db";
import paths from "../paths";

export async function addFavourite(restaurantId: string) {
    console.log('adding...')
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

        let favourite: Favourite;

        try {
            favourite = await db.favourite.create({
                data: {
                    restaurantId: restaurant.id,
                    ownerId: session.user.id
                }
            })
            console.log('Favourite created')
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Error 1')
                return {
                    errors: {
                        _form: [err.message]
                    }
                }
            } else {
                console.log('Error 2')
                return {
                    errors: {
                        _form: ['Something went wrong.']
                    }
                }
            }
        }
        revalidatePath(paths.favourites())
        redirect(paths.favourites())
    }
}
