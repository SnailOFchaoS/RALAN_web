import Image from 'next/image';

import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';
import { Offer } from '@/store/slices/Offers/types';
import importantIcon from '../../../../../../../assets/svg/important.svg';

import styles from './CarouselSlide.module.scss';

interface CarouselSlideProps {
  offer: Offer;
  onDetailsClick: () => void;
  isActive?: boolean;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ offer, onDetailsClick, isActive = false }) => {
  return (
    <div className={styles.slideWrapper}>
      {offer.important && (
        <div className={styles.important}>
          <Image
            src={importantIcon}
            alt=""
            width={40}
            height={40}
          />
        </div>
      )}
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
          {offer.price.toLocaleString('ru-RU')} р
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
          size={{ width: 161, height: 33 }}
          fontSize={11}
          onClick={onDetailsClick}
        />
      </div>
    </div>
  );
};

export default CarouselSlide;

