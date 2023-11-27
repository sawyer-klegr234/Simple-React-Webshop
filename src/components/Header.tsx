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
					<div class="c-header__primary-links">
						<NavLink to="/" className="c-header__nav-link">
							Home
						</NavLink>
						{authContext.isAdmin ?
							<NavLink to="/orders" className="c-header__nav-link">
								Orders
							</NavLink>
							:
							<NavLink to="/cart" className="c-header__nav-link">
								Cart {props.countInCart > 0 ? ` (${props.countInCart})` : ""}
							</NavLink>
						}
					</div>
					<NavLink to="/logout" className="c-header__nav-link">
						Logout
					</NavLink>
				</>}
			</nav>
		</header>
	);
}

export default Header;