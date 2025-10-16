import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMainPageContext } from '../../context';
import { frameContentAnimation } from '../animation';

import styles from './FrameContent.module.scss';

interface FrameComponentProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  children: React.ReactNode;
  onContainerReady: (rect: DOMRect) => void;
  frameContainerRef: React.RefObject<HTMLDivElement | null>;
  timeLine: gsap.core.Timeline | null,
  isFinished: boolean,
}

const FrameComponent = ({ 
  topContent, 
  bottomContent, 
  children, 
  onContainerReady, 
  frameContainerRef,
  timeLine,
  isFinished,
}: FrameComponentProps) => {
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  // const logoElementRef = useRef<HTMLDivElement>(null);
  // const [topContentScrollTrigger, setTopContentScrollTrigger] = useState<any>(null)

  let context = useMainPageContext()
  // useEffect(()=> {
  //   if(topContentScrollTrigger){
  //     if(isFinished){
  //       topContentScrollTrigger.enable();
  //       topContentScrollTrigger.refresh();
  //     }else{
  //       topContentScrollTrigger.disable();
  //     } 
  //   }
  // }, [isFinished])


  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Обновляем состояние видимости topElement
          if(context.setIsMenuVisible){
            if(entry.isIntersecting) {
              console.log("topElement became visible")
              context.setIsMenuVisible(false)
            } else{
              console.log("topElement became invisible")
              context.setIsMenuVisible(true)
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    const topElement = topContentRef.current;
    if (topElement) {
      observer.observe(topElement);
    }

    return () => {
      if (topElement) {
        observer.unobserve(topElement);
      }
    };
  }, []);
  
  useEffect(()=> {
    const logoRect = topContentRef.current?.getBoundingClientRect();
    if(!timeLine || !bottomContentRef || !logoRect || !context) return;

    frameContentAnimation({
      timeLine, 
      // logoTimeline,
      frameContainerRef, 
      bottomContentRef, 
      topContentRef,
    })


    const topContentScrollTrigger = ScrollTrigger.create({
      trigger: topContentRef.current,
      pin: true,
      pinSpacing: false, // Отключаем добавление отступов
      pinReparent: true, // Перемещаем элемент в body во время закрепления
      start: self => {
        const previousTrigger = self.previous();
        if (previousTrigger) {
          return previousTrigger.end;
        } else {
          return "top top"; // Или любое другое значение по умолчанию
        }
      },
      end: "+=500", // Закрепление заканчивается через 500px прокрутки после start
      scrub: true,
      markers: true, // Для отладки self => self.previous().end, 
    })


    // timeLine.then(()=> {
    //   const topContentScrollTrigger = ScrollTrigger.create({
    //     trigger: topContentRef.current,
    //     pin: true,
    //     pinSpacing: false, // Отключаем добавление отступов
    //     pinReparent: true, // Перемещаем элемент в body во время закрепления
    //     start: "top top", // Закрепление начинается, когда верх элемента достигает верха окна просмотра
    //     end: "+=500", // Закрепление заканчивается через 500px прокрутки после start
    //     scrub: true,
    //     markers: true, // Для отладки
    //     // onEnterBack: ()=> {
    //     //   topContentScrollTrigger.kill();
    //     // }
    //   });
    // })
  //         topContentRef
  //   })

  //   timeLine.then(() => {
  //     console.log("Global timeline completed. Enabling logoTimeline ScrollTrigger.");
  //     topContentScrollTrigger.enable();
  //     topContentScrollTrigger.refresh();
  // });

  },[timeLine])

  return (
    <div className={styles.frameContainer} ref={frameContainerRef}>
      {/* <div className={styles.topContentContainer}> */}
        <div className={styles.topElement} ref={topContentRef}>
          {topContent}
        {/* </div> */}
      </div>
      <div className={styles.bottomElement} ref={bottomContentRef}>
        {bottomContent}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default FrameComponent;

    // const logoTimeline = gsap.timeline();

    // const logoScrollTrigger = ScrollTrigger.create({
    //   animation: logoTimeline,
    //   trigger: topContentRef.current,
    //   // pin: true,
    //   start: "top top",
    //   end: `${logoRect.height += 100}px`, 
    //   scrub: 2,
    //   markers: true,

    //   onLeave: () => {
    //     if(context && context.setIsMenuVisible){
    //       context.setIsMenuVisible(true)
    //     }
    //   },

    //   onEnterBack: () => {
    //     if(context && context.setIsMenuVisible){
    //       context.setIsMenuVisible(false)
    //     }
    //   },
    // });

    // logoScrollTrigger.disable();

      //   timeLine.then(() => {
  //     console.log("Global timeline completed. Enabling logoTimeline ScrollTrigger.");
  //     logoScrollTrigger.enable();
  //     logoScrollTrigger.refresh();
  // });


  // const logoTimeline = gsap.timeline();

  // const logoScrollTrigger = ScrollTrigger.create({
  //   animation: logoTimeline,
  //   trigger: topContentRef.current,
  //   start: "top top",
  //   end: `${logoRect.height += 100}px`, 
  //   scrub: 2,
  //   markers: true,

    
  // });

  // logoScrollTrigger.disable();
