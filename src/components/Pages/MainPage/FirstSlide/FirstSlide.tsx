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
  const frameContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLDivElement>(null);
  const laptopScale = useMainPageContext()?.laptopScale ?? 1;

  const [currentTimeLine, setCurrentTimeLine] = useState<gsap.core.Timeline | null>(null)
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

    const mainImage = mainImageRef.current;
    const firstSlideWrapper = firstSlideWrapperRef.current;

    const preventScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const allowScroll = () => {
      document.body.style.overflow = '';
    };

    const scrollTriggerOptions = {
      trigger: firstSlideWrapper,
      start: "top top",
      end: `+=${1400 * laptopScale}vh`,
      pin: true,
      scrub: 2,
      markers: true,

      onEnter: () => preventScroll(),
    }

    const timeLine = gsap.timeline({
      scrollTrigger:{...scrollTriggerOptions}
    });

    setCurrentTimeLine(timeLine)

    // if(!currentTimeLine) return;

    timeLine.to(titleTextRef.current, {opacity: 0,}, 0);
    timeLine.to(infoTextRef.current, {opacity: 0,}, 0);
    timeLine.to(mainImage, {
      x: frameContainerRect.left,
      y: frameContainerRect.top,
      width: frameContainerRect.width,
      height: frameContainerRect.height,
      borderRadius: `${100 * laptopScale}px`,
      immediateRender: false,
      onUpdate: function() {
        const brightnessValue = this.progress() * 0.5 + 0.5;
        (mainImage as HTMLElement).style.setProperty('filter', `brightness(${brightnessValue})`);
      },
    }, 0);

    timeLine.to(mainImage, {
      width: 0,
      height: 0,
    }, 1)


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
      <div className={styles.mainImage} ref={mainImageRef}>
        <Image
          src={fistSlidePhoto}
          alt=''
          // fill={true}
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
          timeLine={currentTimeLine}
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



      // onLeave: () => allowScroll(),
      // onLeave: () => { // <-- Добавляем колбэк onLeave
      //   handleFirstSlideLeave(); // Вызываем функцию для запуска второй анимации
      // },
      // onLeaveBack: () => allowScroll(),
      
      

// // FirstSlide.tsx
// import React, { useRef, useEffect } from 'react';
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { useMainPageContext } from '../../context';

// import styles from "./FirstSlide.module.scss";

// gsap.registerPlugin(ScrollTrigger);

// const FirstSlide = () => {
//   const mainImageRef = useRef<HTMLDivElement>(null);
//   const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
//   const titleTextRef = useRef<HTMLDivElement>(null);
//   const infoTextRef = useRef<HTMLDivElement>(null);
//   const laptopScale = useMainPageContext().laptopScale;

//   useEffect(() => {
//     if (!mainImageRef.current || !firstSlideWrapperRef.current || !titleTextRef.current || !infoTextRef.current) return;

//     const mainImage = mainImageRef.current;
//     const firstSlideWrapper = firstSlideWrapperRef.current;

//     const slideHeight = 700 * laptopScale;

//     const scrollTriggerOptions = {
//       trigger: firstSlideWrapper,
//       start: "top top",
//       end: `+=${slideHeight}vh`,
//       pin: true,
//       scrub: 2,
//       // markers: true // для отладки ScrollTrigger
//     };

//     gsap.to(titleTextRef.current, {
//       scrollTrigger: scrollTriggerOptions,
//       opacity: 0,
//     });

//     gsap.to(infoTextRef.current, {
//       scrollTrigger: scrollTriggerOptions,
//       opacity: 0,
//     });

//     const mainImageAnimation = gsap.to(mainImage, {
//       scrollTrigger: scrollTriggerOptions,
//       x: 100,
//       y: 100,
//       width: "50%",
//       height: "50%",
//       onUpdate: function() {
//         const brightnessValue = this.progress() * 0.5 + 0.5;
//         (mainImage as HTMLElement).style.setProperty('filter', `brightness(${brightnessValue})`);
//       },
//     });

//     //Сохраняем триггер
//     const firstSlideScrollTrigger = mainImageAnimation.scrollTrigger;
//     firstSlideScrollTrigger.addEventListener('onLeave',()=> {
//           console.log('first slide over')
//     })


//     return () => {
//       ScrollTrigger.getAll().forEach(st => st.kill());
//     };
//   }, [laptopScale]);

//   return (
//     <div className={styles.firstSlideWrapper} ref={firstSlideWrapperRef}>
//       <div className={styles.mainImage} ref={mainImageRef}>
        
//       </div>
//       <div className={styles.contentWrapper}>
//         <div className={styles.mainContent} ref={titleTextRef}>
//           <div className={styles.titleText}>
//             ПОДГОТОВКА, СТРАТEГИЯ, ПОБЕДА
//           </div>
//           <div className={styles.infoText} ref={infoTextRef}>
//             Поможем раскрыть ваш потенциал и достичь поставленных целей.<br/>
//             Начните тренировки сейчас.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FirstSlide;