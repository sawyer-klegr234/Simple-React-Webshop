import { useState } from "preact/hooks";
import { ProductService } from "../services/ProductService";
import { FormData } from "../api/models/formData";

interface Props {
    productSkusInCart: string[];
    emptyCart: () => void;
    setOrderSubmitted: (submitted: boolean) => void;
}

const OrderForm = (props: Props) => {

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        surname: '',
        email: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newOrder: FormData = {
            firstName: formData.firstName,
            surname: formData.surname,
            email: formData.email,
            skus: props.productSkusInCart
        };

        // Would check status/catch errors if this was a real api
        await ProductService.submitOrder(newOrder);

        setFormData({
            firstName: '',
            surname: '',
            email: '',
        });
        
        props.emptyCart();
        props.setOrderSubmitted(true);
    };

    return (
            <form class="c-order-form" onSubmit={handleSubmit}>
                <label class="c-order-form__label">
                    First Name:
                    <input
                        class="c-order-form__input"
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </label>
                <label class="c-order-form__label">
                    Last Name:
                    <input
                        class="c-order-form__input"
                        type="text"
                        name="surname"
                        required
                        value={formData.surname}
                        onChange={handleInputChange}
                    />
                </label>
                <label class="c-order-form__label">
                    Email:
                    <input
                        class="c-order-form__input"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <button class="c-order-form__submit c-button" type="submit">Submit order</button>
            </form>
    );
}
export default OrderForm;