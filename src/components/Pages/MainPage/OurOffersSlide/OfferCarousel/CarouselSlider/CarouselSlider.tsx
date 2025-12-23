import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';
import { CarouselSlideProps } from './CarouselSlider.types';
import { useAutoFontSize } from '@/components/Common/hooks/useAutoFontSize';
import { useMainPageContext } from '@/components/Pages/MainPage/context';

import styles from './CarouselSlider.module.scss'

const CarouselSlide: React.FC<CarouselSlideProps> = ({offer, onDetailsClick, isActive = false}) => {
	const { laptopScale } = useMainPageContext();
	const { ref: offerNameRef } = useAutoFontSize({
		maxLines: 2,
		initialFontSize: 30 * laptopScale,
		minFontSize: 16 * laptopScale,
		step: 1,
		text: offer.offerName,
		isVisible: isActive,
	});

	return (
		<div className={styles.slideWrapper}>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.discipline}`}>
					{offer.discipline ? offer.discipline.join('/') : ''}
				</div>
				<div 
					className={`${styles.halfLine} ${styles.offerName}`}
					ref={offerNameRef}
				>
					{offer.offerName}
				</div>
			</div>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
					{offer.date ?? ''}
				</div>
				<div className={`${styles.halfLine} ${styles.price}`}>
					{offer.price.toLocaleString('ru-RU')} р
				</div>
			</div>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
					{offer.time ?? ''}
				</div>
				<div className={`${styles.halfLine} ${styles.ridingLevel}`}>
					{offer.level ? offer.level.join('/') : ''}
				</div>
			</div>
			<div className={`${styles.slideInfoLine} ${styles.bottomLine}`}>
				<ButtonWithArrow
					text='ПОДРОБНЕЕ'
					size={{width: 325, height: 73}}
					onClick={onDetailsClick}
				/>
			</div>
		</div>
	);
}

export default CarouselSlide;
