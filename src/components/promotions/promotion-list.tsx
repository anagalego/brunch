import Link from "next/link";
import paths from "@/paths"
import type { PromotionWithData } from "../../db/queries/promotions"

interface PromotionListProps {
    fetchData: () => Promise<PromotionWithData[]>
}

export default async function PromotionList({ fetchData }: PromotionListProps) {
    const promotions = await fetchData();

    const renderedPromotions = promotions.map((promotion) => {
        return (
            <div key={promotion.id}>
                {promotion.code} :: {promotion.start.toString()} - {promotion.end.toString()} :: {promotion.percentage} %
            </div>
        )
    });
    return <div className="flex flex-row flex-wrap gap-2">
        {renderedPromotions}
    </div>
}