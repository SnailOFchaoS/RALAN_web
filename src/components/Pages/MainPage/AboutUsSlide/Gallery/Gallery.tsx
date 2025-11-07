import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GalleryImage from './GalleryImage/GalleryImage';
import styles from './Gallery.module.scss';

import image1 from '../../../../../../assets/png/galery_1.png';
import image2 from '../../../../../../assets/png/galery_2.png';
import image3 from '../../../../../../assets/png/galery_3.png';
import image4 from '../../../../../../assets/png/galery_4.png';
import image5 from '../../../../../../assets/png/galery_5.png';
import image6 from '../../../../../../assets/png/galery_6.png';
import image7 from '../../../../../../assets/png/galery_7.png';
import image8 from '../../../../../../assets/png/galery_8.png';
import image9 from '../../../../../../assets/png/galery_9.png';
import image10 from '../../../../../../assets/png/galery_10.png';
import image11 from '../../../../../../assets/png/galery_11.png';
import image12 from '../../../../../../assets/png/galery_12.png';

const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12
];

interface GalleryProps {
  prevViewport: string | null;
}

const Gallery = ({ prevViewport }: GalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimationPlay, setIsAnimationPlay] = useState<boolean>(false);
  const [isShowingAnimationComplete, setIsShowingAnimationComplete] = useState<boolean>(false)
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const batchTriggersRef = useRef<ScrollTrigger[] | null>(null);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    
    if (!items.length) return;
    
    if(prevViewport !== 'isBelowViewport') return;

    setIsShowingAnimationComplete(false)

    gsap.set(items, { opacity: 0, y: 132 });
    const triggers: ScrollTrigger[] = items.map((el, index) => {
      return ScrollTrigger.create({
        trigger: el,
        start: () => `bottom bottom-=${Math.min(index, 6) * 50}`,
        onEnter: () => {
          gsap.fromTo(el,{
            opacity: 0,
            y: 132,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              if(index === 6){
                setIsShowingAnimationComplete(true)
              }
            }
          });
        },
      });
    });

    batchTriggersRef.current = triggers;

    return () => {
      batchTriggersRef.current?.forEach((st) => st.kill());
      batchTriggersRef.current = null;
    };
  }, [prevViewport]);

  return (
    <div className={styles.gallery} ref={galleryRef}>
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) itemRefs.current[index] = el;
          }}
          style={{ 
            position: 'relative', 
            opacity: 0,
          }}
        >
          <GalleryImage
            image = {image}
            index = {index}
            hoveredIndex = {hoveredIndex}
            setHoveredIndex = {setHoveredIndex}
            isAnimationPlay = {isAnimationPlay}
            setIsAnimationPlay = {setIsAnimationPlay}
            isShowingAnimationComplete = {isShowingAnimationComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;