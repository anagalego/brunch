import RestaurantDetail from "@/components/restaurants/restaurant-detail"
import RestaurantEditMode from "@/components/restaurants/restaurant-edit-mode"
import { fetchRestaurantBySlug } from "@/db/queries/restaurants"
import { fetchDayByRestaurantId } from "@/db/queries/days"
import { notFound } from 'next/navigation'

interface BusinessBrunchEdiPageProps {
    params: {
      slug: string
    }
  }
  
export default async function BusinessEditBrunchPage({ params }: BusinessBrunchEdiPageProps) {
  const { slug } = params;
  const restaurant = await fetchRestaurantBySlug(slug);
  if(!restaurant) {
    notFound()
  } 

  const weekdays = await fetchDayByRestaurantId(restaurant.id)

  return (
    <div className="m-4">
        Business Edit Mode Brunch Page
        <RestaurantDetail restaurant={restaurant}/>
        <br />
        :: ACRESCENTAR CONDIÇÃO SE FOR ADMIN ::
        Acrescentar Modo de férias :: toggle
        <RestaurantEditMode restaurantId={restaurant.id} days={weekdays}/>
    </div>
  );
}