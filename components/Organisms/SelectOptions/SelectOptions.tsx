import React from 'react';
import Select from '@/components/Molecules/Select/Select';
import Option, { IOption } from '@/components/Atoms/Option/Option';
import styles from './SelectOptions.module.scss';

interface ISelectOptions {
	label: string;
	options: IOption[];
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	id: string;
	name: string;
}

export default function SelectOptions(props: ISelectOptions) {
	const { label, options, onChange, name, id } = props;

	return (
		<div className={styles.main}>
			<h3 className={styles.label}>{label}</h3>
			<Select id={id} name={name} onChange={onChange}>
				{options.map(option => (<Option key={option.value} label={option.label} value={option.value} />))}
			</Select>
		</div>
	)
}
