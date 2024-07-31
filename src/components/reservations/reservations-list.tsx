import { Chip } from "@nextui-org/react";
import { auth } from "@/auth";
import ReservationElement from "./reservation-element";
import { ReservationWithData } from "@/db/queries/reservations";

interface ReservationListProps {
    fetchData: () => Promise<ReservationWithData[]>
}

export default async function ReservationList({ fetchData }: ReservationListProps) {
    const session = await auth();
    if(!session || !session.user) {
        return <div className="flex flex-row flex-wrap gap-2">
            <h1>No reservations.</h1>
        </div>
    } else {
        const reservations = await fetchData()
        //Substituir por componente
        const renderedReservations = reservations.map((reservation) => {
            return (
                <div key={reservation.id}>
                    <ReservationElement
                        reservation={reservation}
                    />
                </div>
            )
        });
        return <div className="flex flex-row flex-wrap gap-2">
            <h1>Your reservations:</h1>
            {renderedReservations}
        </div>
    }
}