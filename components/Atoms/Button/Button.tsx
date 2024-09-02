import styles from './Button.module.scss'

interface IButton {
	title: string;
	onClick?: () => void;
}

export default function Button(props: IButton) {

	const {title, onClick} = props;

	return (
		<button className={styles.button} onClick={onClick}>{title}</button>
	)
}