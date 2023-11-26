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

// Wrap routes so that we can use auth context
const ActiveRoutes = () => {
	const authContext = useAuth();

	if (authContext.isAuthenticated) {
		return (
			<Routes>
				<Route path="/logout" element={<Logout />} />
				<Route path='/' element={<Home />} />
				<Route path='*' element={<NotFound />} />
			</Routes>);
	} else {
		return (
			<>
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
				{/* if the user is ever not logged in they are in the process of being authenticated, so show the loading spinner */}
				<Loading/>
			</>
		);
	}
}

const App = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Header />
				<main>
					<ActiveRoutes/>
				</main>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

render(<App />, document.getElementById('app'));

export default App;