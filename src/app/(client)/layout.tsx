import AvailabilitySearch from "@/components/common/search-availability";
import SearchInput from '@/components/common/search-input';
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-1">
          <Suspense>
              <SearchInput/>
              <AvailabilitySearch/>
          </Suspense>
      </div>
      <div className="col-span-2">
          {children}
      </div>
    </div>
  );
}
