import { Dispatch, SetStateAction } from 'react';
import styles from './Switch.module.scss'

interface ISwitch {
	switch: boolean;
	setSwitch: Dispatch<SetStateAction<boolean>>;
}

export default function Switch(props: ISwitch) {
	const { switch: isOn, setSwitch } = props;

	const handleToggle = () => {
		setSwitch(prev => !prev);
	};

	return (
		<div className={styles.main}>
			<h3 className={styles.label}>For {isOn ? 'adults' : 'children'}</h3>
			<div className={styles.switch} onClick={handleToggle}>
				<div className={`${styles.dot} ${isOn ? styles.on : ''}`}></div>
			</div>
		</div>
	);
}
