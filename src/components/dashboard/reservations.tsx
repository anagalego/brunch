import { auth } from "@/auth";
import { fetchReservations } from "@/db/queries/reservations";

export default async function NextReservations() {
    const session = await auth();
    if(!session || !session.user) {
        return <div className="flex flex-row flex-wrap gap-2">
            <h1>No reservations.</h1>
        </div>
    } else {
        const reservations = await fetchReservations()
        //Substituir por componente
        const renderedReservations = reservations.map((reservation) => {
            return (
                <div key={reservation.id}>
                    {reservation.name}
                    <br/>
                    {reservation.time.toString()}
                    <br/>
                    {reservation.seats}
                    <br/>
                </div>
            )
        });
        return <div className="flex flex-row flex-wrap gap-2">
            <h1>Your reservations:</h1>
            {renderedReservations}
        </div>
    }
}