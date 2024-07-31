'use client'

import { useFormState } from "react-dom";
import {
    Input,
    Textarea
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButtom from "../common/form-button";

interface ProductCreateFormProps {
    restaurantId: string;
}

export default function ProductCreateForm({ restaurantId }: ProductCreateFormProps) {
    const [formState, action] = useFormState(
        actions.createProduct.bind(null, restaurantId), {
            errors: {} 
        }
    )

    return (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg">New Product</h3>
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
                    placeholder="Ingredients and preparation."
                    isInvalid={!!formState?.errors?.description}
                    errorMessage={formState?.errors?.description?.join(', ')}
                />
                <Input
                    name="allergens"
                    label="Allergens"
                    labelPlacement="outside"
                    placeholder="Allergens"
                    isInvalid={!!formState?.errors?.allergens}
                    errorMessage={formState?.errors?.allergens?.join(', ')}
                />
                <Input
                    name="price"
                    label="Price"
                    labelPlacement="outside"
                    placeholder="Price"
                    isInvalid={!!formState?.errors?.price}
                    errorMessage={formState?.errors?.price?.join(', ')}
                />
                {
                    formState?.errors?._form ?
                    <div className="routed p-2 bg-red-200 border border-red-400">
                        {formState?.errors?._form?.join(', ')}
                    </div>
                    : null
                }
                <FormButtom>Add Product</FormButtom>
            </div>
        </form>
    )
}