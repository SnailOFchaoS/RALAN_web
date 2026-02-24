import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import Modal from '@/components/Common/Modal/Modal';
import ContactFormModal from '@/components/Common/ContactFormModal/ContactFormModal';
import { useAppDispatch, useAppSelector } from '@/components/Common/hooks/ReduxHooks';
import { fetchOffers, setInitialOffers } from '@/store/slices/Offers';
import type { Offer } from '@/store/slices/Offers/types';

import CarouselSlide from './CarouselSlide/CarouselSlide';
import { SLIDE_WIDTH, SLIDE_GAP, CONTAINER_WIDTH, MIN_SCALE, PEEK_OFFSET } from './OfferCarousel.constants';
import styles from './OfferCarousel.module.scss';

const sortOffers = (list: Offer[]) =>
  [...list].sort((a, b) => {
    const aImportant = a.important === true ? 1 : 0;
    const bImportant = b.important === true ? 1 : 0;
    if (bImportant !== aImportant) return bImportant - aImportant;
    return a.price - b.price;
  });

interface OfferCarouselProps {
  initialOffers?: Offer[];
}

const OfferCarousel = ({ initialOffers = [] }: OfferCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startScrollPosition, setStartScrollPosition] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);
  
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const snapAnimationRef = useRef<number | null>(null);
  const dragThreshold = 5;

  const { offers } = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const sortedOffers = useMemo(() => sortOffers(offers), [offers]);
  const offersForCarousel = sortedOffers.length > 0 ? sortedOffers : initialOffers;

  const itemWidth = SLIDE_WIDTH + SLIDE_GAP;
  const totalWidth = offersForCarousel.length * itemWidth;

  const leftEdge = (CONTAINER_WIDTH - SLIDE_WIDTH) / 2;
  const rightEdge = CONTAINER_WIDTH - leftEdge;

  const allSlides = useMemo(() => {
    return [...offersForCarousel, ...offersForCarousel];
  }, [offersForCarousel]);

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

  useEffect(() => {
    if (initialOffers.length > 0 && offers.length === 0) {
      dispatch(setInitialOffers(initialOffers));
    }
    dispatch(fetchOffers());
  }, [dispatch]);

  const snapToNearestSlide = useCallback((currentPosition: number) => {
    if (offersForCarousel.length === 0) return;

    const nearestIndex = Math.round(currentPosition / itemWidth);
    const targetPosition = nearestIndex * itemWidth;

    let normalizedTarget = targetPosition;
    while (normalizedTarget < 0) {
      normalizedTarget += totalWidth;
    }
    while (normalizedTarget >= totalWidth) {
      normalizedTarget -= totalWidth;
    }

    const startPosition = currentPosition;
    const startTime = performance.now();
    const duration = 300;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      let diff = normalizedTarget - startPosition;
      if (Math.abs(diff) > totalWidth / 2) {
        if (diff > 0) {
          diff = diff - totalWidth;
        } else {
          diff = diff + totalWidth;
        }
      }
      
      let newPosition = startPosition + diff * easeOut;

      while (newPosition < 0) {
        newPosition += totalWidth;
      }
      while (newPosition >= totalWidth) {
        newPosition -= totalWidth;
      }
      
      setScrollPosition(newPosition);

      if (progress < 1) {
        snapAnimationRef.current = requestAnimationFrame(animate);
      }
    };

    if (snapAnimationRef.current) {
      cancelAnimationFrame(snapAnimationRef.current);
    }
    snapAnimationRef.current = requestAnimationFrame(animate);
  }, [itemWidth, totalWidth, offersForCarousel.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (snapAnimationRef.current) {
      cancelAnimationFrame(snapAnimationRef.current);
    }
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setStartX(e.touches[0].clientX);
    setStartScrollPosition(scrollPosition);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = startX - currentX;

    if (Math.abs(deltaX) > dragThreshold) {
      hasDraggedRef.current = true;
    }
    
    let newPosition = startScrollPosition + deltaX;

    while (newPosition < 0) {
      newPosition += totalWidth;
    }
    while (newPosition >= totalWidth) {
      newPosition -= totalWidth;
    }
    
    setScrollPosition(newPosition);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    snapToNearestSlide(scrollPosition);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (snapAnimationRef.current) {
      cancelAnimationFrame(snapAnimationRef.current);
    }
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setStartX(e.clientX);
    setStartScrollPosition(scrollPosition);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = startX - e.clientX;

    if (Math.abs(deltaX) > dragThreshold) {
      hasDraggedRef.current = true;
    }
    
    let newPosition = startScrollPosition + deltaX;

    while (newPosition < 0) {
      newPosition += totalWidth;
    }
    while (newPosition >= totalWidth) {
      newPosition -= totalWidth;
    }
    
    setScrollPosition(newPosition);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    snapToNearestSlide(scrollPosition);
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      snapToNearestSlide(scrollPosition);
    }
  };

  const handleSlideClick = (index: number) => {
    if (hasDraggedRef.current) {
      return;
    }
    handleOpenModal();
  };

  const getItemStyle = (index: number) => {
    const baseX = index * itemWidth - scrollPosition + leftEdge;
    const itemLeft = baseX;
    const itemRight = baseX + SLIDE_WIDTH;
    
    let scale = 1;
    let zIndex = 100;
    let translateX = baseX;
    let transformOrigin = 'center center';
    
    if (itemLeft < leftEdge) {
      const distancePastLeft = leftEdge - itemLeft;
      const progress = distancePastLeft / itemWidth;
      const clampedProgress = Math.min(progress, 2);

      translateX = leftEdge - PEEK_OFFSET * Math.min(clampedProgress, 1);
      transformOrigin = 'right center';
      
      if (progress <= 1) {
        scale = 1 - progress * (1 - MIN_SCALE);
      } else {
        const extraProgress = progress - 1;
        scale = MIN_SCALE - extraProgress * (MIN_SCALE - 0.3);
        scale = Math.max(scale, 0.3);
      }
      zIndex = Math.round(50 - clampedProgress * 25);
    }

    if (itemRight > rightEdge) {
      const distancePastRight = itemRight - rightEdge;
      const progress = distancePastRight / itemWidth;
      const clampedProgress = Math.min(progress, 2);

      translateX = leftEdge + PEEK_OFFSET * Math.min(clampedProgress, 1);
      transformOrigin = 'left center';
      
      if (progress <= 1) {
        scale = 1 - progress * (1 - MIN_SCALE);
      } else {

        const extraProgress = progress - 1;
        scale = MIN_SCALE - extraProgress * (MIN_SCALE - 0.3);
        scale = Math.max(scale, 0.3);
      }
      zIndex = Math.round(50 - clampedProgress * 25);
    }

    const distanceFromCenter = Math.abs(baseX + SLIDE_WIDTH / 2 - CONTAINER_WIDTH / 2);
    const isVisible = distanceFromCenter < itemWidth * 2.5;

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex,
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? 1 : 0,
      transformOrigin,
    } as React.CSSProperties;
  };

  useEffect(() => {
    return () => {
      if (snapAnimationRef.current) {
        cancelAnimationFrame(snapAnimationRef.current);
      }
    };
  }, []);

  if (offersForCarousel.length === 0) return null;

  return (
    <div 
      className={styles.carouselContainer}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.track}>
        {allSlides.map((item, index) => (
          <div
            key={`slide-${index}`}
            className={styles.slide}
            style={getItemStyle(index)}
            onClick={() => handleSlideClick(index)}
          >
            <CarouselSlide
              offer={item}
              onDetailsClick={handleOpenModal}
              isActive={true}
            />
          </div>
        ))}
      </div>
      
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
