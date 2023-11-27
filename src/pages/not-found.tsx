import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div class="c-not-found o-container">
			<h1 class="c-not-found__heading">404: Not Found</h1>
			<p class="c-not-found__text">
				We were not able to find what you are looking for. If you have not already totally lost faith in us, feel free to head back to the <button class="c-not-found__home-button c-button--unstyled c-button--link" onClick={() => navigate("../")}>home page.</button>
			</p>
		</div>
	);
}

export default NotFound;