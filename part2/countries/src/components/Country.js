import Button from "./Button";

const Country = ({ country, showStats, renderState }) => {
	return (
		<div>
			{country.name.common} <Button country={country} showFunction={showStats} renderFunction={renderState} />
		</div>
	)
}

export default Country;
