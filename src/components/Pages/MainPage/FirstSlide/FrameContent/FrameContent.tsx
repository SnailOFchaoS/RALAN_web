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
}

const FrameComponent = ({ 
  topContent, 
  bottomContent, 
  children, 
  onContainerReady, 
  frameContainerRef,
  timeLine,
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
    if(!timeLine || !bottomContentRef || !logoRect || !context) return;

    const logoTimeline = gsap.timeline();

    const logoScrollTrigger = ScrollTrigger.create({
      animation: logoTimeline,
      trigger: topContentRef.current,
      start: "top top",
      end: `${logoRect.height += 100}px`, 
      scrub: 2,
      markers: true,

      onLeave: () => {
        if(context && context.setIsMenuVisible){
          context.setIsMenuVisible(true)
        }
        if (topContentRef.current) {
          topContentRef.current.style.display = 'none';
        }
      },

      onEnterBack: () => {
        if(context && context.setIsMenuVisible){
          context.setIsMenuVisible(false)
        }
        if (topContentRef.current) {
          topContentRef.current.style.display = 'flex';
        }
      },
    });

    logoScrollTrigger.disable();

    frameContentAnimation({
      timeLine, 
      logoTimeline,
      frameContainerRef, 
      bottomContentRef, 
      topContentRef
    })

    timeLine.then(() => {
      console.log("Global timeline completed. Enabling logoTimeline ScrollTrigger.");
      logoScrollTrigger.enable();
      logoScrollTrigger.refresh();
  });

  },[timeLine])

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