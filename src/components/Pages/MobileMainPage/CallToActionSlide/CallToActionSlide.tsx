import { useState, useCallback, useEffect } from "react";
import Modal from "@/components/Common/Modal/Modal";
import ContactFormModal from "@/components/Common/ContactFormModal/ContactFormModal";

import styles from "./CallToActionSlide.module.scss"

const CallToActionSlide: React.FC = () => {
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [onCloseClick, setOnCloseClick] = useState(false);

	const handleOpenModal = useCallback(() => {
		setIsModalOpened(true);
		setOnCloseClick(false);
	}, []);

	const handleCloseModal = useCallback(() => {
		setOnCloseClick(true);
	}, []);

	useEffect(() => {
		if (isModalOpened) {
			setOnCloseClick(false);
		}
	}, [isModalOpened]);

	return (
		<div className={styles.callToActionSlideWrapper}>
			<div className={styles.callToActionBlock}>
				<div className={styles.mainText}>
					Хотите уточнить детали, не знаете с чего начать или остались вопросы? Позвоните нам или оставьте свои данные и мы с вами свяжемся
				</div>
				<div className={styles.titleText}>
					ПОРА РАСКРЫТЬ СОВОЙ ПОТЕНЦИАЛ
				</div>
				<div className={styles.subtitleText}>
					ЗАИНТЕРЕСОВАНЫ ?
				</div>
				<div className={styles.buttonWrapper}>
					<div className={styles.button} onClick={handleOpenModal}>
						НАЧАТЬ ТРЕНИРОВКИ
					</div>
				</div>
			</div>

			<Modal isOpen={isModalOpened} onClose={handleCloseModal} needBgAnimation={true}>
				<ContactFormModal
					isOpen={isModalOpened}
					setIsModalOpened={setIsModalOpened}
					onCloseClick={onCloseClick}
				/>
			</Modal>
		</div>
	)
}

export default CallToActionSlide;
