import Link from "next/link";
import paths from "@/paths";
import RestaurantElement from "../restaurants/restaurant-element"
import type { RestaurantWithData } from "../../db/queries/restaurants"


interface RestaurantListProps {
    restaurants: RestaurantWithData[]
}
    
export default async function RestaurantList({ restaurants }: RestaurantListProps) {

    const renderedRestaurants = restaurants.map((restaurant) => {
        var favourites = restaurant._count?.favourites || 0;
        var promo = restaurant.promotion?.percentage || 0;
        return (
            <div key={restaurant.id}>
                <Link href={paths.businessBrunchDetail(restaurant.slug)}>
                    <RestaurantElement
                        restaurant={restaurant}
                        favourites={favourites}
                        promotion={promo}
                    />
                </Link>
            </div>
        )
    });
    return <div className="flex flex-row flex-wrap gap-2">
        {renderedRestaurants}
    </div>
}