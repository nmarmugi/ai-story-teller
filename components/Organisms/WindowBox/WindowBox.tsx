import styles from './WindowBox.module.scss'

interface IWindowBox {
	title?: string;
}

export default function WindowBox(props: IWindowBox) {

	const {title} = props;

	return (
		<main className={styles.main}>
			<div className={styles.windowBox}>
				{title &&
					<h2 className={styles.windowBoxTitle}>
						{title}
					</h2>
				}
			</div>
		</main>
	)
}