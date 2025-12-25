import React from 'react';

export interface RectData {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MobileFirstSlideAnimationProps {
  timeLine: gsap.core.Timeline;
  titleTextRef: React.RefObject<HTMLDivElement | null>;
  infoTextRef: React.RefObject<HTMLDivElement | null>;
  backgroundImageRef: React.RefObject<HTMLDivElement | null>;
  frameContainerRef: React.RefObject<HTMLDivElement | null>;
  logoBlockRef: React.RefObject<HTMLDivElement | null>;
  actionButtonRef: React.RefObject<HTMLDivElement | null>;
  frameContainerRect: RectData;
  logoBlockRect: RectData;
  screenHeight: number;
}

