import { OfferShort } from '@/components/Common/types';

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
				<div className={styles.buttonWrapper}>
					<p className={styles.buttonText}>
						ПОДРОБНЕЕ
					</p>
					<div className={styles.arrowContainer}/>
				</div>
			</div>
		</div>
	);
}

export default CarouselSlide;