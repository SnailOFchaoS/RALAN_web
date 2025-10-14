import React, { useRef, useEffect } from 'react';
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