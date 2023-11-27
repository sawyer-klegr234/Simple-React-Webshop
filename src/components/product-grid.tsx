import { useState } from "preact/hooks";
import { Product } from "../api/models/product";
import { useAsyncEffect } from "../infrastructure/asyncEffect";
import { useProductsApi } from "../api/products";
import Loading from "./loading";
import { convertNumberToPrice } from "../helpers/priceHelper";

interface Props {
    onAddToCart: (sku: string) => void;
}

const ProductGrid = (props: Props) => {
    const [products, setProducts] = useState<Product[]>();
    const productsApi = useProductsApi();

    useAsyncEffect(async (cancelled) => {
        const getProducts = await productsApi.getProducts();

        if (cancelled()) {
            return;
        }

        setProducts(getProducts);
    }, []);

    return products ?
        <ul class="c-product-grid">
            {products.map(p =>
                <li class="c-product-grid__item">
                    {/* these should probably link to product pages, but I have left them without a actual link for now */}
                    <a class="c-product-grid__link">
                        <h4 class="c-product-grid__name">{p.name}</h4>
                        <div class="c-product-grid__details">
                            <div class="c-product-grid__sku">Sku: {p.sku}</div>
                            <div class="c-product-grid__price">{convertNumberToPrice(p.price)}</div>
                        </div>
                        <p class="c-product-grid__description">{p.description}</p>

                        <button class="c-product-grid__button c-button" onClick={(e) => {e.preventDefault(); props.onAddToCart(p.sku)}}>Add to cart</button>
                    </a>
                </li>
            )}
        </ul>
        :
        <Loading />
}

export default ProductGrid;