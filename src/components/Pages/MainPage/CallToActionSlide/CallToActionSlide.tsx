import ButtonWithArrow from "@/components/Common/ButtonWithArrow/ButtonWithArrow";

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
						<ButtonWithArrow
							text='НАЧАТЬ ТРЕНИРОВКИ'
							size={{width: 366, height: 69}}
							fontSize={16}
						/>
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