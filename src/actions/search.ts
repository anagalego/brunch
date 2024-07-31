'use server';

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
    const term = formData.get('term');

    if(typeof term !== 'string' || !term) {
        redirect('/');
    }

    const decoded = decodeURIComponent(term)
    redirect(`search?term=${decoded}`)
}

interface SearchByAvailabilityFormState {
    errors: {
        date?: string[],
        time?: string[],
        seats?: string[]
        _form?: string[]
    };
}

export async function searchAvailableRestaurants(
    formState: SearchByAvailabilityFormState,
    formData: FormData
): Promise<SearchByAvailabilityFormState> {
    const date = formData.get('date');
    const time = formData.get('time');
    const seats = formData.get('seats');

    const params = new URLSearchParams();

    if (typeof date === 'string') {
        params.append("date", date);
    }
    if (typeof time === 'string') {
        params.append("time", time);
    }
    if (typeof seats === 'string') {
        params.append("seats", seats);
    }

    if (params.toString()) {
        redirect(`search?${params.toString()}`);
    } else {
        redirect('/');
    }
}

//fetchOpenByWeekday(date -> verificar dia da semana)

//verificar os restaurantes que estão abertos àquela hora
//verificar as reservas daquela hora/dia - caso não selecione o dia é TODAY

//fetchMealTablesBySeats(seats)


//quando faz a reserva no próprio restaurante -> verificar disponibilidade:
//obter reservas em mealTables daquele restaurantId /filtrar as que são do mesmo time
//escolher a com menos seats mas com pelo menos os seats necessarios
//escolher mesa outdoor - mensagem de erro