import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';

import FrameComponent from "./FrameContent/FrameContent";
import TopContent from "./TopContent/TopContent"
import BottomContent from "./BottomContent/BottomContent";

import styles from "./FirstSlide.module.scss"

const FirstSlide = () => {
  const [scale, setScale] = useState(1);
  const imageRef =useRef<HTMLImageElement | null>(null);;

  const calculateScale = () => {
    if (!imageRef.current) return;

    const imageWidth = imageRef.current.naturalWidth;
    const imageHeight = imageRef.current.naturalHeight;
    const containerWidth = imageRef.current.parentElement?.offsetWidth;
    const containerHeight = imageRef.current.parentElement?.offsetHeight;

    if(!containerWidth || !containerHeight) return;

    const widthScale = containerWidth / imageWidth;
    const heightScale = containerHeight / imageHeight;
    
    const newScale = Math.max(widthScale, heightScale);
    setScale(newScale);
  };

  useEffect(() => {
    calculateScale();
    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, []);

    
  return (
    <div className={styles.firstSlideWrapper}>
      <div className={styles.mainImage}>
        <Image 
          ref={imageRef}
          src={fistSlidePhoto}
          alt=''
          fill={true}
          className={styles.image}
          style={{
            transform: `scale(${scale})`,
          }}
          onLoad={calculateScale}
        />
      </div>
      <div className={styles.contentWrapper}>
        <FrameComponent
          topContent={<TopContent/>}
          bottomContent={<BottomContent/>}
        >
          <div className={styles.mainContent}>
            <div className={styles.titleText}>
              ПОДГОТОВКА, СТРАТEГИЯ, ПОБЕДА
            </div>
            <div className={styles.infoText}>
              Поможем раскрыть ваш потенциал и достичь поставленных целей.<br/> 
              Начните тренировки сейчас.
            </div>
          </div>
        </FrameComponent>
      </div>
    </div>
  );
}

export default FirstSlide;
