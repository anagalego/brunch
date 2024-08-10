'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { Restaurant } from '@prisma/client';
import { addFavourite } from '@/actions';

interface RestaurantDetailProps {
    restaurant: Restaurant
}

export default function Favorite({ restaurant }: RestaurantDetailProps) {
    const [favorite, setFavorite] = useState(false)

    const toggleFavorite = () => {
        try {
            console.log(restaurant.id)
            addFavourite(restaurant.id)
            setFavorite(!favorite)
        } catch(e) {
            console.log(e)
        }
    }

    const renderedFavorite = favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>

    return (
        <Button
            onClick={toggleFavorite}
            type='submit'
        >
            {renderedFavorite}
        </Button>
    )
}