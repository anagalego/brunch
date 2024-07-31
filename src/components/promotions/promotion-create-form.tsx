'use client'

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/react";
import * as actions from "@/actions";
import FormButtom from "@/components/common/form-button";

interface PromotionCreateFormProps {
    restaurantId: string;
}

export default function PromotionCreateForm({ restaurantId }: PromotionCreateFormProps) {
    const [formState, action] = useFormState(
        actions.createPromotion.bind(null, restaurantId),
        { errors: {} 
    })

    return (
        <form action={action}>
            <div className="flex flex-col gap-4">
                <h3 className="text-lg">New Pormotion</h3>
                <Input
                    name="code"
                    label="Code"
                    labelPlacement="outside"
                    placeholder="Code"
                    isInvalid={!!formState?.errors?.code}
                    errorMessage={formState?.errors?.code?.join(', ')}
                />
                <Input
                    name="start"
                    label="Start"
                    labelPlacement="outside"
                    placeholder="aaaa-MM-dd hh:mm"
                    isInvalid={!!formState?.errors?.start}
                    errorMessage={formState?.errors?.start?.join(', ')}
                />
                <Input
                    name="end"
                    label="End"
                    labelPlacement="outside"
                    placeholder="aaaa-MM-dd hh:mm"
                    isInvalid={!!formState?.errors?.end}
                    errorMessage={formState?.errors?.end?.join(', ')}
                />
                <Input
                    name="percentage"
                    label="Percentage"
                    labelPlacement="outside"
                    placeholder="Percentage"
                    isInvalid={!!formState?.errors?.percentage}
                    errorMessage={formState?.errors?.percentage?.join(', ')}
                />
                {
                    formState?.errors?._form ?
                    <div className="routed p-2 bg-red-200 border border-red-400">
                        {formState?.errors?._form?.join(', ')}
                    </div>
                    : null
                }
                <FormButtom>Add Promotion</FormButtom>
            </div>
        </form>
    )
}