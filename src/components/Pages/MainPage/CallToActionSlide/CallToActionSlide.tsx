import { useState, useCallback, useEffect } from "react";
import ButtonWithArrow from "@/components/Common/ButtonWithArrow/ButtonWithArrow";
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
							onClick={handleOpenModal}
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