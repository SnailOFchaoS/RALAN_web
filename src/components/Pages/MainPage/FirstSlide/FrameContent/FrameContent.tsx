import React, { useRef, useEffect, use } from 'react';
import gsap from "gsap";
import { useMainPageContext } from '../../context';

import styles from './FrameContent.module.scss';


interface FrameComponentProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  children: React.ReactNode;
  onContainerReady: (rect: DOMRect) => void;
  frameContainerRef: React.RefObject<HTMLDivElement | null>; // Добавили новый propgsap.Timeline
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
  const laptopScale = useMainPageContext().laptopScale;
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);
  

  useEffect(()=> {
    console.log("timeLine", timeLine)

    if(!timeLine || !bottomContentRef) return;
    const rect = frameContainerRef.current?.getBoundingClientRect();
    console.log('rect:', rect)
    if(!rect) return;

    timeLine.to(frameContainerRef.current, {
      width: 0,
      height: 0,
      y: `${rect?.height / 2 }px`,
    }, "<")

    timeLine.to(bottomContentRef.current, {
      width: 0,
    }, "<")

    timeLine.to(topContentRef.current, {
      scale: 2,
      ease: "power2.inOut"
    }, "<")


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