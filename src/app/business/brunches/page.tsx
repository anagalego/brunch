import React from "react";
import { redirect } from "next/navigation";
import RestaurantList from "@/components/restaurants/restaurant-list";
import { auth } from "@/auth"
import { fetchRestaurantByOwner } from "../../../db/queries/restaurants"

export default async function BusinessBrunchesPage() {
    const session = await auth()
    if(!session || !session.user){
        redirect('/');
    }
    const ownerId = session.user.id;

    const restaurants = await fetchRestaurantByOwner(ownerId);

    return <div className="flex flex-row flex-wrap gap-2">
        Business Brunches Page
        <RestaurantList restaurants={restaurants}/>
    </div>
}   