import ProductGrid from "../components/product-grid";

interface Props {
    onAddToCart: (sku: string) => void;
}

const Home = (props: Props) => {
	return (
		<div class="c-home o-container">
			<ProductGrid onAddToCart={props.onAddToCart}/>
		</div>
	);
}

export default Home;