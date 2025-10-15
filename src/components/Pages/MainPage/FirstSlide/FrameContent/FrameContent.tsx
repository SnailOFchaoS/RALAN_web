import React, { useRef, useEffect, useState } from 'react';
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {

            if(context && context.setIsMenuVisible){
              context.setIsMenuVisible(false)
            }

            console.log("topElement became visible")
          } else{
            if(context && context.setIsMenuVisible){
              context.setIsMenuVisible(true)
            }
            console.log("topElement became invisible")
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

  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);
  
  useEffect(()=> {
    if(!timeLine || !bottomContentRef) return;

    frameContentAnimation({
      timeLine, 
      frameContainerRef, 
      bottomContentRef, 
      topContentRef
    })

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