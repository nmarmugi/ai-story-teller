import { ReactNode } from 'react';
import styles from './Loader.module.scss'

interface ILoader {
	loader: boolean;
	children: ReactNode
}

export default function Loader(props: ILoader) {

	const {loader, children} = props;

	return (
		<div className={loader ? styles.loaderBox : styles.noLoader}>
			{children}
		</div>
	)
}