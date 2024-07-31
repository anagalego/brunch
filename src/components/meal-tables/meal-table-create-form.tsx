'use client'

import { useFormState } from 'react-dom';
import { Input } from "@nextui-org/react";
import * as actions from "@/actions";
import FormButtom from '../common/form-button';

interface MealTableFormProps {
    restaurantId: string;
}

export default function MealTableCreateForm({ restaurantId }: MealTableFormProps) {
    const [formState, action] = useFormState(
        actions.createMealTable.bind(null, restaurantId), {
            errors: {}
        }
    )

    return (          
        <form action={action}>
            <div className="flex flex-col gap-4">
                <h3 className="text-lg">New Meal table</h3>
                <Input
                    type="number"
                    name="seats"
                    label="Seats"
                    labelPlacement="outside"
                    placeholder="Seats"
                    isInvalid={!!formState?.errors?.seats}
                    errorMessage={formState?.errors?.seats?.join(', ')}
                />
                {
                    formState?.errors?._form ?
                    <div className="routed p-2 bg-red-200 border border-red-400">
                        {formState?.errors?._form?.join(', ')}
                    </div>
                    : null
                }
                <FormButtom>Add Table</FormButtom>
            </div>
        </form>
    )
}