import { useState } from "preact/hooks";
import { Order } from "../api/models/order";
import { useOrdersApi } from "../api/orders";
import Loading from "./loading";

interface Props {
    productSkusInCart: string[];
    emptyCart: () => void;
    setOrderSubmitted: (submitted: boolean) => void;
    setLoading: (loading: boolean) => void;
}

const OrderForm = (props: Props) => {
    const orderApi = useOrdersApi();

    const [formData, setFormData] = useState<Order>({
        firstName: '',
        surname: '',
        email: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => { return { ...prevState, [name]: value } });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.setLoading(true);

        const newOrder: Order = {
            firstName: formData.firstName,
            surname: formData.surname,
            email: formData.email,
            skus: props.productSkusInCart
        };

        // Would check status/catch errors if this was a real api
        await orderApi.submitOrder(newOrder);

        setFormData({
            firstName: '',
            surname: '',
            email: '',
        });

        props.emptyCart();
        props.setOrderSubmitted(true);
        props.setLoading(false);
    };

    return <form class="c-order-form" onSubmit={handleSubmit}>
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
}
export default OrderForm;