import { Product } from "../api/models/product";
import { useAsyncEffect } from "../infrastructure/asyncEffect";
import { useProductsApi } from "../api/products";
import Loading from "./loading";
import { convertNumberToPrice } from "../helpers/priceHelper";
import { useAuth } from "../infrastructure/authContext";
import { useNavigate } from "react-router-dom";

interface Props {
    onAddToCart: (sku: string) => void;
    setProducts: (products: Product[]) => void;
    products: Product[];
}

const ProductGrid = (props: Props) => {
    const productsApi = useProductsApi();
    const authContext = useAuth();
    const navigate = useNavigate();

    useAsyncEffect(async (cancelled) => {
        // Products are stored in the parent through props, so if a admin updates a item,
        // we only need to make one request to the "api" to update the data, then can just
        // update state rather than re-fetching the entire product list. This also allows
        // customers (any one who is logged in and not a admin, as there are no users that
        // are ever logged in who are not either a admin or customer) to go from the Home
        // tab and cart tab without any api calls. This does mean that if we were using a
        // real api, we would not get any updates made by other users without refreshing 
        // the page, but that can be dealt with in other ways. The same is done for the 
        // order list.
        if(props.products) {
            return;
        }

        const getProducts = await productsApi.getProducts();

        if (cancelled()) {
            return;
        }

        props.setProducts(getProducts);
    }, []);

    return <div class="c-product-grid o-container">
        {props.products ?
            <ul class={`c-product-grid__grid ${authContext.isAdmin ? "c-product-grid--list" : ""}`}>
                {props.products.map(p =>
                    <li class="c-product-grid__item">
                        {/* these should probably link to product pages, but I have left them without a actual link for now */}
                        <a class="c-product-grid__link">
                            <h4 class="c-product-grid__name">{p.name}</h4>
                            <div class="c-product-grid__details">
                                <div class="c-product-grid__sku">Sku: {p.sku}</div>
                                <div class="c-product-grid__price">{authContext.isAdmin ? "Price: " : ""} {convertNumberToPrice(p.price)}</div>
                            </div>
                            <p class="c-product-grid__description">{p.description}</p>

                            {authContext.isAdmin ?
                                <button class="c-product-grid__button c-button" onClick={() => navigate(`/edit/${p.sku}`)}>Edit</button>
                                :
                                <button class="c-product-grid__button c-button" onClick={(e) => { e.preventDefault(); props.onAddToCart(p.sku) }}>Add to cart</button>
                            }
                        </a>
                    </li>
                )}
            </ul>
            :
            <Loading />
        }
    </div>
}

export default ProductGrid;