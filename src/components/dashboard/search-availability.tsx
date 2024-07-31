'use client';

import { Button, Input, Select, Selection, SelectItem } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { times } from "../schedule/schedule-create-form";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { DateValue } from "@internationalized/date";
import { useState } from "react";

export default function AvailabilitySearch() {
    const searchParams = useSearchParams();
    const [searchData, setSearchData] = useState({...searchParams})

    const { push } = useRouter();

    const handleChange = (name: string) => {
        const handledData = (data: DateValue | Selection | React.ChangeEvent<HTMLInputElement>) => {
            setSearchData({...searchData,
                [name]: data
            })
        }
        return handledData;
        //TIME - size: 1

        //push(`/search?date=${date.toString()}`);
    }
    console.log(searchData)

    const handleClear = () => {
        redirect("/")
    };

    return (
        <>
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <h3 className="text-lg">Your next reservation</h3>
                    <div className="col-span-2">
                        <DatePicker
                            name="date"
                            label="Date"
                            onChange={handleChange("date")}
                        />
                    </div>
                    <div className="col-span-1">
                        <Select
                            name="time"
                            label="Time"
                            selectionMode="single"
                            className="max-w-xs col-span-1"
                            onSelectionChange={handleChange("time")}
                        >
                            {times.map((time) => (
                                <SelectItem
                                    key={time}
                                    value={time}
                                >
                                    {time}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="col-span-1">
                        <Input
                            name="seats"
                            label="Seats"
                            type="number"
                            className="max-w-xs col-span-1"    
                            onChange={handleChange("seats")}
                        />
                    </div>
                </div>
            </form>  
            
            <Button onClick={handleClear} type="button">Clear</Button>  
        </>
    );
}




// 'use client';

// import { Button, Input, Select, SelectItem } from "@nextui-org/react";
// import { DatePicker } from "@nextui-org/date-picker";
// import * as actions from "@/actions";
// import { useState, useEffect, useMemo } from 'react';
// import { times } from "../schedule/schedule-create-form";
// import { redirect } from "next/navigation";

// export default function AvailabilitySearch() {
//     const [data, setData] = useState<{ date?: string, time?: string, seats?: number }>({});

//     const handleChange = (name: string, value: any) => {
//         setData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleClear = () => {
//         setData({});
//         redirect('/');
//     };

//     useEffect(() => {
//         if (data.date || data.time || (data.seats !== undefined && data.seats > 0)) {
//             const fetchData = async () => {
//                 await actions.searchAvailableRestaurants({ data });
//             };
//             fetchData();
//         }
//     }, [data]);

//     return (
//         <form>
//             <div className="grid grid-cols-2 gap-4">
//                 <h3 className="text-lg">Your next reservation</h3>
//                 <div className="col-span-2">
//                     <DatePicker
//                         name="date"
//                         label="Date"
//                         aria-placeholder={data.date ? data.date.toString() : "dd/mm/aaaa"}
//                         onChange={(date) => handleChange('date', date?.toString())}
//                     />
//                 </div>
//                 <div className="col-span-1">
//                     <Select
//                         name="time"
//                         label="Time"
//                         placeholder={data.time ? data.time : "12:00"}
//                         selectionMode="single"
//                         className="max-w-xs col-span-1"
//                         onChange={(time) => handleChange('time', time.target.value)}
//                     >
//                         {times.map((time) => (
//                             <SelectItem
//                                 key={time}
//                                 value={time}
//                             >
//                                 {time}
//                             </SelectItem>
//                         ))}
//                     </Select>
//                 </div>
//                 <div className="col-span-1">
//                     <Input
//                         name="seats"
//                         label="Seats"
//                         placeholder={data.seats ? data.seats.toString() : "How many are you?"}
//                         type="number"
//                         className="max-w-xs col-span-1"
//                         onChange={(e) => handleChange('seats', e.target.value)}
//                     />
//                 </div>
//                 <Button onClick={handleClear} type="button">Clear</Button>
//             </div>
//         </form>    
//     );
// }