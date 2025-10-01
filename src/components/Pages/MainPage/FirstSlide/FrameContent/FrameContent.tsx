import React from 'react';
import styles from './FrameContent.module.scss';

interface FrameComponentProps {
  topContent: React.ReactNode,
  bottomContent: React.ReactNode,
  children: React.ReactNode,
}

const FrameComponent = ({ topContent, bottomContent, children }: FrameComponentProps) => {
  return (
    <div className={styles.frameContainer}>
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