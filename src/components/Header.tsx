import { NavLink } from 'react-router-dom';
import { useAuth } from '../infrastructure/authContext';

interface Props {
	countInCart: number;
}

const Header = (props: Props) => {
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
					<NavLink to="/cart" className="c-header__nav-link">
						Cart {props.countInCart > 0 ? ` (${props.countInCart})` : "" }
					</NavLink>
				</>}
			</nav>
		</header>
	);
}

export default Header;