import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMainPageContext } from '../../context';
import { frameContentAnimation } from '../animation';
import TopContent from '../TopContent/TopContent';
import BottomContent from '../BottomContent/BottomContent';
import Modal from '@/components/Common/Modal/Modal';
import ContactFormModal from '@/components/Common/ContactFormModal/ContactFormModal';
import { FrameComponentProps } from './FrameContent.types';

import styles from './FrameContent.module.scss';

const FrameComponent = ({
  children,
  onContainerReady,
  frameContainerRef,
  timeLine,
  mainImageRef,
}: FrameComponentProps) => {
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const logoElementRef = useRef<HTMLDivElement>(null);
  const animationProgressRef = useRef<number>(0);
  const positionSavedRef = useRef<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);

  const context = useMainPageContext();
  const topContentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  if (!topContentTimelineRef.current) {
    topContentTimelineRef.current = gsap.timeline();
  }

  const topContentTimeline = topContentTimelineRef.current;
  const contextRef = useRef(context);

  contextRef.current = context;

  const lastIsMenuVisibleRef = useRef<boolean | undefined>(undefined);

  const handleOpenModal = useCallback(() => {
    if (animationProgressRef.current < 0.01) {
      setIsModalOpened(true);
      setOnCloseClick(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(() => {
    if (frameContainerRef && frameContainerRef.current) {
      const rect = frameContainerRef.current.getBoundingClientRect();
      onContainerReady(rect);
    }
  }, [onContainerReady, frameContainerRef]);

  useEffect(() => {
    const logoRect = topContentRef.current?.getBoundingClientRect();

    if (!timeLine || !bottomContentRef || !logoRect ||
      !context || !context.mainLogoImageRef || !context.mainLogoTextRef || !context.mainLogoArrowRef) return;

    const topContentScrollTrigger = ScrollTrigger.create({
      animation: topContentTimeline,
      trigger: logoElementRef.current,
      pin: true,
      pinReparent: true,
      start: self => {
        const previousTrigger = self.previous();

        if (previousTrigger) {
          const position = context.laptopScale === 1 ? 107 : 145 * context.laptopScale;
          return previousTrigger.end + position;
        } else {
          return "top top";
        }
      },
      end: `+=${747 * context.laptopScale}`,
      scrub: 0.5,

      onUpdate: (self) => {
        animationProgressRef.current = self.progress;
        const ctx = contextRef.current;

        const shouldBeVisible = self.progress >= 0.95;
        if (lastIsMenuVisibleRef.current !== shouldBeVisible) {
          lastIsMenuVisibleRef.current = shouldBeVisible;
          ctx?.setIsMenuVisible?.(shouldBeVisible);
        }

        if (self.progress >= 0.95 && topContentRef.current && !positionSavedRef.current) {
          const rect = topContentRef.current.getBoundingClientRect();
          
          if (rect.top >= 0 && rect.top < 50) {
            ctx?.setTopContentEndPosition?.({
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            });
            positionSavedRef.current = true;
          }
        }
      },

      onLeave: () => {
        const ctx = contextRef.current;
        ctx?.setIsMenuVisible?.(true);
        lastIsMenuVisibleRef.current = true;
        
        if (topContentRef.current) {
          topContentRef.current.style.opacity = '0';
        }

        ctx?.setIsTopContentHidden?.(true);
      },

      onLeaveBack: () => {
        if (frameContainerRef.current) {
          frameContainerRef.current.style.display = 'flex'
        }
        if (mainImageRef.current) {
          mainImageRef.current.style.opacity = '1'
        }
      },

      onEnter: () => {
        if (frameContainerRef.current) {
          frameContainerRef.current.style.display = 'none'
        }
        if (mainImageRef.current) {
          mainImageRef.current.style.opacity = '0'
        }
      },

      onEnterBack: () => {
        const ctx = contextRef.current;
        ctx?.setIsMenuVisible?.(false);
        lastIsMenuVisibleRef.current = false;
        ctx?.setIsTopContentHidden?.(false);

        if (topContentRef.current) {
          topContentRef.current.style.opacity = '1';
        }
        positionSavedRef.current = false;
        ctx?.setTopContentEndPosition?.(null);
      },

    })

    frameContentAnimation({
      timeLine,
      logoTimeline: topContentTimeline,
      frameContainerRef,
      bottomContentRef,
      topContentRef,
      laptopScale: context.laptopScale,
      mainLogoImageRef: context.mainLogoImageRef,
      mainLogoTextRef: context.mainLogoTextRef,
      mainLogoArrowRef: context.mainLogoArrowRef,
    })

    return () => {
      topContentScrollTrigger.kill();
      topContentTimeline.kill();
    };

  }, [timeLine])

  return (
    <>
      <div className={styles.topElement} ref={logoElementRef}>
        <div className={styles.topElementContent} ref={topContentRef}>
          <TopContent />
        </div>
      </div>
      <div className={styles.frameContainer} ref={frameContainerRef}>
        <div className={styles.bottomElement} ref={bottomContentRef}>
          <BottomContent onClick={handleOpenModal} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>

      <Modal isOpen={isModalOpened} onClose={handleCloseModal} needBgAnimation={true}>
        <ContactFormModal
          isOpen={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          onCloseClick={onCloseClick}
        />
      </Modal>
    </>
  );
};

export default FrameComponent;