import RestaurantElement from '@/components/restaurants/restaurant-element';
import { fetchFavouritesByOwnerId } from '../../../db/queries/favourites'
import { auth } from '@/auth';
import { fetchRestaurantById, RestaurantWithData } from '@/db/queries/restaurants';

export default async function FavouritesPage() {
    const session = await auth();
    if(!session || !session.user) {
        return <div>
            <h1>No Favourites.</h1>
        </div>
    } else {
        const favourites = await fetchFavouritesByOwnerId(session.user.id)
        //Substituir por componente
        const renderedFavourites = favourites.map(async (favourite) => {
            var restaurant = await fetchRestaurantById(favourite.restaurantId)
            var favourites = restaurant._count?.favourites || 0;
            var promo = restaurant.promotion?.percentage || 0;
            return (
                <div key={favourite.id}>
                    <RestaurantElement
                        restaurant={restaurant}
                        favourites={favourites}
                        promotion={promo}
                    />
                </div>
            )
        });
        return <div>
            <h1>Your Favourites:</h1>
            {renderedFavourites}
        </div>
    }
}