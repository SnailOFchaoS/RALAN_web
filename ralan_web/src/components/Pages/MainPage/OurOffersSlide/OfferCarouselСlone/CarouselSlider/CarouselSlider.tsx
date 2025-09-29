import styles from './CarouselSlider.module.scss'

const CarouselSlide = () => {
	return (
		<div className={styles.slideWrapper}>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.discipline}`}>
					шоссе
				</div>
				<div className={`${styles.halfLine} ${styles.offerName}`}>
					Месячный абонемент
				</div>
			</div>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
					30 февраля
				</div>
				<div className={`${styles.halfLine} ${styles.price}`}>
					25 000 р
				</div>
			</div>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
					12 занятий по 90 минут
				</div>
				<div className={`${styles.halfLine} ${styles.ridingLevel}`}>
					Любой уровень
				</div>
			</div>
			<div className={styles.slideInfoLine}>
				test
			</div>
		</div>
	);
}

export default CarouselSlide;