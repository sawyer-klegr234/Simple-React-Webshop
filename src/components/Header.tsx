import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header class="c-header">
			<nav class="c-header__nav o-container">
				<a href="/" class={`c-header__nav-link ${url == '/' ? 'c-header__nav-link--active' : ""}`}>
					Home
				</a>
				<a href="/404" class={`c-header__nav-link ${url == '/404' ? 'c-header__nav-link--active' : ""}`}>
					404
				</a>
			</nav>
		</header>
	);
}
