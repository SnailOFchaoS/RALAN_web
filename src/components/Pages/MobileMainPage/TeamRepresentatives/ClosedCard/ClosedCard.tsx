import Image from 'next/image';

import { ClosedCardProps } from './ClosedCard.types';

import styles from './ClosedCard.module.scss';

const ClosedCard: React.FC<ClosedCardProps> = ({ person, imageConfig }) => {
  return (
    <>
      <div className={styles.imageWrapper}>
        <Image
          src={imageConfig?.src || person.image.src}
          alt={`${person.surname} ${person.name}`}
          width={imageConfig?.width ?? 528}
          height={imageConfig?.height ?? 352}
          style={{ 
            position: 'absolute',
            top: imageConfig?.top ?? 0,
            left: imageConfig?.left ?? 0
          }}
        />
      </div>
      <div className={styles.nameBlock}>
        <p className={styles.surname}>{person.surname.toUpperCase()}</p>
        <p className={styles.fullName}>{person.name} {person.patronymic}</p>
      </div>
    </>
  );
};

export default ClosedCard;

