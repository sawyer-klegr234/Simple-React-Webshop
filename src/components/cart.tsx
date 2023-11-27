import { useState } from "preact/hooks";
import OrderForm from "./order-form";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

interface Props {
	productSkusInCart: string[];
	onRemoveFromCart: (sku: string) => void;
	emptyCart: () => void;
}

const Cart = (props: Props) => {
	const [orderSubmitted, setOrderSubmitted] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	return (
		<div class="c-cart o-container">
			{isLoading ?
				<Loading /> :
				(orderSubmitted ?
					<div class="c-order-form__submitted">
						Your order has been submitted. Return to the <button class="c-order-form__home-button c-button--unstyled c-button--link" onClick={() => navigate("../")}>home page.</button>
					</div>
					: (
						<>
							{props.productSkusInCart.length > 0 ?
								<>
									<h2 class="c-cart__message">These product skus are currently in your cart:</h2>
									<ul class="c-cart__products">
										{props.productSkusInCart.map(p =>
											<li class="c-cart__product">
												<span class="c-cart__product-sku">{p}</span>
												<button class="c-cart__remove c-button c-button--danger" onClick={() => props.onRemoveFromCart(p)}>Remove</button>
											</li>
										)}
									</ul>
									<h3 class="c-cart__submit-message">Place your order:</h3>
									<OrderForm
										productSkusInCart={props.productSkusInCart}
										emptyCart={props.emptyCart}
										setOrderSubmitted={setOrderSubmitted}
										setLoading={setLoading}
									/>
								</>
								:
								<h2 class="c-cart__message">Your cart is empty.</h2>
							}
						</>
					)
				)
			}
		</div>
	);
}

export default Cart;