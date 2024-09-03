import styles from './Label.module.scss'

export interface ILabel {
	label: string;
	htmlFor: string;
}

export default function Label(props: ILabel) {

	const {label, htmlFor} = props;

	return (
		<label className={styles.label} htmlFor={htmlFor}>{label}</label>
	)
}