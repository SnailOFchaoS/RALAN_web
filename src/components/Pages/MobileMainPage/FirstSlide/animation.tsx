import { MobileFirstSlideAnimationProps } from './animation.types';

export const mobileFirstSlideAnimation = ({
  timeLine,
  titleTextRef,
  infoTextRef,
  backgroundImageRef,
  frameContainerRef,
  logoBlockRef,
  actionButtonRef,
  frameContainerRect,
  logoBlockRect,
  screenHeight,
}: MobileFirstSlideAnimationProps) => {

  const screenCenterY = screenHeight / 2;
  const logoCurrentCenterY = logoBlockRect.top + logoBlockRect.height / 2;
  const logoOffsetToScreenCenter = screenCenterY - logoCurrentCenterY;

  const frameCurrentCenterY = frameContainerRect.top + frameContainerRect.height / 2;
  const frameOffsetToScreenCenter = screenCenterY - frameCurrentCenterY;
  
  timeLine.to(titleTextRef.current, {
    opacity: 0,
  }, 0);
  
  timeLine.to(infoTextRef.current, {
    opacity: 0,
  }, 0);

  timeLine.to(backgroundImageRef.current, {
    x: frameContainerRect.left,
    y: frameContainerRect.top,
    width: frameContainerRect.width,
    height: frameContainerRect.height,
    borderRadius: '50px',
    immediateRender: false,
    onUpdate: function() {
      const brightnessValue = this.progress() * 0.5 + 0.5;
      if (backgroundImageRef.current) {
        backgroundImageRef.current.style.setProperty('filter', `brightness(${brightnessValue})`);
      }
    },
  }, 0);

  timeLine.to(backgroundImageRef.current, {
    width: 0,
    height: 0,
    x: `${frameContainerRect.width / 2 + frameContainerRect.left}px`,
    y: `${screenCenterY}px`,
    transformOrigin: "center center",
    ease: "power2.inOut",
  }, ">");

  timeLine.to(frameContainerRef.current, {
    width: 0,
    height: 0,
    padding: 0,
    y: `${frameOffsetToScreenCenter}px`,
    ease: "power2.inOut",
  }, "<");

  timeLine.to(actionButtonRef.current, {
    width: 0,
    height: 0,
    padding: 0,
    ease: "power2.inOut",
  }, "<");

  timeLine.to(logoBlockRef.current, {
    scale: 2,
    y: `${logoOffsetToScreenCenter}px`,
    ease: "power2.inOut",
  }, "<");

  return;
};
