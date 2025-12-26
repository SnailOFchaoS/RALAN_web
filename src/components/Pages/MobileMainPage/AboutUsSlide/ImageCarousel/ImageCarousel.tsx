import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { GALLERY_IMAGES, IMAGE_SIZE, IMAGE_GAP, AUTO_SCROLL_SPEED, CONTAINER_HEIGHT, MIN_SCALE } from "./ImageCarousel.constants";
import { ImageCarouselProps } from "./ImageCarousel.types";
import styles from "./ImageCarousel.module.scss";

const ImageCarousel = ({ onImageClick }: ImageCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startScrollPosition, setStartScrollPosition] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragThreshold = 5;

  const itemHeight = IMAGE_SIZE + IMAGE_GAP;
  const totalHeight = GALLERY_IMAGES.length * itemHeight;

  const topEdge = 0;
  const bottomEdge = CONTAINER_HEIGHT;

  const allImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  useEffect(() => {
    setScrollPosition(0);
    lastTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      if (!isDraggingRef.current) {
        const deltaTime = currentTime - lastTimeRef.current;
        if (deltaTime > 16) {
          setScrollPosition(prev => {
            let newPosition = prev + AUTO_SCROLL_SPEED;
            if (newPosition >= totalHeight) {
              newPosition = newPosition - totalHeight;
            }
            return newPosition;
          });
          lastTimeRef.current = currentTime;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [totalHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setStartY(e.touches[0].clientY);
    setStartScrollPosition(scrollPosition);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;

    if (Math.abs(deltaY) > dragThreshold) {
      hasDraggedRef.current = true;
    }
    
    let newPosition = startScrollPosition + deltaY;

    while (newPosition < 0) {
      newPosition += totalHeight;
    }
    while (newPosition >= totalHeight) {
      newPosition -= totalHeight;
    }
    
    setScrollPosition(newPosition);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setStartY(e.clientY);
    setStartScrollPosition(scrollPosition);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const deltaY = startY - e.clientY;

    if (Math.abs(deltaY) > dragThreshold) {
      hasDraggedRef.current = true;
    }
    
    let newPosition = startScrollPosition + deltaY;

    while (newPosition < 0) {
      newPosition += totalHeight;
    }
    while (newPosition >= totalHeight) {
      newPosition -= totalHeight;
    }
    
    setScrollPosition(newPosition);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
  };

  const handleImageClick = (index: number) => {
    if (hasDraggedRef.current) {
      return;
    }
    if (onImageClick) {
      onImageClick(index % GALLERY_IMAGES.length);
    }
  };

  const getItemStyle = (index: number) => {
    const baseY = index * itemHeight - scrollPosition;
    const itemTop = baseY;
    const itemBottom = baseY + IMAGE_SIZE;
    
    let scale = 1;
    let zIndex = 100;
    let translateY = baseY;
    let transformOrigin = 'center center';
    
    if (itemTop < topEdge) {
      translateY = topEdge;
      transformOrigin = 'center top';

      const distancePastTop = topEdge - itemTop;
      const progress = Math.min(1, distancePastTop / itemHeight);
      
      scale = 1 - progress * (1 - MIN_SCALE);
      zIndex = Math.round(50 - progress * 50);
    }
    
    if (itemBottom > bottomEdge) {
      translateY = bottomEdge - IMAGE_SIZE;
      transformOrigin = 'center bottom';

      const distancePastBottom = itemBottom - bottomEdge;
      const progress = Math.max(0, 1 - distancePastBottom / itemHeight);
      
      scale = MIN_SCALE + progress * (1 - MIN_SCALE);
      zIndex = Math.round(50 - (1 - progress) * 50);
    }

    const isVisible = baseY > -itemHeight * 3 && baseY < CONTAINER_HEIGHT + itemHeight * 3;

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      zIndex,
      visibility: isVisible ? 'visible' : 'hidden',
      transformOrigin,
    } as React.CSSProperties;
  };

  return (
    <div 
      className={styles.container}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.track}>
        {allImages.map((image, index) => (
          <div 
            key={`image-${index}`}
            className={styles.imageWrapper}
            style={getItemStyle(index)}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Gallery ${(index % GALLERY_IMAGES.length) + 1}`}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              className={styles.image}
              draggable={false}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
