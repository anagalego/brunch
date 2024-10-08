import AvailabilitySearch from "@/components/common/search-availability";
import { Suspense } from "react";

import { Divider } from "@nextui-org/react"

import PromotionsOnFavourites from "@/components/dashboard/promotions"
import NextReservations from "@/components/dashboard/reservations";

import NewIn from "@/components/dashboard/new-in";
import SearchInput from "@/components/common/search-input";

export default async function Home() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-1">
        <Suspense>
            <SearchInput/>
            <AvailabilitySearch/>
        </Suspense>
        <Divider />
        <NextReservations />
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <PromotionsOnFavourites />
        </div>
        <div className="col-span-2">
          <NewIn/>
        </div>
      </div>
    </div>
  );
}