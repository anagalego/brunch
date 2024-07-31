import type { Restaurant } from '@prisma/client' 
import { db } from "../../db"
import { cache } from'react'

export type RestaurantWithData = Restaurant & {
    promotion?: { percentage: number } | null;
    _count?: { favourites: number }
}

//
export function fetchTopRestaurant(): Promise<RestaurantWithData[]> {
    return db.restaurant.findMany({
        orderBy: {
            favourites: {
              _count: 'desc'
            },
        },
        include: {
            promotion: { select: { percentage: true }},
            _count: { select: { favourites: true }},
            tables: true
        },
        take: 10,
    })
}

//
export function fetchRestaurantById(id: string): Promise<RestaurantWithData> {
    return db.restaurant.findFirstOrThrow({
        where: {
            id: id
        },
        include: {
            tables: true
        }
    })
}

//
export function fetchRestaurantBySlug(slug: string): Promise<RestaurantWithData> {
    return db.restaurant.findFirstOrThrow({
        where: {
            slug: String(slug)
        },
        include: {
            tables: true
        }
    })
}
//
export function fetchRestaurantByOwner(ownerId: string): Promise<RestaurantWithData[]> {
    return db.restaurant.findMany({
        where: {
            ownerId: ownerId
        },
        include: {
            tables: true,
        },
        take: 10,
    })
}

//
export function fetchRestaurantsBySearchTerm(term: string): Promise<RestaurantWithData[]> {
    return db.restaurant.findMany({
        orderBy: {
            favourites: {
              _count: 'desc'
            },
        },
        include: {
            promotion: { select: { percentage: true }},
            _count: { select: { favourites: true }},
            tables: true
        },
        where: {
            slug: { contains: term }
        },
        take: 10,
    })
}