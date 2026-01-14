import { MobileFirstSlideAnimationProps } from './animation.types';

export const mobileFirstSlideAnimation = ({
  timeLine,
  titleTextRef,
  infoTextRef,
  backgroundWrapperRef,
  backgroundImageRef,
  frameContainerRef,
  logoBlockRef,
  actionButtonRef,
  frameContainerRect,
  logoBlockRect,
  screenHeight,
}: MobileFirstSlideAnimationProps) => {

  const screenWidth = window.innerWidth;
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

  timeLine.to(titleTextRef.current, {
    opacity: 0,
    duration: 0.3,
    force3D: true,
  }, 0);
  
  timeLine.to(infoTextRef.current, {
    opacity: 0,
    duration: 0.3,
    force3D: true,
  }, 0);

  timeLine.to(backgroundWrapperRef.current, {
    clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 50px)`,
    duration: 0.5,
    ease: "power2.out",
  }, 0.1);

  timeLine.to(backgroundImageRef.current, {
    filter: 'brightness(1)',
    duration: 0.5,
    force3D: true,
    ease: "power2.out",
  }, 0.1);

  if (backgroundWrapperRef.current) {
    backgroundWrapperRef.current.style.transformOrigin = `${frameCenterX}px ${frameCenterY}px`;
  }

  timeLine.to(backgroundWrapperRef.current, {
    scale: 0,
    x: offsetToScreenCenterX,
    y: offsetToScreenCenterY,
    opacity: 0,
    duration: 0.4,
    force3D: true,
    ease: "power2.inOut",
  }, ">");

  timeLine.to(frameContainerRef.current, {
    scale: 0,
    y: frameOffsetToScreenCenter,
    opacity: 0,
    duration: 0.4,
    force3D: true,
    ease: "power2.inOut",
  }, "<");

  timeLine.to(actionButtonRef.current, {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    force3D: true,
    ease: "power2.inOut",
  }, "<");

  timeLine.to(logoBlockRef.current, {
    scale: 2,
    y: logoOffsetToScreenCenter,
    duration: 0.4,
    force3D: true,
    ease: "power2.inOut",
  }, "<");

  return;
};
