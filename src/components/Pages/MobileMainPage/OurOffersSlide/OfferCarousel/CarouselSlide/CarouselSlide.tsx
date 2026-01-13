import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';
import { Offer } from '@/store/slices/Offers/types';

import styles from './CarouselSlide.module.scss';

interface CarouselSlideProps {
  offer: Offer;
  onDetailsClick: () => void;
  isActive?: boolean;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ offer, onDetailsClick, isActive = false }) => {
  return (
    <div className={styles.slideWrapper}>
      <div className={styles.slideInfoLine}>
        <div className={styles.discipline}>
          {offer.discipline ? offer.discipline.join('/') : ''}
        </div>
        <div className={styles.offerName}>
          {offer.offerName}
        </div>
      </div>
      <div className={styles.slideInfoLine}>
        <div className={styles.dateAndTime}>
          {offer.date ?? ''}
        </div>
        <div className={styles.price}>
          {offer.price.toLocaleString('ru-RU')} ₽
        </div>
      </div>
      <div className={styles.slideInfoLine}>
        <div className={styles.dateAndTime}>
          {offer.time ?? ''}
        </div>
        <div className={styles.ridingLevel}>
          {offer.level ? offer.level.join('/') : ''}
        </div>
      </div>
      <div className={styles.buttonLine}>
        <ButtonWithArrow
          text='ПОДРОБНЕЕ'
          size={{ width: 153, height: 40 }}
          fontSize={12}
          onClick={onDetailsClick}
        />
      </div>
    </div>
  );
};

export default CarouselSlide;

