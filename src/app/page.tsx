import { Divider } from "@nextui-org/react"

import AvailabilitySearch from "@/components/dashboard/search-availability"

import PromotionsOnFavourites from "@/components/dashboard/promotions"
import NextReservations from "@/components/dashboard/reservations";

import NewIn from "@/components/dashboard/new-in";

import RestaurantList from "@/components/restaurants/restaurant-list";
import { fetchTopRestaurant } from "@/db/queries/restaurants";

export default async function Home() {
  const restaurants = await fetchTopRestaurant();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-1">
        <AvailabilitySearch/>
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <NextReservations />
        </div>
        <div className="col-span-1">
          <PromotionsOnFavourites/>
        </div>
        <div className="col-span-2">
          <Divider className="my-2"/>
          <NewIn/>
        </div>
        <div className="col-span-2">
          <Divider className="my-2"/>
          <h3 className="text-lg">Top</h3>
          <RestaurantList restaurants={restaurants}/>
        </div>
      </div>
    </div>
  );
}