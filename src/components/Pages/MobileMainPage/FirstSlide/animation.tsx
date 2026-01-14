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
  screenWidth,
}: MobileFirstSlideAnimationProps) => {

  const screenCenterY = screenHeight / 2;
  const logoCurrentCenterY = logoBlockRect.top + logoBlockRect.height / 2;
  const logoOffsetToScreenCenter = screenCenterY - logoCurrentCenterY;

  const frameCurrentCenterY = frameContainerRect.top + frameContainerRect.height / 2;
  const frameOffsetToScreenCenter = screenCenterY - frameCurrentCenterY;

  // Вычисляем clip-path для обрезки до размеров рамки
  const clipTop = frameContainerRect.top;
  const clipRight = screenWidth - frameContainerRect.left - frameContainerRect.width;
  const clipBottom = screenHeight - frameContainerRect.top - frameContainerRect.height;
  const clipLeft = frameContainerRect.left;

  // Центр рамки
  const frameCenterX = frameContainerRect.left + frameContainerRect.width / 2;
  const frameCenterY = frameContainerRect.top + frameContainerRect.height / 2;

  // Смещение для перемещения к центру экрана
  const offsetToScreenCenterX = screenWidth / 2 - frameCenterX;
  const offsetToScreenCenterY = screenCenterY - frameCenterY;

  // Метка начала
  timeLine.addLabel("start");

  // Фаза 1: Скрытие текста
  timeLine.to(titleTextRef.current, {
    opacity: 0,
  }, 0);
  
  timeLine.to(infoTextRef.current, {
    opacity: 0,
  }, 0);

  // Фаза 2: Обрезка фона до размера рамки с помощью clip-path
  timeLine.to(backgroundWrapperRef.current, {
    clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 50px)`,
    ease: "none",
  }, 0);

  timeLine.to(backgroundImageRef.current, {
    filter: 'brightness(1)',
    ease: "none",
  }, 0);

  // Метка после обрезки
  timeLine.addLabel("clipped");

  // Устанавливаем transform-origin в центр рамки для корректного масштабирования
  if (backgroundWrapperRef.current) {
    backgroundWrapperRef.current.style.transformOrigin = `${frameCenterX}px ${frameCenterY}px`;
  }

  // Фаза 3: Масштабирование и схлопывание к центру экрана
  timeLine.to(backgroundWrapperRef.current, {
    scale: 0,
    x: offsetToScreenCenterX,
    y: offsetToScreenCenterY,
    opacity: 0,
    ease: "power2.inOut",
  }, ">");

  timeLine.to(frameContainerRef.current, {
    scale: 0,
    y: frameOffsetToScreenCenter,
    opacity: 0,
    ease: "power2.inOut",
  }, "<");

  timeLine.to(actionButtonRef.current, {
    scale: 0,
    opacity: 0,
    ease: "power2.inOut",
  }, "<");

  timeLine.to(logoBlockRef.current, {
    scale: 2,
    y: logoOffsetToScreenCenter,
    ease: "power2.inOut",
  }, "<");

  // Метка конца
  timeLine.addLabel("end");

  return;
};
