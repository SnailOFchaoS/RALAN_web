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
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);

  let context = useMainPageContext()
  const topContentTimeline = gsap.timeline();

  const handleOpenModal = useCallback(() => {
    // Открываем модалку только если анимация не началась (progress близок к 0)
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
        // Сохраняем текущий прогресс анимации
        animationProgressRef.current = self.progress;

        if(self.progress >= 0.95 && !context?.isMenuVisible && context?.setIsMenuVisible){
          context.setIsMenuVisible(true)
        }

        if(self.progress < 0.95 && context?.setIsMenuVisible){
          context.setIsMenuVisible(false)
        }
      },

      onLeave: () => {
        if (context && context.setIsMenuVisible && !context?.isMenuVisible) {
          context.setIsMenuVisible(true)
        }
        if (topContentRef.current) {
          topContentRef.current.style.opacity = '0'
        }
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
        if (context && context.setIsMenuVisible) {
          context.setIsMenuVisible(false)
        }
        if (topContentRef.current) {
          topContentRef.current.style.opacity = '1'
        }
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