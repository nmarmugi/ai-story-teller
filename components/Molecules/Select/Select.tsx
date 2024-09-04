import { ReactNode } from 'react';
import styles from './Select.module.scss'

export interface ISelect {
	id: string;
	name: string;
	children: ReactNode;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select(props: ISelect) {

	const {id, name, children, onChange} = props;

	return (
		<select className={styles.select} id={id} name={name} onChange={onChange}>
			<option value="" hidden>Select {name}...</option>
			{children}
		</select>
	)
}