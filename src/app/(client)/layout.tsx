import Providers from "@/app/providers";
import AvailabilitySearch from "@/components/dashboard/search-availability";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container max-w-screen-lg mx-auto grid grid-cols-3 gap-4 p-4">
        <Providers>
            <div className="col-span-1">
                <Suspense>
                    <AvailabilitySearch/>
                </Suspense>
            </div>
            <div className="col-span-2 bg-green-950">
                {children}
            </div>
        </Providers>
    </div>
  );
}
