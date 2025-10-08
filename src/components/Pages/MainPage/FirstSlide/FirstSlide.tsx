import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
import FrameComponent from "./FrameContent/FrameContent";
import TopContent from "./TopContent/TopContent"
import BottomContent from "./BottomContent/BottomContent";
import { useMainPageContext } from '../context';

import styles from "./FirstSlide.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface RectData {
    top: number;
    left: number;
    width: number;
    height: number;
}

const FirstSlide = () => {
  const mainImageRef = useRef<HTMLDivElement>(null);
  const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
  const frameContainerRef = useRef<HTMLDivElement>(null); // Добавили ref для frameContainer
  const laptopScale = useMainPageContext();

  const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);

  const firstSlideWrapper = firstSlideWrapperRef.current;

  useEffect(() => {
    if (
      !mainImageRef.current ||
      !firstSlideWrapperRef.current ||
      !frameContainerRect ||
      !frameContainerRef.current //  Теперь ждем frameContainerRef
    ) {
      return;
    }

    const mainImage = mainImageRef.current;
    const firstSlideWrapper = firstSlideWrapperRef.current;

    const preventScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const allowScroll = () => {
      document.body.style.overflow = '';
    };

    console.log("frameContainerRect:", frameContainerRect)

    gsap.to(mainImage, {
      scrollTrigger: {
        trigger: firstSlideWrapper,
        start: "top top",
        end: "+=500vh",
        pin: true,
        scrub: 2,
        onEnter: () => {
          preventScroll();
        },
        onLeave: () => {
          allowScroll();
        },
        onLeaveBack: () => {
          allowScroll();
        },
      },
      scaleX: frameContainerRect.width / mainImage.offsetWidth, // Масштабируем по ширине
      scaleY: frameContainerRect.height / mainImage.offsetHeight, 
      transformOrigin: `${frameContainerRect.top + frameContainerRect.width/2 + 16}px ${frameContainerRect.height/2}px`,
      // Вычисляем top и left пропорционально ширине
      // width: frameContainerRect.width,
      // height: frameContainerRect.height,
      borderRadius: `${100}px`,
      immediateRender: false,
      onComplete: () => {
        allowScroll();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [
    frameContainerRect?.width,
    frameContainerRect?.height,
    laptopScale,
    frameContainerRef
  ]);

  // Callback для FrameComponent
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
      <div className={styles.mainImage} ref={mainImageRef}>
        <Image
          src={fistSlidePhoto}
          alt=''
          fill={true}
          className={styles.image}
        />
      </div>
      <div className={styles.contentWrapper}>
        {/* передаем ref для frameContainer */}
        <FrameComponent
          topContent={<TopContent />}
          bottomContent={<BottomContent />}
          onContainerReady={handleContainerReady}
          frameContainerRef={frameContainerRef} 
        >
          <div className={styles.mainContent} >
            <div className={styles.titleText}>
              ПОДГОТОВКА, СТРАТEГИЯ, ПОБЕДА
            </div>
            <div className={styles.infoText}>
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