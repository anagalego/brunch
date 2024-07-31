import { redirect, useRouter } from "next/navigation";
import AvailabilitySearch from "@/components/dashboard/search-availability"
import RestaurantList from "@/components/restaurants/restaurant-list";
import { fetchRestaurantsBySearchTerm } from '@/db/queries/restaurants'
import fetchRestaurantsBySearchParams from './utils/fetchRestaurantsBySearchParams'

interface SearchPageProps {
    searchParams: {
        term?: string;
        date?: string;
        time?: string;
        seats?: number;
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { term, date, time, seats } = searchParams;
         
    if (!term && !date && !time && !seats) {
        redirect('/');
    }

    const restaurants = term
        ? await fetchRestaurantsBySearchTerm(term) 
        : await fetchRestaurantsBySearchParams({date, time, seats})     

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <div className="col-span-1">
                <AvailabilitySearch />
            </div>
            <div className="col-span-2">
                <RestaurantList restaurants={restaurants} />
            </div>
        </div>
    );
}