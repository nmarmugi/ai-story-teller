import styles from './Input.module.scss'

export interface IInput {
	type: string;
	placeholder: string;
	id: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: IInput) {

	const {type, placeholder, id, name, onChange} = props;

	return (
		<input onChange={onChange} className={styles.input} id={id} name={name} placeholder={placeholder} type={type} />
	)
}