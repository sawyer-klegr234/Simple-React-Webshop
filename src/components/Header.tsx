import { NavLink } from 'react-router-dom';
import { useAuth } from '../infrastructure/authContext';

const Header = () => {
	const authContext = useAuth();

	return (
		<header className="c-header">
			<nav className="c-header__nav o-container">
				{authContext.isAuthenticated && <>
					<NavLink to="/" className="c-header__nav-link">
						Home
					</NavLink>
					<NavLink to="/logout" className="c-header__nav-link">
						Logout
					</NavLink>
				</>}
			</nav>
		</header>
	);
}

export default Header;