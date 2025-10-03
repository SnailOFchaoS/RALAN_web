import Image from "next/image";

import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';

import FrameComponent from "./FrameContent/FrameContent";
import TopContent from "./TopContent/TopContent"
import BottomContent from "./BottomContent/BottomContent";

import styles from "./FirstSlide.module.scss"

const FirstSlide = () => {

  return (
    <div className={styles.firstSlideWrapper}>
      <div className={styles.mainImage}>
        <Image 
          src={fistSlidePhoto}
          alt=''
          fill={true}
          className={styles.image}
          style={{
            transform: `scale(${1.01})`,
          }}
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
