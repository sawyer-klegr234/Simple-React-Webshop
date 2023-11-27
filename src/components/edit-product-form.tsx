import { useNavigate, useParams } from "react-router-dom";
import { useProductsApi } from "../api/products";
import { useAsyncEffect } from "../infrastructure/asyncEffect";
import { useState } from "preact/hooks";
import { Product } from "../api/models/product";
import Loading from "./loading";

interface Props {
    updateProductState: (sku: string, product: Product) => void;
}

const EditProductForm = (props: Props) => {
    const { sku } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [updatedProduct, setUpdateProduct] = useState<Product>({
        sku: '',
        name: '',
        price: null,
        description: ''
    });

    const productsApi = useProductsApi();

    useAsyncEffect(async (cancelled) => {
        const product = await productsApi.getProductBySku(sku);

        if (cancelled()) {
            return;
        }

        setUpdateProduct({ ...product })
        setIsLoading(false);
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateProduct(prevState => { return { ...prevState, [name]: value } });
    };

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        // Would check status/catch errors if this was a real api
        const response = await productsApi.updateProduct(sku, updatedProduct);

        props.updateProductState(sku, response);
        navigate("../");
    };

    return <div class="c-edit-product-form o-container">
        {sku ? (
            isLoading ?
                <Loading />
                :
                <form class="c-edit-product-form__form" onSubmit={handleSubmit}>
                    <label class="c-edit-product-form__label">
                        Sku:
                        <input
                            class="c-edit-product-form__input"
                            type="text"
                            name="sku"
                            required
                            value={updatedProduct.sku}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label class="c-edit-product-form__label">
                        Name:
                        <input
                            class="c-edit-product-form__input"
                            type="text"
                            name="name"
                            required
                            value={updatedProduct.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label class="c-edit-product-form__label">
                        Price:
                        <div class="c-edit-product-form__price-container">
                            <span class="c-edit-product-form__price-symbol">$</span>
                            <input
                                class="c-edit-product-form__input"
                                type="numeric"
                                name="price"
                                required
                                value={updatedProduct.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </label>
                    <label class="c-edit-product-form__label">
                        Description:
                        <textarea
                            class="c-edit-product-form__input c-edit-product-form__description"
                            name="description"
                            required
                            rows={5}
                            value={updatedProduct.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button class="c-edit-product-form__submit c-button" type="submit">Save changes</button>
                </form>
        ) :
            <div class="c-edit-product-form__no-sku">
                No Sku was provided. Please return to the <button class="c-edit-product-form__home-button c-button--unstyled c-button--link" onClick={() => navigate("../")}>home page.</button>
            </div>
        }
    </div>

}

export default EditProductForm;