'use client'

import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import HeaderAuth from './header-auth';
import LogoImage from './logo';
import { useSession } from "next-auth/react";

export default function Header() {
    const session = useSession();
    return (
        <Navbar className='border-b-[1px] mb-6 p-0' maxWidth={'full'} position='static'>
            <NavbarContent className='hidden sm:flex gap-4'>
                <NavbarItem>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='center'>
                <NavbarBrand>
                    <Link href='/'>
                        <LogoImage/>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent  justify='end'>
                <Link href='/' className='font-bold'>{session?.data?.user?.name || ''}</Link>
                <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    )
}