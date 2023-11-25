import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import './assets/styles/main.scss';

import { NotFound } from './pages/not-found.js';
import { Home } from './pages/home.js';
import { Header } from './components/Header.js';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
