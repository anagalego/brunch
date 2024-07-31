'use client' 

import ScheduleCreateForm from "../schedule/schedule-create-form";
import MealTableCreateForm from "../meal-tables/meal-table-create-form"
import ProductCreateForm from "../products/product-create-form";
import PromotionCreateForm from "../promotions/promotion-create-form";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Day } from "@prisma/client";

interface EnhanceRestaurantProps {
    restaurantId: string,
    days: Day[]
}

export default function RestaurantEditMode({ restaurantId, days }: EnhanceRestaurantProps) {
    return <div className="flex flex-row flex-wrap gap-2">
        <Accordion>
            <AccordionItem key="1" aria-label="Add Schedule" title="Add Schedule">
                <ScheduleCreateForm days={days}/>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Add Table" title="Add Table">
                <MealTableCreateForm restaurantId={restaurantId}/>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Add Menu" title="Add Menu">
                <ProductCreateForm restaurantId={restaurantId}/>
            </AccordionItem>
            <AccordionItem key="4" aria-label="Add Promotion" title="Add Promotion">
                <PromotionCreateForm restaurantId={restaurantId}/>
            </AccordionItem>
        </Accordion>
    </div>
}
        
        