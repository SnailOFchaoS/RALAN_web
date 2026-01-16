import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
import Modal from '@/components/Common/Modal/Modal';
import ContactFormModal from '@/components/Common/ContactFormModal/ContactFormModal';
import LogoBlock from './LogoBlock/LogoBlock';
import ActionButton from './ActionButton/ActionButton';
import { mobileFirstSlideAnimation } from './animation';
import { RectData } from './animation.types';

import styles from "./FirstSlide.module.scss";

gsap.registerPlugin(ScrollTrigger);

const FirstSlide = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);
  const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);
  const [logoBlockRect, setLogoBlockRect] = useState<RectData | null>(null);
  
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

    const scrollTriggerOptions: ScrollTrigger.Vars = {
      trigger: firstSlideWrapperRef.current,
      start: "top top",
      end: "+=50%",
      pin: true,
      scrub: 3,
      fastScrollEnd: true,
      preventOverlaps: true,
    };

    const timeLine = gsap.timeline({
      scrollTrigger: { ...scrollTriggerOptions },
    });

    const wrapperRect = firstSlideWrapperRef.current.getBoundingClientRect();

    mobileFirstSlideAnimation({
      timeLine,
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
      ScrollTrigger.getAll().forEach(st => st.kill());
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
