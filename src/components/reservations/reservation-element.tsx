import Link from "next/link";
import { db } from "@/db";
import paths from "@/paths"
import { auth } from "@/auth";
import { fetchReservationsById }  from "../../db/queries/reservations"
import { Reservation } from "@prisma/client";

interface ReservationElementProps {
    reservation: Reservation
}

export default async function ReservationElement({ reservation }: ReservationElementProps) {
    return <div className="font-bold">
        {reservation.name} seats: {reservation.seats} persons
    </div>
}