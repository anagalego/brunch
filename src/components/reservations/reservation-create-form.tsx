'use client';

import { useFormState } from "react-dom";
import { Input, Textarea } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import {now, getLocalTimeZone} from "@internationalized/date";
import * as actions from "@/actions";
import FormButtom from "@/components/common/form-button";

interface RestaurantFormProps {
    restaurantId: string;
}

export default function ReservationCreateForm({ restaurantId }: RestaurantFormProps) {
    const [formState, action] = useFormState(
        actions.createReservation.bind(null, restaurantId), {
            errors: {}
        }
    );
    return (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg">New Reservation</h3>
                <Input
                    name="seats"
                    label="Seats"
                    labelPlacement="outside"
                    placeholder="How many are you?"
                    isInvalid={!!formState?.errors?.seats}
                    errorMessage={formState?.errors?.seats?.join(', ')}
                />
                <DatePicker
                    name="time"
                    label="Time"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    defaultValue={now(getLocalTimeZone())}
                    isInvalid={!!formState?.errors?.time}
                    errorMessage={formState?.errors?.time?.join(', ')}
                />
                <Input
                    name="name"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Name"
                    isInvalid={!!formState?.errors?.name}
                    errorMessage={formState?.errors?.name?.join(', ')}
                />
                <Textarea
                    name="description"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Do you have any special request?"
                    isInvalid={!!formState?.errors?.description}
                    errorMessage={formState?.errors?.description?.join(', ')}
                />
                {
                    formState?.errors?._form ?
                    <div className="routed p-2 bg-red-200 border border-red-400">
                        {formState?.errors?._form?.join(', ')}
                    </div>
                    : null
                }
                <FormButtom>Book Table</FormButtom>
            </div>
        </form>
    )
}