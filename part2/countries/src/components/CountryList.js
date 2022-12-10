import Country from './Country';

const CountryList = ({ countries, setFilter }) => {
	if (countries.length > 10) {
		return (
			<div>
				Too many countries, specify some other filter
			</div>
		)
	} else if (countries.length === 0) {
		return (
			<div>
				No matches, specify some other filter
			</div>
		)
	} else if (countries.length > 1) {
		return (
			<div>
				{countries.map(country =>
					<div key={country.name.common}>
						{country.name.common}
            <button onClick={() => setFilter(country.name.common)}>
							show
						</button>
					</div>
				)}
			</div>
		)
	}

	return <Country country={countries[0]} />
}

export default CountryList;
