import Link from "next/link";
import { Chip } from '@nextui-org/react'
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth"
import RestaurantList from "@/components/restaurants/restaurant-list";
import { fetchRestaurantByOwner } from "../../db/queries/restaurants"
import ReservationList from "@/components/reservations/reservations-list";
import { fetchReservationsByUserId } from "@/db/queries/reservations"; 

export default async function BusinessDashBoardPage() {
    const session = await auth()
    if(!session || !session.user){
        redirect('/');
    }
    const ownerId = session.user.id

    return <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-2 shadow">
            Business Dashboard Page
        </div>
        <div className="col-span-1">
            My Brunches
            --- CORRIGIR PARA BRUNCHES COM UPDATES / ordenar por favoritos
            <RestaurantList fetchData={() => fetchRestaurantByOwner(ownerId)}/>
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
            --- CORRIGIR PARA OWNER DO RESTAURANTE
            --- RESERVAS COLOCAR POR ORDEM
            {/* <ReservationList fetchData={() => fetchReservationsByUserId(ownerId)}/> */}
            --- Página reservas está dividida por reservas novas agrupadas por restaurante;
            --- Reservas perto da data
            <br/>
            <Link href='/business/reservations' className='font-bold'>
                <Chip color="success" variant="shadow">My Reservations Page</Chip>
            </Link>
        </div>
    </div>
}
