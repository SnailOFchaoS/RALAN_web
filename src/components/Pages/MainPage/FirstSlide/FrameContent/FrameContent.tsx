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

  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);
  

  useEffect(()=> {
    console.log("timeLine", timeLine)

    if(!timeLine) return;

    timeLine.to(frameContainerRef.current, {
      width: 0,
      height: 0,
    }, 1)
  },[timeLine])

  return (
    <div className={styles.frameContainer} ref={frameContainerRef}>
      <div className={styles.topElement}>
        {topContent}
      </div>
      <div className={styles.bottomElement}>
        {bottomContent}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default FrameComponent;