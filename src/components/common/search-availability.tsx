'use client';

import { Button, Input, Select, Selection, SelectItem } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { times } from "@/times";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { DateValue } from "@internationalized/date";
import { useState } from "react";
import FiltersForm from "../common/filters-dialog";

export default function AvailabilitySearch() {
    const searchParams = useSearchParams();
    const [searchData, setSearchData] = useState({...searchParams})

    const { push } = useRouter();

    const handleChange = (name: string) => {
        const handledData = (data: DateValue | Selection | React.ChangeEvent<HTMLInputElement>) => {
            setSearchData({...searchData,
                [name]: "hello"//data
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
                <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
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
            
            <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                <div className="col-span-1">   
                    <Button
                        fullWidth
                        onClick={handleClear}
                        type="button"
                    >
                        Clear All
                    </Button> 
                </div> 
                <div className="col-span-1">
                    <FiltersForm/>
                </div> 
            </div>    
        </>
    );
}