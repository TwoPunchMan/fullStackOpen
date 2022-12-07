const Filter = ({ search, onChangeFunc }) => {
	return (
		<div>
  		find countries <input value={search} onChange={onChangeFunc} />
		</div>
	)
}

export default Filter;
