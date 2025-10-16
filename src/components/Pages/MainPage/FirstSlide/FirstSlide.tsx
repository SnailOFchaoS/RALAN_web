import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from "next/image";
import gsap from "gsap";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
import FrameComponent from "./FrameContent/FrameContent";
import TopContent from "./TopContent/TopContent"
import BottomContent from "./BottomContent/BottomContent";
import { useMainPageContext } from '../context';
import { firstSlideAnimation, getScrollTriggerOptions } from './animation';

import styles from "./FirstSlide.module.scss";

interface RectData {
    top: number;
    left: number;
    width: number;
    height: number;
}

const FirstSlide = () => {
  const mainImageRef = useRef<HTMLDivElement>(null);
  const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
  const frameContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLDivElement>(null);
  const context = useMainPageContext();
  const laptopScale = context?.laptopScale ?? 1;

  // const [currentTimeLine, setCurrentTimeLine] = useState<gsap.core.Timeline | null>(null)
  const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);

  useEffect(() => {
    if (
      !mainImageRef.current ||
      !firstSlideWrapperRef.current ||
      !frameContainerRect ||
      !frameContainerRef.current
    ) {
      return;
    }

    const firstSlideWrapper = firstSlideWrapperRef.current;

    const scrollTriggerOptions = getScrollTriggerOptions({context, firstSlideWrapper, laptopScale});
    
    const timeLine = gsap.timeline({
      scrollTrigger:{...scrollTriggerOptions}
    });
    
    if (context && context.setFirstSlideTimeline) {
      context.setFirstSlideTimeline(timeLine);
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [
    frameContainerRect?.width,
    frameContainerRect?.height,
    frameContainerRef,
  ]);

  useEffect(()=> {
    if(context.firstSlideTimeline){

      if(!mainImageRef.current || !frameContainerRect) return;

      firstSlideAnimation({
        context, 
        titleTextRef, 
        infoTextRef, 
        mainImage: mainImageRef.current, 
        frameContainerRect,
        laptopScale,
      })
  
    }
  }, [
    context.firstSlideTimeline
  ])

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
          className={styles.image}
          style={{objectFit: "cover"}}
        />
      </div>
      <div className={styles.contentWrapper}>
        <FrameComponent
          topContent={<TopContent />}
          bottomContent={<BottomContent />}
          onContainerReady={handleContainerReady}
          frameContainerRef={frameContainerRef} 
          // timeLine={context.firstSlideTimeline}
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
