'use client'

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ModeProvider } from "@/providers/mode-provider";

interface ProvidersProps {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <ModeProvider>
                    {children}
                </ModeProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}