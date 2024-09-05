import { ReactNode } from 'react';
import styles from './Button.module.scss'

interface IButton {
	title?: string;
	onClick?: () => void;
	disabled?: boolean;
	children?: ReactNode;
}

export default function Button(props: IButton) {

	const {title, onClick, disabled, children} = props;

	return (
		<button disabled={disabled} className={styles.button} onClick={onClick}>{title}{children}</button>
	)
}