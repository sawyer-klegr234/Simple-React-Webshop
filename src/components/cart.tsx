import { useState } from "preact/hooks";
import OrderForm from "./order-form";

interface Props {
	productSkusInCart: string[];
	onRemoveFromCart: (sku: string) => void;
	emptyCart: () => void;
}

const Cart = (props: Props) => {
	const [orderSubmitted, setOrderSubmitted] = useState(false);

	return (
		<div class="c-cart o-container">
			{orderSubmitted ?
				<div class="c-order-form__submitted">Your order has been submitted. Return to the <a class="c-order-form__submitted-link" href="/">home page.</a></div>
				: (
					<>
						{props.productSkusInCart.length > 0 ?
							<>
								<h3 class="c-cart__message">These product skus are currently in your cart:</h3>
								<ul class="c-cart__products">
									{props.productSkusInCart.map(p =>
										<li class="c-cart__product">
											<span class="c-cart__product-sku">{p}</span>
											<button class="c-cart__remove c-button c-button--danger" onClick={() => props.onRemoveFromCart(p)}>Remove</button>
										</li>
									)}
								</ul>
								<OrderForm
									productSkusInCart={props.productSkusInCart}
									emptyCart={props.emptyCart}
									setOrderSubmitted={setOrderSubmitted}
								/>
							</>
							:
							<h3 class="c-cart__message">Your cart is empty.</h3>
						}
					</>
				)}
		</div>
	);
}

export default Cart;