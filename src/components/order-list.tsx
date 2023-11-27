import { useState } from "preact/hooks";
import { useOrdersApi } from "../api/orders";
import { Order } from "../api/models/order";
import { useAsyncEffect } from "../infrastructure/asyncEffect";
import Loading from "./loading";

interface Props {
    setOrders: (orders: Order[]) => void;
    orders: Order[];
}

const OrderList = (props: Props) => {
    const ordersApi = useOrdersApi();
    const [expanded, setExpanded] = useState<number>();

    useAsyncEffect(async (cancelled) => {
        // Store orders in the parent to prevent extra reloading
        if(props.orders) {
            return;
        }

        const getProducts = await ordersApi.getOrders();

        if (cancelled()) {
            return;
        }

        props.setOrders(getProducts);
    }, []);

    const onExpandOrder = (index: number) => {
        if (index !== expanded) {
            setExpanded(index);
        } else {
            setExpanded(null);
        }
    }

    return <div class="c-orders-list o-container">
        {props.orders ?
            <ul class="c-orders-list__list">
                <li class="c-orders-list__item">
                    <h2 class="c-orders-list__item-heading">Orders:</h2>
                    <div class="c-orders-list__item-heading-message">(click to view order details)</div>
                </li>
                {props.orders.map((o, i) =>
                    <li class="c-orders-list__item">
                        <button class="c-orders-list__expand-button c-button--unstyled" onClick={() => onExpandOrder(i)}>
                            {o.firstName} {o.surname}
                        </button>
                        {expanded == i &&
                            <div class="c-orders-list__item-details">
                                <label class="c-orders-list__email-label">Email:</label>
                                <a class="c-orders-list__email" href={`mailto:${o.email}`}>{o.email}</a>
                                <label class="c-orders-list__skus-label">Skus:</label>
                                <div class="c-orders-list__skus">{o.skus.join(", ")}</div>
                            </div>
                        }
                    </li>
                )}
            </ul>
            :
            <Loading />
        }
    </div>
}

export default OrderList;