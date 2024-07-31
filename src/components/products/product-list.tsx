import Link from "next/link";
import paths from "@/paths"
import type { ProductWithData } from "../../db/queries/products"


interface ProductListProps {
    fetchData: () => Promise<ProductWithData[]>
}

export default async function ProductList({ fetchData }: ProductListProps) {
    const products = await fetchData();

    const renderedProducts = products.map((product) => {
        return (
            <div key={product.id}>
                {product.name} - {product.description} - {product.price}
            </div>
        )
    });
    return <div className="flex flex-row flex-wrap gap-2">
        {renderedProducts}
    </div>
}