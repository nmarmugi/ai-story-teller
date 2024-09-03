import styles from './Button.module.scss'

interface IButton {
	title: string;
	onClick?: () => void;
	disabled?: boolean;
}

export default function Button(props: IButton) {

	const {title, onClick, disabled} = props;

	return (
		<button disabled={disabled} className={styles.button} onClick={onClick}>{title}</button>
	)
}