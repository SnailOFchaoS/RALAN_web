import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
import FrameComponent from "./FrameContent/FrameContent";
import { useMainPageContext } from '../context';
import { firstSlideAnimation } from './animation';
import { RectData } from './animation.types';

import styles from "./FirstSlide.module.scss";

const FirstSlide = () => {
  const backgroundWrapperRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
  const frameContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLDivElement>(null);
  const laptopScale = useMainPageContext()?.laptopScale ?? 1;

  const [currentTimeLine, setCurrentTimeLine] = useState<gsap.core.Timeline | null>(null)
  const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);

  useEffect(() => {
    if (
      !backgroundWrapperRef.current ||
      !backgroundImageRef.current ||
      !firstSlideWrapperRef.current ||
      !frameContainerRect ||
      !frameContainerRef.current
    ) {
      return;
    }

    const firstSlideWrapper = firstSlideWrapperRef.current;

    const scrollTriggerOptions = {
      trigger: firstSlideWrapper,
      start: "top top",
      end: `+=${1400 * laptopScale}vh`,
      pin: true,
      scrub: 2,
    }

    const timeLine = gsap.timeline({
      scrollTrigger:{...scrollTriggerOptions},
    });

    setCurrentTimeLine(timeLine)

    firstSlideAnimation({
      timeLine, 
      titleTextRef, 
      infoTextRef, 
      backgroundWrapperRef,
      backgroundImageRef,
      frameContainerRect,
      laptopScale,
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [
    frameContainerRect?.width,
    frameContainerRect?.height,
    frameContainerRef,
  ]);

  const handleContainerReady = useCallback((rect: DOMRect) => {
    const roundedRect: RectData = {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
    setFrameContainerRect(roundedRect);
  }, []);

  return (
    <div className={styles.firstSlideWrapper} ref={firstSlideWrapperRef}>
      <div className={styles.backgroundWrapper} ref={backgroundWrapperRef}>
        <div className={styles.backgroundImage} ref={backgroundImageRef}>
          <Image
            src={fistSlidePhoto}
            alt=''
            className={styles.image}
            style={{objectFit: "cover"}}
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <FrameComponent
          onContainerReady={handleContainerReady}
          frameContainerRef={frameContainerRef} 
          timeLine={currentTimeLine}
          mainImageRef={backgroundWrapperRef}
        >
          <div className={styles.mainContent} >
            <div className={styles.titleText} ref={titleTextRef}>
              ПОДГОТОВКА, СТРАТEГИЯ, ПОБЕДА
            </div>
            <div className={styles.infoText} ref={infoTextRef}>
              Поможем раскрыть ваш потенциал и достичь поставленных целей.<br/>
              Начните тренировки сейчас.
            </div>
          </div>
        </FrameComponent>
      </div>
    </div>
  );
};

export default FirstSlide;
