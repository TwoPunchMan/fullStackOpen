const Filter = ({ search, onChangeFunc }) =>
	<div>
		filter shown with <input value={search} onChange={onChangeFunc} />
	</div>

export default Filter;
