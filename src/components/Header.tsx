import { NavLink } from 'react-router-dom';

interface props {
	isAuthenticated: boolean;
}

const Header = (props: props) => {

	return (
		<header className="c-header">
			<nav className="c-header__nav o-container">
				{props.isAuthenticated && <>
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