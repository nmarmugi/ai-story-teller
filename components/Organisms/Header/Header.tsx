import Button from '@/components/Atoms/Button/Button';
import styles from './Header.module.scss'

interface IHeader {
	title: string;
}

export default function Header(props: IHeader) {

	const {title} = props;

	return (
		<header className={styles.header}>
			<h1 className={styles.headerTitle}>{title}</h1>
			<Button title='Log in'/>
		</header>
	)
}