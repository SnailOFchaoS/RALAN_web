import React, { useState, useRef, useEffect } from 'react';
import { useMainPageContext } from '../../context';

import CarouselSlide from './CarouselSlider/CarouselSlider';
import { offersAll } from '@/pages/api/mockData';
import styles from './OfferCarousel.module.scss';

const MySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState<number>(0)
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const laptopScale = useMainPageContext().laptopScale;

  const slideCount = offersAll.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const transformValue = -((currentIndex - 1) * slideWidth) + 40 * laptopScale + 'px';

  useEffect(()=> {
    if (slideRef.current) {
      setSlideWidth(slideRef.current.offsetWidth)
    }
  }, [slideRef.current])

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.sliderWrapper}
        ref={sliderRef}
        style={{ transform: `translateX(${transformValue})` }}
      >
        {offersAll.map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: `${389 * laptopScale}px`,
              minHeight: '100%',
            }}
          >
            <div
              className={`${styles.slide} 
                ${index === currentIndex ? styles.active : ''} 
                ${index === (currentIndex - 1 + slideCount) % slideCount ? styles.prev : ''} 
                ${index === (currentIndex + 1) % slideCount ? styles.next : ''}
                ${!(index === (currentIndex + 1) || index === (currentIndex - 1) || index === currentIndex) ? styles.nonVisible : ''}
              `}
              ref={index === 0 ? slideRef : null}
            >
              <CarouselSlide
                offer={item}
              />
            </div>
          </div>
        ))}
      </div>
      <button className={`${styles["slider-button"]} ${styles.prev}`} onClick={prevSlide} />
      <button className={`${styles["slider-button"]} ${styles.next}`} onClick={nextSlide} />
    </div>
  );
};

export default MySlider;