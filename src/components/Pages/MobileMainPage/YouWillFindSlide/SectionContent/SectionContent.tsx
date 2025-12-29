import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import { SectionContentProps } from './SectionContent.types';

import styles from './SectionContent.module.scss';

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  isOpened
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const textColor = section.openedColor !== '#FFFFF0' ? '#FFFFF0' : '#1A2344';

  useEffect(() => {
    if (!contentRef.current) return;

    animationRef.current = gsap.fromTo(
      contentRef.current,
      {
        height: 0,
      },
      {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.out',
        paused: true
      }
    );

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!animationRef.current) return;

    if (isOpened) {
      animationRef.current.play();
    } else {
      animationRef.current.reverse();
    }
  }, [isOpened]);

  return (
    <div
      ref={contentRef}
      className={styles.sectionContentWrapper}
      style={{ 
        backgroundColor: section.openedColor, 
        marginTop: isOpened ? '7px' : '0px'
      }}
    >
      <div className={styles.infoGrid}>
        {section.textInfo.map((info, index) => (
          <div key={index} className={styles.infoItem}>
            <p className={styles.infoTitle} style={{ color: textColor }}>
              {info.title}
            </p>
            <p className={styles.infoText} style={{ color: textColor }}>
              {info.text}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={section.image}
          alt={section.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default SectionContent;

