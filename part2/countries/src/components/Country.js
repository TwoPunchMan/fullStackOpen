import Button from "./Button";

const Country = ({ country, showStats, renderState, getWeather }) => {
	return (
		<div>
			{country.name.common} <Button country={country} functions={[showStats, renderState, getWeather]} />
		</div>
	)
}

export default Country;
