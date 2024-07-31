import { fetchRestaurantById } from "@/db/queries/restaurants"
import RestaurantDetail from "../../../../components/restaurants/restaurant-detail"


interface BrunchShowPageProps {
  params: {
    slug: string
    restaurantId: string
  }
}

export default async function BrunchShowPage({ params }: BrunchShowPageProps) {
  const { slug, restaurantId } = params;
  const restaurant = await fetchRestaurantById(restaurantId); 

  return <div>
    Brunch Detail Page
    <h1 className="text-2xl font-bold mb-2">{String(slug)}</h1>
    <RestaurantDetail restaurant={restaurant}/>
  </div>
}