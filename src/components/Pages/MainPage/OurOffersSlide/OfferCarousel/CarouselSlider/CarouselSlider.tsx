import Image from 'next/image';

import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';
import { CarouselSlideProps } from './CarouselSlider.types';
import { useAutoFontSize } from '@/components/Common/hooks/useAutoFontSize';
import { useMainPageContext } from '@/components/Pages/MainPage/context';
import importantIcon from '../../../../../../../assets/svg/important.svg';

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
		<article className={styles.slideWrapper} aria-label={offer.offerName}>
			{offer.important && 
				<div className={styles.important}>
					<Image
						src={importantIcon}
						alt="important"
						width={87 * laptopScale}
						height={87 * laptopScale}
					/>
				</div>
			}
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.discipline}`}>
					{offer.discipline ? offer.discipline.join('/') : ''}
				</div>
				<h3
					className={`${styles.halfLine} ${styles.offerName}`}
					ref={offerNameRef}
				>
					{offer.offerName}
				</h3>
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
		</article>
	);
}

export default CarouselSlide;
