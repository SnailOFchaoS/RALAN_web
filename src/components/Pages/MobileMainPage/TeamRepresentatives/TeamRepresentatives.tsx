import { useState } from 'react';

import { representatives } from '@/pages/api/mockData';
import { personDataInterface } from '@/components/Common/types';
import OpenedCard from './OpenedCard/OpenedCard';
import ClosedCard from './ClosedCard/ClosedCard';
import { MOBILE_IMAGES_CONFIG } from './TeamRepresentatives.constants';

import styles from './TeamRepresentatives.module.scss';

const TeamRepresentatives: React.FC = () => {
  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenedIndexes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleCloseAll = () => {
    if (openedIndexes.length > 0) {
      setOpenedIndexes([]);
    }
  };

  return (
    <div className={styles.teamRepresentativesWrapper} onClick={handleCloseAll}>
      <h2 className={styles.title}>
        ПРЕДСТАВИТЕЛИ КОМАНДЫ
      </h2>
      
      <div className={styles.cardsContainer}>
        {representatives.map((person: personDataInterface, index) => {
          const imageConfig = MOBILE_IMAGES_CONFIG[index];
          const isOpened = openedIndexes.includes(index);
          
          return (
            <div 
              key={index} 
              className={`${styles.personCard} ${isOpened ? styles.opened : ''}`}
              onClick={(e) => handleCardClick(e, index)}
            >
              {isOpened ? (
                <OpenedCard person={person} imageConfig={imageConfig} />
              ) : (
                <ClosedCard person={person} imageConfig={imageConfig} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamRepresentatives;
