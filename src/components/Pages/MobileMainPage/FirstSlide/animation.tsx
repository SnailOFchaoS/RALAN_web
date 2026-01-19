import gsap from 'gsap';
import { MobileFirstSlideAnimationProps, AnimationTimelines } from './animation.types';

export const createMobileAnimations = ({
  titleTextRef,
  infoTextRef,
  backgroundWrapperRef,
  darkOverlayRef,
  frameContainerRef,
  logoBlockRef,
  actionButtonRef,
  frameContainerRect,
  logoBlockRect,
  screenHeight,
  screenWidth,
}: Omit<MobileFirstSlideAnimationProps, 'timeLine'>): AnimationTimelines => {

  const screenCenterY = screenHeight / 2;
  const logoCurrentCenterY = logoBlockRect.top + logoBlockRect.height / 2;
  const logoOffsetToScreenCenter = screenCenterY - logoCurrentCenterY;

  const frameCurrentCenterY = frameContainerRect.top + frameContainerRect.height / 2;
  const frameOffsetToScreenCenter = screenCenterY - frameCurrentCenterY;

  const clipTop = frameContainerRect.top;
  const clipRight = screenWidth - frameContainerRect.left - frameContainerRect.width;
  const clipBottom = screenHeight - frameContainerRect.top - frameContainerRect.height;
  const clipLeft = frameContainerRect.left;

  const frameCenterX = frameContainerRect.left + frameContainerRect.width / 2;
  const frameCenterY = frameContainerRect.top + frameContainerRect.height / 2;

  const offsetToScreenCenterX = screenWidth / 2 - frameCenterX;
  const offsetToScreenCenterY = screenCenterY - frameCenterY;

  if (backgroundWrapperRef.current) {
    backgroundWrapperRef.current.style.transformOrigin = `${frameCenterX}px ${frameCenterY}px`;
  }

  const phase1Timeline = gsap.timeline({ paused: true });

  phase1Timeline.to([titleTextRef.current, infoTextRef.current], {
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
    force3D: true,
  }, 0);

  phase1Timeline.to(backgroundWrapperRef.current, {
    clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 50px)`,
    duration: 0.5,
    ease: "power2.inOut",
    force3D: true,
  }, 0);

  phase1Timeline.to(darkOverlayRef.current, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    force3D: true,
  }, 0);

  const phase2Timeline = gsap.timeline({ paused: true });

  phase2Timeline.to(backgroundWrapperRef.current, {
    scale: 0,
    x: offsetToScreenCenterX,
    y: offsetToScreenCenterY,
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    force3D: true,
  }, 0);

  phase2Timeline.to(frameContainerRef.current, {
    scale: 0,
    y: frameOffsetToScreenCenter,
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    force3D: true,
  }, 0);

  phase2Timeline.to(actionButtonRef.current, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    force3D: true,
  }, 0);

  phase2Timeline.to(logoBlockRef.current, {
    scale: 2,
    y: logoOffsetToScreenCenter,
    duration: 0.5,
    ease: "power2.inOut",
    force3D: true,
  }, 0);

  return { phase1Timeline, phase2Timeline };
};
