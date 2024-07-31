import Link from "next/link";
import { db } from "@/db";
import paths from "@/paths"
import { auth } from "@/auth";
import { fetchRestaurantById }  from "../../db/queries/restaurants"
import { Restaurant } from "@prisma/client";

interface RestaurantElementProps {
    restaurant: Restaurant;
    favourites: number;
    promotion: number
}

export default async function RestaurantElement({ restaurant, favourites, promotion }: RestaurantElementProps) {
    return <div className="font-bold col-span-1">
        <br/>
        {restaurant.name} Average Price: {restaurant.averagePrice}€ - Acrescentar outros pormenores
        <br/> {favourites} Favourites :: PROMO: {promotion}
    </div>
}