import Link from 'next/link';
import { Suspense } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import HeaderAuth from './header-auth';
import SearchInput from './search-input';
import LogoImage from './logo';

export default function Header() {
    return (
        <Navbar className='border-b-[1px] mb-6 p-0' maxWidth={'full'} position='static'>
            <NavbarContent className='hidden sm:flex gap-4'>
                <NavbarItem>
                    <Suspense>
                        <SearchInput/>
                    </Suspense>
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
                <Link href='/' className='font-bold'>Client</Link>
                <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    )
}