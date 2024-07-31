'use client'

import { useFormState } from 'react-dom';
import { Input, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import FormButtom from '../common/form-button';

export default function RestaurantCreateForm() {
    const [formState, action] = useFormState(actions.createRestaurant, {
        errors: {}
    });

    return (<form action={action}>
            <div className="flex flex-col gap-4">
                <h3 className="text-lg">New Brunch</h3>
                <Input
                    name="name"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Name"
                    isInvalid={!!formState.errors.name}
                    errorMessage={formState.errors.name?.join(', ')}
                />
                <Textarea
                    name="description"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="About this Brunch"
                    isInvalid={!!formState.errors.description}
                    errorMessage={formState.errors.description?.join(', ')}
                />
                <Input
                    name="style"
                    label="Style"
                    labelPlacement="outside"
                    placeholder="Style"
                    isInvalid={!!formState.errors.style}
                    errorMessage={formState.errors.style?.join(', ')}
                />
                <Input
                    name="categories"
                    label="Categories"
                    labelPlacement="outside"
                    placeholder="Categories"
                    isInvalid={!!formState.errors.categories}
                    errorMessage={formState.errors.categories?.join(', ')}
                />
                <Input
                    name="city"
                    label="City"
                    labelPlacement="outside"
                    placeholder="City"
                    isInvalid={!!formState.errors.city}
                    errorMessage={formState.errors.city?.join(', ')}
                />
                <Input
                    name="address"
                    label="Address"
                    labelPlacement="outside"
                    placeholder="Address"
                    isInvalid={!!formState.errors.address}
                    errorMessage={formState.errors.address?.join(', ')}
                />
                <Input
                    name="zip"
                    label="ZIP"
                    labelPlacement="outside"
                    placeholder="ZIP"
                    isInvalid={!!formState.errors.zip}
                    errorMessage={formState.errors.zip?.join(', ')}
                />
                {/* <Input
                    name="image"
                    label="Image"
                    labelPlacement="outside"
                    placeholder="Image"
                    isInvalid={!!formState.errors.image}
                    errorMessage={formState.errors.image?.join(', ')}
                /> */}
                <Input
                    type="number"
                    name="averagePrice"
                    label="AveragePrice"
                    labelPlacement="outside"
                    placeholder="Average Price"
                    isInvalid={!!formState.errors.averagePrice}
                    errorMessage={formState.errors.averagePrice?.join(', ')}
                />
                {
                    formState.errors._form ?
                    <div className="routed p-2 bg-red-200 border border-red-400">
                        {formState.errors._form?.join(', ')}
                    </div>
                    : null
                }
                <FormButtom>Save</FormButtom>
            </div>
        </form>
    )
}