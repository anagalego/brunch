'use client'

import { Checkbox } from '@nextui-org/react';
import { Day } from '@prisma/client';
import { useState } from 'react';
import * as actions from "@/actions";
import FormButton from '../common/form-button';
import { times } from '@/times';

interface ScheduleFormProps {
    days: Day[];
}

export default function ScheduleCreateForm({ days }: ScheduleFormProps) {
    const [data, setData] = useState<{ time: string, dayId: number }[]>([]);
    
    const handleData = (time: string, dayId: number, checked: boolean) => {
        setData(prevData => {
            if (checked) {
                return [...prevData, { time, dayId }];
            } else {
                return prevData.filter(item => item.time !== time || item.dayId !== dayId);
            }
        });
    };

    const renderedDays = days.map((day) => (
        <div key={day.id} className="col-span-1 font-bold">
            {day.weekday}
            <br />
            {times.map((time) => (
                <Checkbox
                    key={`${times.indexOf(time)}-${day.id}`}
                    onChange={(e) => handleData(time, day.id, e.target.checked)}
                >
                    {time}-{day.id}
                </Checkbox>
            ))}
        </div>
    ));

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await actions.createTimeSlot({ data });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-8 gap-4">
                {renderedDays}
                <FormButton>Save</FormButton>
            </div>
        </form>
    );
}