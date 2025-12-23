import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import Modal from '@/components/Common/Modal/Modal';
import ContactFormModal from '@/components/Common/ContactFormModal/ContactFormModal';
import { useAppDispatch, useAppSelector } from '@/components/Common/hooks/ReduxHooks';
import { fetchOffers } from '@/store/slices/Offers';

import { useMainPageContext } from '../../context';
import CarouselSlide from './CarouselSlider/CarouselSlider';
import SlideWrapper from './SlideWrapper/SlideWrapper';
import styles from './OfferCarousel.module.scss';

const OfferCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const laptopScale = useMainPageContext().laptopScale;
  const { offers } = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const sortedOffers = useMemo(() => {
    return [...offers].sort((a, b) => a.price - b.price);
  }, [offers]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpened(true);
    setOnCloseClick(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(() => {
    if (isModalOpened) {
      setOnCloseClick(false);
    }
  }, [isModalOpened]);

  useEffect(()=>{
    dispatch(fetchOffers());
  }, [dispatch]);

  const slideCount = sortedOffers.length;

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
        {sortedOffers.map((item, index) => (
          <SlideWrapper
            key={index}
            index={index}
            currentIndex={currentIndex}
            slideCount={slideCount}
            laptopScale={laptopScale}
            innerRef={index === 0 ? slideRef : undefined}
          >
            {(isVisible: boolean) => (
              <CarouselSlide
                offer={item}
                onDetailsClick={handleOpenModal}
                isActive={isVisible}
              />
            )}
          </SlideWrapper>
        ))}
      </div>
      <button className={`${styles["slider-button"]} ${styles.prev}`} onClick={prevSlide} />
      <button className={`${styles["slider-button"]} ${styles.next}`} onClick={nextSlide} />
      
      <Modal isOpen={isModalOpened} onClose={handleCloseModal} needBgAnimation={true}>
        <ContactFormModal
          isOpen={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          onCloseClick={onCloseClick}
        />
      </Modal>
    </div>
  );
};

export default OfferCarousel;
