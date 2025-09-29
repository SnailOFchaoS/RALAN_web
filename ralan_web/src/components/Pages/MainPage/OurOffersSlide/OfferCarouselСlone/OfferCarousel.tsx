import React, { useState, useRef, useEffect } from 'react';
import styles from './OfferCarousel.module.scss';
import CarouselSlide from './CarouselSlider/CarouselSlider';

const SLIDER_DATA = [
  { id: 1, title: "Слайд 1", description: "Описание слайда 1" },
  { id: 2, title: "Слайд 2", description: "Описание слайда 2" },
  { id: 3, title: "Слайд 3", description: "Описание слайда 3" },
  { id: 4, title: "Слайд 4", description: "Описание слайда 4" },
  { id: 5, title: "Слайд 5", description: "Описание слайда 5" },
];

const MySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState<number>(0)
  const sliderRef = useRef<any>(null);
  const slideRef = useRef<any>(null);

  const slideCount = SLIDER_DATA.length;

  const nextSlide = () => {
    console.log("nextSlide:")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const transformValue = -((currentIndex - 1) * slideWidth) + 40 + 'px';

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
        {SLIDER_DATA.map((item, index) => (
          <div
            style={{
              minWidth: '389px',
              minHeight: '100%',
            }}
          >
            <div
              key={item.id}
              className={`${styles.slide} 
                ${index === currentIndex ? styles.active : ''} 
                ${index === (currentIndex - 1 + slideCount) % slideCount ? styles.prev : ''} 
                ${index === (currentIndex + 1) % slideCount ? styles.next : ''}
                ${!(index === (currentIndex + 1) || index === (currentIndex - 1) || index === currentIndex) ? styles.nonVisible : ''}
              `}
              ref={index === 0 ? slideRef : null}
            >
              <CarouselSlide/>
            </div>
          </div>
          
        ))}
      </div>
      <button className={`${styles["slider-button"]} ${styles.prev}`} onClick={prevSlide}>
        &lt;
      </button>
      <button className={`${styles["slider-button"]} ${styles.next}`} onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default MySlider;