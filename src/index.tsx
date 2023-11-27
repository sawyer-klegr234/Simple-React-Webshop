import { render } from 'preact';
import './assets/styles/main.scss';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logout from './pages/logout';
import Header from './components/header';
import NotFound from './pages/not-found';
import Home from './pages/home';
import { AuthContextProvider, useAuth } from './infrastructure/authContext';
import Loading from './components/loading';
import { useState } from 'preact/hooks';
import Toast from './components/toast';
import Cart from './pages/cart';

const ActiveRoutes = () => {
	const authContext = useAuth();
	const [productSkusInCart, setProductSkusInCart] = useState<string[]>([]);
	const [toastMessage, setToastMessage] = useState<string>();
	const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout>();

	const displayToast = (message: string) => {
		if (currentInterval) {
			clearInterval(currentInterval);
		}

		setToastMessage(message);
		setCurrentInterval(setInterval(() => { setToastMessage("") }, 4000));
	}

	const onAddToCart = (sku: string) => {
		if (productSkusInCart.some(x => x === sku)) {
			displayToast("Product already in cart");
		} else {
			setProductSkusInCart(prevState => {
				return [...prevState, sku];
			});
			displayToast("Added to cart!");
		}
	}

	const onRemoveFromCart = (sku: string) => {
		setProductSkusInCart(prevState => {
			return [...prevState].filter(x => x !== sku);
		});
		displayToast("Removed from cart!")
	}

	return <>
		<Header countInCart={productSkusInCart.length} />
		<main>
			{authContext.isAuthenticated ?
				(<>
					<Routes>
						<Route path="/logout" element={<Logout />} />
						<Route path='/' element={<Home onAddToCart={onAddToCart} />} />
						<Route path='/cart' element={
							<Cart
								productSkusInCart={productSkusInCart}
								onRemoveFromCart={onRemoveFromCart}
								emptyCart={() => setProductSkusInCart([])} />
						} />
						<Route path='*' element={<NotFound />} />
					</Routes>
					<Toast message={toastMessage} />
				</>) :
				(
					<>
						<Routes>
							<Route path="/login" element={<Login />} />
						</Routes>
						{/* if the user is ever not logged in they are in the process of being authenticated, so show the loading spinner */}
						<Loading />
					</>
				)}
		</main>
	</>
}

const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				{/* Wrap routes so that we can use auth context to display only some routes*/}
				<ActiveRoutes />
			</AuthContextProvider>
		</BrowserRouter>
	);
}

render(<App />, document.getElementById('app'));

export default App;