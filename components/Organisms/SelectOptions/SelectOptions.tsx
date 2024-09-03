import React from 'react';
import Select from '@/components/Molecules/Select/Select';
import Option, { IOption } from '@/components/Atoms/Option/Option';
import styles from './SelectOptions.module.scss';

interface ISelectOptions {
	label: string;
	options: IOption[];
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectOptions(props: ISelectOptions) {
	const { label, options, onChange } = props;

	return (
		<div className={styles.main}>
			<h3 className={styles.label}>{label}</h3>
			<Select id="genre" name="genre" onChange={onChange}>
				{options.map(option => (<Option key={option.value} label={option.label} value={option.value} />))}
			</Select>
		</div>
	)
}
