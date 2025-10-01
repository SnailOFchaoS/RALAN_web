import styles from "./CallToActionSlide.module.scss"

const CallToActionSlide: React.FC = () => {
	return (
		<div className={styles.callToActionSlideWrapper}>
			<div className={styles.slideLine}>
				<div className={styles.callToActionBlock}>
					<div className={styles.blockLine}>
						<div className={styles.titleText}>
							ЗАИНТЕРЕСОВАНЫ ?
						</div>
						<div className={styles.buttonWrapper}>
							<p className={styles.buttonText}>
								НАЧАТЬ ТРЕНИРОВКИ
							</p>
							{/* <div className={styles.arrowContainer}/> */}
							<div className={`${styles.arrowContainer} ${styles.arrowRight}`}/>
							<div className={`${styles.arrowContainer} ${styles.arrowLeft}`}/>
						</div>
					</div>
					<div className={styles.blockLine}>
						<div className={styles.titleText}>
							ПОРА РАСКРЫТЬ СОВОЙ ПОТЕНЦИАЛ
						</div>
					</div>
					<div className={styles.blockLine}>
						<div className={styles.mainText}>
							Хотите уточнить детали, не знаете с чего начать или остались вопросы? Позвоните нам или оставьте свои данные и мы с вами свяжемся
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CallToActionSlide;