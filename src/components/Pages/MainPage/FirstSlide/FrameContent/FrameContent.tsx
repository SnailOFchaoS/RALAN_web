import React, { useRef, useEffect } from 'react';
import styles from './FrameContent.module.scss';

interface FrameComponentProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  children: React.ReactNode;
  onContainerReady: (rect: DOMRect) => void;
  frameContainerRef: React.RefObject<HTMLDivElement | null>; // Добавили новый prop
}

const FrameComponent = ({ topContent, bottomContent, children, onContainerReady, frameContainerRef }: FrameComponentProps) => {
  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);

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