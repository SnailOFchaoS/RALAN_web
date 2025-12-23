import React from 'react';

export interface SlideWrapperProps {
  index: number;
  currentIndex: number;
  slideCount: number;
  laptopScale: number;
  innerRef?: React.RefObject<HTMLDivElement | null>;
  children: (isVisible: boolean) => React.ReactNode;
}

