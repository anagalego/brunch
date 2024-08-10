import { Image } from "@nextui-org/image";
import { karla_bold } from "@/app/layout";
import Link from "next/link";
import { Button, Divider } from "@nextui-org/react";
import RestaurantList from "@/components/restaurants/restaurant-list";
import { fetchTopRestaurant } from "@/db/queries/restaurants";


export default async function NewIn() {
    const restaurants = await fetchTopRestaurant();
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2" style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}>
                <Image
                    style={{ width: '100%', height: '200px' }}
                    alt="Eggs Benedict 2024 - Credits unsplash.com/pt-br/@colincyruz"
                    src="https://images.unsplash.com/photo-1621523130535-d9f3e46124b0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <h1 className={karla_bold.className}>Eggs Benedict 2024</h1>
                - We Have the Top Favourites. <br />
                - Vote and win exclusive offers! <br />
                <Button
                    href="https://github.com/nextui-org/nextui"
                    as={Link}
                    color="primary"
                    variant="faded"
                >
                    Button Link
                </Button>
            </div>
            <div className="col-span-2">
                <Divider className="my-2"/>
                <h3 className="text-lg">Top</h3>
                <RestaurantList restaurants={restaurants}/>
            </div>
        </div>
    )
}

{/* <div className="grid grid-cols-2 gap-4">
    <div className="col-span-1">
        <Image
            height={200}
            alt="Eggs Benedict 2024 - Credits unsplash.com/pt-br/@colincyruz"
            src="https://images.unsplash.com/photo-1621523130535-d9f3e46124b0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <h1 className={alegreya_sans_bold.className}>Eggs Benedict 2024</h1>
        - We Have the Top Favourites. <br />
        - Vote and win exclusive offers! <br />
        <Button
            href="https://github.com/nextui-org/nextui"
            as={Link}
            color="primary"
            variant="faded"
        >
            Button Link
        </Button> 
        (OPENS SEARCH ON Top Eggs Benedict)
    </div>
    <div className="col-span-2">
        <Divider className="my-2"/>
        <h3 className="text-lg">Top</h3>
        <RestaurantList restaurants={restaurants}/>
    </div>
</div> */}