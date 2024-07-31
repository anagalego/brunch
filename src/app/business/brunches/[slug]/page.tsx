import RestaurantDetail from "../../../../components/restaurants/restaurant-detail"
import Link from "next/link";
import { Chip } from '@nextui-org/react'
import { fetchRestaurantBySlug } from "@/db/queries/restaurants"
import paths from "@/paths";
import { notFound } from 'next/navigation'
import ReservationCreateForm from "@/components/reservations/reservation-create-form";

interface BusinessBrunchShowPageProps {
  params: {
    slug: string
  }
}
export default async function BusinessBrunchDetailsPage({ params }: BusinessBrunchShowPageProps) {
  const { slug } = params;
  const restaurant = await fetchRestaurantBySlug(slug);

  if(!restaurant) {
    notFound()
  }
  
  return (
    <div className="m-4">
      <RestaurantDetail restaurant={restaurant}/>
      <ReservationCreateForm restaurantId={restaurant.id}/>
      <Link href={paths.brunchDetailEditMode(slug)} className='font-bold'>
        <Chip color="success" variant="shadow">Edit Brunch</Chip>
      </Link>
      <br/>
      <h1>LISTAR</h1>
      <p>Reservas</p>
      <p>Mesas</p>
      <p>Calendário</p>
      <p>Produtos</p>
      <p>Promoções</p>
    </div>
  );
}