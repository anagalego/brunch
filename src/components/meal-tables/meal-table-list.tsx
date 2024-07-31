import { MealTable } from "@prisma/client";


interface MealTableListProps {
    fetchData: () => Promise<MealTable[]>
}

export default async function MealTableList({ fetchData }: MealTableListProps) {
    const mealTables = await fetchData();

    const renderedMealTables = mealTables.map((mealTable) => {
        return (
            <div key={mealTable.id}>
                {mealTable.id} - {mealTable.outdoor} - {mealTable.seats}
            </div>
        )
    });
    return <div className="flex flex-row flex-wrap gap-2">
        LISTA DE MESAS
        {renderedMealTables}
    </div>
}