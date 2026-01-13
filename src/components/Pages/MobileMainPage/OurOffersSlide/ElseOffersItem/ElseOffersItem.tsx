import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';

import { ElseOfferInterface } from '@/components/Common/types';
import styles from './ElseOffersItem.module.scss';
import ElseOfferInfo from './ElseOfferInfo/ElseOfferInfo';

interface ElseOffersItemProps {
  mirror?: boolean;
  data: ElseOfferInterface;
  onDetailsClick: () => void;
}

const ElseOffersItem: React.FC<ElseOffersItemProps> = ({ mirror = false, data, onDetailsClick }) => {
  const [isOpened, setIsOpened] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<GSAPTween | null>(null);

  const scaledValues = useMemo(() => ({
    borderWidth: 2,
    contentHeight: 500,
    contentMarginTop: 12,
  }), []);

  useEffect(() => {
    if (!contentRef.current) return;

    animationRef.current = gsap.fromTo(contentRef.current, {
      height: 0,
      opacity: 1,
      marginTop: 0,
    }, {
      height: scaledValues.contentHeight,
      opacity: 1,
      marginTop: scaledValues.contentMarginTop,
      duration: 0.4,
      ease: "power2.out",
      paused: true,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [scaledValues.contentHeight, scaledValues.contentMarginTop]);

  useEffect(() => {
    if (!animationRef.current) return;

    if (isOpened) {
      animationRef.current.play();
    } else {
      animationRef.current.reverse();
    }
  }, [isOpened]);

  useEffect(() => {
    if (!arrowRef.current) return;
    
    gsap.to(arrowRef.current, {
      rotation: isOpened ? 180 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isOpened]);

  const handleClick = useCallback(() => {
    setIsOpened(prev => !prev);
  }, []);

  return (
    <div className={styles.elseOffersWrapper}>
      <div 
        className={styles.titleWrapper}
        onClick={handleClick}
        style={{
          borderBottom: isOpened ? 'none' : `${scaledValues.borderWidth}px solid #A8DADC`,
        }}
      >
        <div className={styles.textBlock}>
          <div className={styles.subtitle}>а также</div>
          <p className={styles.title}>{data.title}</p>
        </div>
        <div className={styles.arrowWrapper}>
          <div 
            ref={arrowRef}
            className={styles.arrowIcon}
          />
        </div>
      </div>
      <div 
        ref={contentRef} 
        style={{ 
          overflow: 'hidden', 
          height: 0, 
          opacity: 0,
          marginTop: 0,
        }}
      >
        <ElseOfferInfo 
          mirror={mirror} 
          data={data}
          onDetailsClick={onDetailsClick}
        />
      </div>
    </div>
  );
};

export default ElseOffersItem;

