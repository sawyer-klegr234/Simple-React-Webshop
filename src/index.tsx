import { render } from 'preact';
import './assets/styles/main.scss';
import { useEffect, useState } from 'preact/hooks';
import { initAuth0 } from './infrastructure/auth';
import Login from './pages/login';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Logout from './pages/logout';
import Header from './components/header';
import NotFound from './pages/not-found';
import Home from './pages/home';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const auth0 = await initAuth0();
			const query = window.location.search;
			const shouldParseResult = query.includes("code=") && query.includes("state=");

			if (shouldParseResult) {
				try {
					await auth0.handleRedirectCallback();
				} catch (e) {
					console.warn("Error parsing redirect:", e);
				}

				window.history.replaceState({}, document.title, "/");
			}

			const authenticated = await auth0.isAuthenticated();
			setIsAuthenticated(authenticated);

			if (!authenticated) {
				// Redirect to login if the user is not logged in. Would be nicer to do this with useNavigate,
				// but it does not really matter as we will be redirected to Auth0, meaning a full page reload,
				// is not that big of a deal. We can not use useNavigate as we are outside of a router.
				window.location.href = "login";
			}
		};

		checkAuth();
	}, []);

	return (
		<BrowserRouter>
			<Header isAuthenticated={isAuthenticated} />
			<main>
				<Routes>
					{!isAuthenticated ? (
						<Route path="/login" element={<Login />} />
					) : (
						<>
							<Route path="/logout" element={<Logout />} />
							<Route path='/' element={<Home />} />
							<Route path='*' element={<NotFound />} />
						</>
					)}
				</Routes>
			</main>
		</BrowserRouter>
	);
}

render(<App />, document.getElementById('app'));

export default App;