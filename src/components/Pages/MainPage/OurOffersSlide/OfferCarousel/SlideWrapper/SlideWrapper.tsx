import styles from '../OfferCarousel.module.scss';
import { SlideWrapperProps } from './SlideWrapper.types';

const SlideWrapper: React.FC<SlideWrapperProps> = ({
  index,
  currentIndex,
  slideCount,
  laptopScale,
  innerRef,
  children,
}) => {
  const isActive = index === currentIndex;
  const isPrev = index === (currentIndex - 1 + slideCount) % slideCount;
  const isNext = index === (currentIndex + 1) % slideCount;
  const isVisible = isActive || isPrev || isNext;

  return (
    <div
      style={{
        minWidth: `${389 * laptopScale}px`,
        minHeight: '100%',
      }}
    >
      <div
        className={`${styles.slide} 
          ${isActive ? styles.active : ''} 
          ${isPrev ? styles.prev : ''} 
          ${isNext ? styles.next : ''}
          ${!isVisible ? styles.nonVisible : ''}
        `}
        ref={innerRef}
      >
        {children(isVisible)}
      </div>
    </div>
  );
};

export default SlideWrapper;

