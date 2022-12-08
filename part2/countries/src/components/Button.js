const Button = ({ country, functions }) => {
	const [showStats, setView, getWeather] = [...functions];
	const [lat, lon] = country.capitalInfo.latlng;

	const callFunctions = () => {
		let d = getWeather(lat, lon);
		console.log(d);
		setView(showStats(country));
	}

	return (
		<button onClick={() => callFunctions()}>
			show
		</button>
	)
}

export default Button;
