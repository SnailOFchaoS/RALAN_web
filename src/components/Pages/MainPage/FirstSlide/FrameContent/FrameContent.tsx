import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMainPageContext } from '../../context';
import { frameContentAnimation } from '../animation';

import styles from './FrameContent.module.scss';

interface FrameComponentProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  children: React.ReactNode;
  onContainerReady: (rect: DOMRect) => void;
  frameContainerRef: React.RefObject<HTMLDivElement | null>;
  // timeLine: gsap.core.Timeline | undefined,
}

const FrameComponent = ({ 
  topContent, 
  bottomContent, 
  children, 
  onContainerReady, 
  frameContainerRef,
  // timeLine,
}: FrameComponentProps) => {
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);

  let context = useMainPageContext()

  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);
  
  useEffect(()=> {
    const logoRect = topContentRef.current?.getBoundingClientRect();
    if(!context.firstSlideTimeline || !bottomContentRef || !logoRect || !context) return;

    const logoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: topContentRef.current,
        start: 'top top',
        end: '+=100px',
        scrub: 2,
        // markers: true,
      }
    })

    frameContentAnimation({
      context, 
      frameContainerRef, 
      bottomContentRef, 
      topContentRef,
      laptopScale: context.laptopScale,
    })

  },[context.firstSlideTimeline])

  // useEffect(() => {
  //   if(!topContentRef){
  //     return;
  //   }
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {

  //         if (!entry.isIntersecting) {
  //           if(context && context.setIsMenuVisible){
  //             context.setIsMenuVisible(true)
  //           }
  //         }
  //         else{
  //           if(context && context.setIsMenuVisible){
  //             context.setIsMenuVisible(false)
  //           }
  //         }
  //       });
  //     },
  //     {
  //       root: null,
  //       rootMargin: '0px',
  //       threshold: 0,
  //     }
  //   );

  //   const target = topContentRef.current;
  //   if (target) {
  //     observer.observe(target);
  //   }

  //   return () => {
  //     if (target) {
  //       observer.unobserve(target);
  //     }
  //   };
  // }, []);

  return (
    <div className={styles.frameContainer} ref={frameContainerRef}>
      <div className={styles.topElement} ref={topContentRef}>
        {topContent}
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