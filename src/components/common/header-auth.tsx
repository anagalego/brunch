'use client';

import {
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Listbox,
    ListboxItem,
    Link
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useMode } from "@/providers/mode-provider";
import { useRouter } from "next/navigation";


export default function HeaderAuth() {
    const { push } = useRouter();
    const { mode, toggleMode } = useMode();
    const modeButton = mode.business
        ? { name: "Particular", buttonLink: "/" }
        : { name: "Business", buttonLink: "/business" }

    const handleToggleMode = () => {
        toggleMode()
        push(modeButton.buttonLink)
    }


    const session = useSession();


    let authContent: React.ReactNode;
    if(session.status === "loading") {
        authContent = null;
    } else if(session.data?.user) {
        authContent = <Popover placement='left'>
            <PopoverTrigger>
                <Avatar src={session.data?.user.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <Listbox variant="flat" aria-label="Listbox menu with descriptions">
                    <ListboxItem
                    key="new"
                    >
                        <Button
                            onClick={handleToggleMode}
                            type='submit'
                            color='secondary'
                            variant='flat'
                        >
                            {modeButton.name}
                        </Button>
                    </ListboxItem>
                    <ListboxItem
                    key="new"
                    description="Account Settings"
                    >
                        <Link href='/profile' className='font-bold'>
                            Profile
                        </Link>
                    </ListboxItem>
                    <ListboxItem
                    key="copy"
                    description="Reservations and Rates"
                    >
                        <Link href='/reservations' className='font-bold'>
                            Reservations
                        </Link>
                    </ListboxItem>
                    <ListboxItem
                    key="edit"
                    showDivider
                    >
                        <Link href='/favourites' className='font-bold'>
                            Favourites
                        </Link>
                    </ListboxItem>
                    <ListboxItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    >
                        <form action={actions.signOut}>
                            <Button type='submit'>Sign Out</Button>
                        </form>
                    </ListboxItem>
                </Listbox>
            </PopoverContent>
        </Popover>
    } else {
        authContent = <>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type='submit' color='secondary' variant='bordered'>
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signOut}>
                    <Button type='submit' color='secondary' variant='flat'>
                        Sign Out
                    </Button>
                </form>
            </NavbarItem>
        </>
    }

    return authContent;
}