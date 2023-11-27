interface Props {
	productSkusInCart: string[];
	onRemoveFromCart: (sku: string) => void;
}

const Cart = (props: Props) => {
	return (
		<div class="c-cart o-container">
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
				</>
				:
				<h3 class="c-cart__message">Your cart is empty.</h3>
			}
		</div>
	);
}

export default Cart;