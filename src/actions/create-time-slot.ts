'use server'

import { db } from "../db";

interface CreateTimeSlotsProps {
    data: {
        time: string;
        dayId: number;
    }[]
}

export async function createTimeSlot(data: CreateTimeSlotsProps) {
    try {
        await db.timeSlot.createMany(data)
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