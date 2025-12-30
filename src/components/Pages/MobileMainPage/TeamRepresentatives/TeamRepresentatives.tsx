import { useState } from 'react';

import { representatives } from '@/pages/api/mockData';
import { personDataInterface } from '@/components/Common/types';
import OpenedCard from './OpenedCard/OpenedCard';
import ClosedCard from './ClosedCard/ClosedCard';
import { ImageConfig } from './OpenedCard/OpenedCard.types';

import YanImage from '../../../../../assets/png/Yan.png';
import DariaMobileImage from '../../../../../assets/png/Daria_mobile.png';

import styles from './TeamRepresentatives.module.scss';

const mobileImagesConfig: ImageConfig[] = [
  {
    src: YanImage,
    width: 275,
    height: 414,
    top: -96,
    left: -54,
    openedWidth: 275,
    openedHeight: 414,
    openedTop: -94,
    openedLeft: -79
  },
  {
    src: DariaMobileImage,
    width: 528,
    height: 352,
    top: -32,
    left: -208,
    openedWidth: 599,
    openedHeight: 400,
    openedTop: -21,
    openedLeft: -255
  }
];

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
        ПРЕДСТАВИТЕЛИ<br/>КОМАНДЫ
      </h2>
      
      <div className={styles.cardsContainer}>
        {representatives.map((person: personDataInterface, index) => {
          const imageConfig = mobileImagesConfig[index];
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
