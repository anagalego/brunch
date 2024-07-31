'use server'

import { db } from "../db";

export async function createSchedule(restaurantId: string) {
    let weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "holidays"];
    const data = weekdays.map((weekday) => {
        return ({
            weekday: weekday,
            closed: true,
            restaurantId: restaurantId
        })        
    })

    try {
        await db.day.createMany({data})
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
}