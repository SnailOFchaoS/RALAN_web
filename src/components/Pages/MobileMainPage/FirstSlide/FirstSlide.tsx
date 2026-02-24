import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from "next/image";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
import Modal from '@/components/Common/Modal/Modal';
import ContactFormModal from '@/components/Common/ContactFormModal/ContactFormModal';
import LogoBlock from './LogoBlock/LogoBlock';
import ActionButton from './ActionButton/ActionButton';
import { createMobileAnimations } from './animation';
import { RectData, AnimationPhase, AnimationTimelines } from './animation.types';

import styles from "./FirstSlide.module.scss";

let savedScrollY = 0;

const lockScroll = () => {
  savedScrollY = window.scrollY;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
};

const unlockScroll = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
  document.body.style.overscrollBehavior = '';
  document.documentElement.style.overscrollBehavior = '';
  window.scrollTo(0, savedScrollY);
};

const FirstSlide = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);
  const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);
  const [logoBlockRect, setLogoBlockRect] = useState<RectData | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number | null>(null);
  
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(0);
  const animationPhaseRef = useRef<AnimationPhase>(0);
  const isAnimatingRef = useRef(false);
  const timelinesRef = useRef<AnimationTimelines | null>(null);
  
  const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
  const backgroundWrapperRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const frameContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLDivElement>(null);
  const logoBlockRef = useRef<HTMLDivElement>(null);
  const actionButtonRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = useCallback(() => {
    setIsModalOpened(true);
    setOnCloseClick(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(() => {
    setFixedHeight(window.innerHeight);
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!fixedHeight) return;
    
    requestAnimationFrame(() => {
      if (frameContainerRef.current) {
        const rect = frameContainerRef.current.getBoundingClientRect();
        setFrameContainerRect({
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
      
      if (logoBlockRef.current) {
        const rect = logoBlockRef.current.getBoundingClientRect();
        setLogoBlockRect({
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    });
  }, [fixedHeight]);

  useEffect(() => {
    if (
      !backgroundWrapperRef.current ||
      !backgroundImageRef.current ||
      !darkOverlayRef.current ||
      !firstSlideWrapperRef.current ||
      !frameContainerRef.current ||
      !frameContainerRect ||
      !logoBlockRect ||
      !titleTextRef.current ||
      !infoTextRef.current ||
      !fixedHeight
    ) {
      return;
    }

    const wrapperRect = firstSlideWrapperRef.current.getBoundingClientRect();

    timelinesRef.current = createMobileAnimations({
      titleTextRef,
      infoTextRef,
      backgroundWrapperRef,
      darkOverlayRef,
      frameContainerRef,
      logoBlockRef,
      actionButtonRef,
      frameContainerRect,
      logoBlockRect,
      screenHeight: fixedHeight,
      screenWidth: wrapperRect.width,
    });

    return () => {
      if (timelinesRef.current) {
        timelinesRef.current.phase1Timeline.kill();
        timelinesRef.current.phase2Timeline.kill();
      }
    };
  }, [frameContainerRect, logoBlockRect, fixedHeight]);

  useEffect(() => {
    if (!timelinesRef.current || !firstSlideWrapperRef.current) return;

    const { phase1Timeline, phase2Timeline } = timelinesRef.current;
    
    let touchStartY = 0;
    let isTouchActive = false;
    let currentSwipeDirection: 'up' | 'down' | null = null;
    let animationTriggered = false;
    const SWIPE_THRESHOLD = 30;

    const handleScrollDown = () => {
      if (isAnimatingRef.current) return;

      const currentPhase = animationPhaseRef.current;

      if (currentPhase === 0) {
        isAnimatingRef.current = true;
        phase1Timeline.play().then(() => {
          animationPhaseRef.current = 1;
          setAnimationPhase(1);
          isAnimatingRef.current = false;
          if (isTouchActive && currentSwipeDirection === 'down') {
            handleScrollDown();
          }
        });
      } else if (currentPhase === 1) {
        isAnimatingRef.current = true;
        animationPhaseRef.current = 2;
        setAnimationPhase(2);
        phase2Timeline.play().then(() => {
          isAnimatingRef.current = false;
          unlockScroll();
        });
      }
    };

    const handleScrollUp = () => {
      if (isAnimatingRef.current) return;

      const currentPhase = animationPhaseRef.current;

      if (currentPhase === 2) {
        lockScroll();
        isAnimatingRef.current = true;
        setAnimationPhase(1);
        animationPhaseRef.current = 1;
        phase2Timeline.reverse().then(() => {
          isAnimatingRef.current = false;
          if (isTouchActive && currentSwipeDirection === 'up') {
            handleScrollUp();
          }
        });
      } else if (currentPhase === 1) {
        isAnimatingRef.current = true;
        phase1Timeline.reverse().then(() => {
          animationPhaseRef.current = 0;
          setAnimationPhase(0);
          isAnimatingRef.current = false;
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const phase = animationPhaseRef.current;

      if (isAnimatingRef.current) return;

      if (e.deltaY > 0 && phase < 2) {
        e.preventDefault();
        handleScrollDown();
      } else if (e.deltaY < 0 && phase > 0) {
        if (phase === 2 && window.scrollY > 0) {
          return;
        }
        e.preventDefault();
        handleScrollUp();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
      currentSwipeDirection = null;
      animationTriggered = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const phase = animationPhaseRef.current;
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;

      if (phase < 2) {
        e.preventDefault();
      }
      if (deltaY < 0 && phase === 2 && window.scrollY <= 0) {
        e.preventDefault();
      }

      if (deltaY > SWIPE_THRESHOLD) {
        currentSwipeDirection = 'down';
        if (!animationTriggered && phase < 2) {
          animationTriggered = true;
          handleScrollDown();
        }
      } else if (deltaY < -SWIPE_THRESHOLD) {
        currentSwipeDirection = 'up';
        if (!animationTriggered && phase > 0) {
          if (phase === 2 && window.scrollY > 0) {
            return;
          }
          animationTriggered = true;
          handleScrollUp();
        }
      }
    };

    const handleTouchEnd = () => {
      isTouchActive = false;
      currentSwipeDirection = null;
      animationTriggered = false;
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [frameContainerRect, logoBlockRect]);

  return (
    <div 
      className={styles.firstSlideWrapper} 
      ref={firstSlideWrapperRef}
      style={fixedHeight ? { height: `${fixedHeight}px`, minHeight: `${fixedHeight}px` } : undefined}
    >
      <div className={styles.backgroundWrapper} ref={backgroundWrapperRef}>
        <div className={styles.backgroundImage} ref={backgroundImageRef}>
          <Image
            src={fistSlidePhoto}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "55% center" }}
            priority
          />
        </div>
        <div className={styles.darkOverlay} ref={darkOverlayRef} />
      </div>

      <div className={styles.contentWrapper}>
        <LogoBlock ref={logoBlockRef} />
        <div className={styles.frameContainer} ref={frameContainerRef}>
          <div className={styles.mainContent}>
            <div className={styles.titleText} ref={titleTextRef}>
              <span>Подготовка</span>
              <span>Стратегия</span>
              <span>Победа</span>
            </div>
            
            <div className={styles.infoText} ref={infoTextRef}>
              <p>Поможем раскрыть ваш потенциал и достичь поставленных целей.</p>
              <p>Начните тренировки сейчас.</p>
            </div>
          </div>

          <ActionButton onClick={handleOpenModal} ref={actionButtonRef} />
        </div>
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

export default FirstSlide;
