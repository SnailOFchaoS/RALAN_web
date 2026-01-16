import { MobileFirstSlideAnimationProps } from './animation.types';

export const mobileFirstSlideAnimation = ({
  timeLine,
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

  // Устанавливаем transform-origin заранее
  if (backgroundWrapperRef.current) {
    backgroundWrapperRef.current.style.transformOrigin = `${frameCenterX}px ${frameCenterY}px`;
  }

  // Фаза 1: Скрытие текста (opacity — GPU-ускоренное свойство)
  timeLine.to([titleTextRef.current, infoTextRef.current], {
    opacity: 0,
    force3D: true,
  }, 0);

  // Фаза 2: Обрезка фона до размера рамки с помощью clip-path
  timeLine.to(backgroundWrapperRef.current, {
    clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 50px)`,
    ease: "none",
    force3D: true,
  }, 0);

  // Анимация затемнения через opacity overlay (GPU-ускорено)
  timeLine.to(darkOverlayRef.current, {
    opacity: 0,
    ease: "none",
    force3D: true,
  }, 0);

  // Фаза 3: Масштабирование и схлопывание к центру экрана
  timeLine.to(backgroundWrapperRef.current, {
    scale: 0,
    x: offsetToScreenCenterX,
    y: offsetToScreenCenterY,
    opacity: 0,
    ease: "power2.inOut",
    force3D: true,
  }, ">");

  timeLine.to(frameContainerRef.current, {
    scale: 0,
    y: frameOffsetToScreenCenter,
    opacity: 0,
    ease: "power2.inOut",
    force3D: true,
  }, "<");

  timeLine.to(actionButtonRef.current, {
    scale: 0,
    opacity: 0,
    ease: "power2.inOut",
    force3D: true,
  }, "<");

  timeLine.to(logoBlockRef.current, {
    scale: 2,
    y: logoOffsetToScreenCenter,
    ease: "power2.inOut",
    force3D: true,
  }, "<");

  return;
};
