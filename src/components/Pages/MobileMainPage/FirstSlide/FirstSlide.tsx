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

const lockScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = '0';
};

const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
};

const FirstSlide = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);
  const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);
  const [logoBlockRect, setLogoBlockRect] = useState<RectData | null>(null);
  
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
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
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
  }, []);

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
      !infoTextRef.current
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
      screenHeight: wrapperRect.height,
      screenWidth: wrapperRect.width,
    });

    return () => {
      if (timelinesRef.current) {
        timelinesRef.current.phase1Timeline.kill();
        timelinesRef.current.phase2Timeline.kill();
      }
    };
  }, [frameContainerRect, logoBlockRect]);

  useEffect(() => {
    if (!timelinesRef.current || !firstSlideWrapperRef.current) return;

    const { phase1Timeline, phase2Timeline } = timelinesRef.current;

    const handleScrollDown = () => {
      if (isAnimatingRef.current) return;

      const currentPhase = animationPhaseRef.current;

      if (currentPhase === 0) {
        isAnimatingRef.current = true;
        phase1Timeline.play().then(() => {
          animationPhaseRef.current = 1;
          isAnimatingRef.current = false;
        });
      } else if (currentPhase === 1) {
        isAnimatingRef.current = true;
        phase2Timeline.play().then(() => {
          animationPhaseRef.current = 2;
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
        phase2Timeline.reverse().then(() => {
          animationPhaseRef.current = 1;
          isAnimatingRef.current = false;
        });
      } else if (currentPhase === 1) {
        isAnimatingRef.current = true;
        phase1Timeline.reverse().then(() => {
          animationPhaseRef.current = 0;
          isAnimatingRef.current = false;
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const phase = animationPhaseRef.current;

      if (isAnimatingRef.current) return;

      if (e.deltaY > 0 && phase < 2) {
        handleScrollDown();
      }

      else if (e.deltaY < 0 && phase > 0) {
        if (phase === 2 && window.scrollY > 0) {
          return;
        }
        handleScrollUp();
      }
    };

    let touchStartY = 0;
    const SWIPE_THRESHOLD = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const phase = animationPhaseRef.current;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (isAnimatingRef.current) return;

      if (deltaY > SWIPE_THRESHOLD && phase < 2) {
        handleScrollDown();
      }

      else if (deltaY < -SWIPE_THRESHOLD && phase > 0) {
        if (phase === 2 && window.scrollY > 0) {
          return;
        }
        handleScrollUp();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [frameContainerRect, logoBlockRect]);

  return (
    <div className={styles.firstSlideWrapper} ref={firstSlideWrapperRef}>
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
