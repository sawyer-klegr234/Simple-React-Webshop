import { useState } from "preact/hooks";
import { useOrdersApi } from "../api/orders";
import { Order } from "../api/models/order";
import { useAsyncEffect } from "../infrastructure/asyncEffect";
import Loading from "./loading";

const OrderList = () => {
    const ordersApi = useOrdersApi();
    const [orders, setOrders] = useState<Order[]>();
    const [expanded, setExpanded] = useState<number>();

    useAsyncEffect(async (cancelled) => {
        const getProducts = await ordersApi.getOrders();

        if (cancelled()) {
            return;
        }

        setOrders(getProducts);
    }, []);

    const onExpandOrder = (index: number) => {
        if (index !== expanded) {
            setExpanded(index);
        } else {
            setExpanded(null);
        }
    }

    return <div class="c-orders-list o-container">
        {orders ?
            <ul class="c-orders-list__list">
                <li class="c-orders-list__item">
                    <h2 class="c-orders-list__item-heading">Orders:</h2>
                    <div class="c-orders-list__item-heading-message">(click to toggle all details)</div>
                </li>
                {orders.map((o, i) =>
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