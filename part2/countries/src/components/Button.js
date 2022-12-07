const Button = ({ country, showFunction, renderFunction }) =>
	<button onClick={() => renderFunction(showFunction(country))}>
		show
	</button>

export default Button;
