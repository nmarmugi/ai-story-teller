import styles from './Loader.module.scss'

interface ILoader {
	loader: boolean;
}

export default function Loader(props: ILoader) {

	const {loader} = props;

	return (
		<div className={loader ? styles.loaderBox : styles.noLoader}>
			<span className={styles.loaderTitle}></span>
			<div className={styles.containerLoaderInput}>
				<span className={styles.loaderInput}></span>
				<span className={styles.loaderInput}></span>
				<span className={styles.loaderInput}></span>
				<span className={styles.loaderButton}></span>
			</div>
		</div>
	)
}