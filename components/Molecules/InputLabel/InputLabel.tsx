import Label, { ILabel } from '@/components/Atoms/Label/Label'
import styles from './InputLabel.module.scss'
import Input, { IInput } from '@/components/Atoms/Input/Input'

interface IInputLabel {
	input: IInput;
	label: ILabel;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLabel(props: IInputLabel) {

	const {input, label, onChange} = props;

	return (
		<div className={styles.main}>
			<Label htmlFor={label.htmlFor} label={label.label} />
			<Input onChange={onChange} id={input.id} name={input.name} placeholder={input.placeholder} type={input.type} />
		</div>
	)
}