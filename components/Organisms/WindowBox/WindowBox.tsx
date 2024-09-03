import Loader from '@/components/Molecules/Loader/Loader';
import styles from './WindowBox.module.scss'
import { ReactNode } from 'react';

interface IWindowBox {
	title?: string;
	children: ReactNode;
	display: boolean;
	loader: boolean;
}

export default function WindowBox(props: IWindowBox) {

	const {title, children, display, loader} = props;

	return (
		<main className={styles.main}>
			<Loader loader={loader}/>
			<div className={styles.windowBox}>
				{title && <h2 className={styles.windowBoxTitle}>{title}</h2>}
				{display === false && <span className={styles.noError}>Error: Enter only alphabetic characters!</span>}
				{display === true && <span className={styles.error}>Error: Enter only alphabetic characters!</span>}
				<div className={styles.windowBoxParams}>{children}</div>
			</div>
		</main>
	)
}