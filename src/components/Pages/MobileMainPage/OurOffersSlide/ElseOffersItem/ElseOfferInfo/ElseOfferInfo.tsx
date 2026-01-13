import Image from 'next/image';

import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';
import { ElseOfferInterface } from '@/components/Common/types';

import styles from './ElseOfferInfo.module.scss';

interface ElseOfferInfoProps {
  mirror?: boolean;
  data: ElseOfferInterface;
  onDetailsClick: () => void;
}

const ElseOfferInfo: React.FC<ElseOfferInfoProps> = ({ mirror = false, data, onDetailsClick }) => {
  return (
    <div className={styles.elseOfferInfoWrapper}>
      <div className={styles.imageBlock}>
        <Image
          alt={data.title}
          className={styles.image}
          src={data.image.src}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.textContent}>
        {data.textInfo.map((element: { title: string; data: string }, index: number) => (
          <div key={index} className={styles.textBlock}>
            <div className={styles.blockTitle}>{element.title}</div>
            <div className={styles.blockText}>{element.data}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <ButtonWithArrow
          text='ПОДРОБНЕЕ'
          size={{ width: 280, height: 56 }}
          fontSize={16}
          onClick={onDetailsClick}
        />
      </div>
    </div>
  );
};

export default ElseOfferInfo;

