import Link from "next/link";
import { Chip } from '@nextui-org/react'
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth"
import RestaurantList from "@/components/restaurants/restaurant-list";
import { fetchRestaurantByOwner } from "../../db/queries/restaurants"

export default async function BusinessDashBoardPage() {
    const session = await auth()
    if(!session || !session.user){
        redirect('/');
    }
    const ownerId = session.user.id;
    const restaurants = await fetchRestaurantByOwner(ownerId);

    return <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-2 shadow">
            Business Dashboard Page
        </div>
        <div className="col-span-1">
            My Brunches
            CHANGE TO BRUNCHES WITH UPDATES <br />
            SORT BY FAVOURITE
            <RestaurantList restaurants={restaurants} />
            <br/>
            <Link href='/business/brunches' className='font-bold'>
                <Chip color="success" variant="shadow">My Brunches Page</Chip>
            </Link>
            <br/>
            <br/>
            <Link href='/business/brunches/new' className='font-bold'>
                <Chip color="success" variant="shadow">Create Brunch</Chip>
            </Link>
        </div>
        <div className="col-span-1">
            My Reservations
            --- RESTAURANT RESERVATIONS FROM OWNER
            --- RESERVAS COLOCAR POR ORDEM
            {/* <ReservationList fetchData={() => fetchReservationsByUserId(ownerId)}/> */}
            --- Reservation page is split by restaurant and sorted by new reservations;
            --- Also priotizes reservations close to date
            <br/>
            <Link href='/business/reservations' className='font-bold'>
                <Chip color="success" variant="shadow">My Reservations Page</Chip>
            </Link>
        </div>
    </div>
}
