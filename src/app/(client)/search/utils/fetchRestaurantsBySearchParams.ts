import { fetchOpenByWeekday } from "@/db/queries/days";
import { fetchMealTablesBySeats } from "@/db/queries/meal-tables";
import { fetchRestaurantById, RestaurantWithData } from "@/db/queries/restaurants";
import { fetchOpenByHour } from "@/db/queries/time-slots";
import { notFound } from "next/navigation";

export default async function fetchRestaurantsBySearchParams({ date, time, seats }: any) {
    let restaurantResult: RestaurantWithData[];
    
    try {
        const restaurantIds: string[] = [];
        if (date) {
            const weekdays: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            let weekday: string = weekdays[new Date(date).getDay()];
            console.log(weekday);
            const openRestaurants = await fetchOpenByWeekday(weekday);
            openRestaurants.forEach((mealTable) => {
                restaurantIds.push(mealTable.restaurantId);
            });
        }
        if (time) {
            let hour: string = decodeURIComponent(time);
            const openTimes = await fetchOpenByHour(hour);
            openTimes.forEach((time) => {
                if (time.day?.restaurantId) {
                    restaurantIds.push(time.day.restaurantId);
                }
            });
        }
        if (seats) {
            const availableSeats = await fetchMealTablesBySeats(Number.parseInt(seats));
            availableSeats.forEach((mealTable) => {
                restaurantIds.push(mealTable.restaurantId);
            });
        }

        if (restaurantIds.length > 0) {
            restaurantResult = await Promise.all(
                restaurantIds.map((restaurantId) => fetchRestaurantById(restaurantId))
            );
        } else {  
            restaurantResult =  [];
        }
    } catch (e: any) {
        notFound();
    }

    return restaurantResult;
}