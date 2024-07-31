'use client'

import { Image } from "@nextui-org/image";
import { alegreya_sans_bold } from "@/app/layout";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function NewIn() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <Image
                    height={200}
                    alt="Café da Manhã - Credits unsplash.com/pt-br/@brookelark"
                    src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <h1 className={alegreya_sans_bold.className}>Café da Manhã Telenovela</h1>
                - Find out our Top Brazilian Style Beakfast. <br />
                - Delight yourself with the best selection of fresh fruit, <br />
                and the most delicious coffee around here! <br />
                (OPENS SEARCH ON Top Brazilian)
            </div>
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
        </div>
    )
}