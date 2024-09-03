export interface IOption {
	label: string;
	value: string;
}

export default function Option(props: IOption) {

	const {label, value} = props;

	return (
		<option value={value}>{label}</option>
	)
}