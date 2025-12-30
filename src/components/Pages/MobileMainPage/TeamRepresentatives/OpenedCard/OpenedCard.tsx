import Image from 'next/image';

import { OpenedCardProps } from './OpenedCard.types';

import styles from './OpenedCard.module.scss';

const OpenedCard: React.FC<OpenedCardProps> = ({ person, imageConfig }) => {
  return (
    <div className={styles.openedContent}>
      <div className={styles.textSection}>
        <div className={styles.nameBlock}>
          <p className={styles.surname}>{person.name} </p>
          <p className={styles.fullName}>{person.surname.toUpperCase()}</p>
        </div>
        
        <p className={styles.quote}>{person.descriptionTop}</p>
        
        <div className={styles.achievements}>
          {person.achievements.map((achievement, i) => (
            <p key={i} className={styles.achievementItem}>
              — {achievement.text.toUpperCase()}
            </p>
          ))}
        </div>
        
        <p className={styles.description}>{person.descriptionBottom}</p>
      </div>
      
      <div className={styles.imageWrapper}>
        <Image
          src={imageConfig?.src || person.image.src}
          alt={`${person.surname} ${person.name}`}
          width={imageConfig?.openedWidth ?? 275}
          height={imageConfig?.openedHeight ?? 414}
          style={{
            position: 'absolute',
            top: imageConfig?.openedTop ?? -94,
            left: imageConfig?.openedLeft ?? -79
          }}
        />
      </div>
    </div>
  );
};

export default OpenedCard;

