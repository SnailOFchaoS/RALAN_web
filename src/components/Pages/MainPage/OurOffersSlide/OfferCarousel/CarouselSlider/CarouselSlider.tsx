import { OfferShort } from '@/components/Common/types';

import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';

import styles from './CarouselSlider.module.scss'

const CarouselSlide: React.FC<{offer: OfferShort}> = ({offer}) => {
	return (
		<div className={styles.slideWrapper}>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.discipline}`}>
					{offer.discipline ? offer.discipline.join('/') : ''}
				</div>
				<div className={`${styles.halfLine} ${styles.offerName}`}>
					{offer.offerName}
				</div>
			</div>
			<div className={styles.slideInfoLine}>
				<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
					{offer.date ?? ''}
				</div>
				<div className={`${styles.halfLine} ${styles.price}`}>
					{offer.price}
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
				/>
			</div>
		</div>
	);
}

export default CarouselSlide;