import Image from "next/image"

import InfoBlock from "../../../Common/InfoBlock/InfoBlock"
import {aboutUsInfo} from "../constants"
import aboutUsPhoto from '../../../../../assets/png/about_us_photo.png';
import Galery from "./Galery/Galery";

import styles from "./AboutUsSlide.module.scss"

const AboutUsSlide = () => {
  return (
    <div className={styles.aboutUsSlideWrapper}>
      <div className={styles.textInfoBlock}>
        <div className={styles.contentRow} style={{gap: '35px'}}>
          <InfoBlock
            data={{
              text: 'Для нас велоспорт – не просто хобби, это путь к превосходству и покорению новых вершин.',
              blockWidth: 564,
              fontSize: 22,
             }}
          />
          <InfoBlock
            title={{
              text: 'В RALAN мы предлагаем:',
              blockWidth: 708,
             }}
          />
        </div>
        {aboutUsInfo.map((element, index) => (
          <div 
            className={styles.contentRow}
            key={index}
          >
            <InfoBlock
              title= {element.title}
              data={element.data}
            />
          </div>
        ))} 
      </div>
      <div className={styles.imageBlock}>
        <Galery/>
        {/* <Image 
          src={aboutUsPhoto}
          alt='About US'
          className={styles.image}
        />     */}
      </div>
    </div>
  );
}

export default AboutUsSlide;