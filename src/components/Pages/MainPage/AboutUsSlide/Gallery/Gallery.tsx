import React, { useRef, useState } from 'react';

import GalleryImage from './GalleryImage/GalleryImage';

import styles from './Gallery.module.scss';

import image1 from '../../../../../../assets/png/galery_1.png';
import image2 from '../../../../../../assets/png/galery_2.png';
import image3 from '../../../../../../assets/png/galery_3.png';
import image4 from '../../../../../../assets/png/galery_4.png';
import image5 from '../../../../../../assets/png/galery_5.png';
import image6 from '../../../../../../assets/png/galery_6.png';
import image7 from '../../../../../../assets/png/galery_7.png';
import image8 from '../../../../../../assets/png/galery_8.png';
import image9 from '../../../../../../assets/png/galery_9.png';
import image10 from '../../../../../../assets/png/galery_10.png';
import image11 from '../../../../../../assets/png/galery_11.png';
import image12 from '../../../../../../assets/png/galery_12.png';


const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12
];


const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimationPlay, setIsAnimationPlay] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.gallery} ref={galleryRef}>
      {images.map((image, index) => (
        <GalleryImage
          image = {image}
          index = {index}
          hoveredIndex = {hoveredIndex}
          setHoveredIndex = {setHoveredIndex}
          isAnimationPlay = {isAnimationPlay}
          setIsAnimationPlay = {setIsAnimationPlay}
        />
      ))}
    </div>
  );
};

export default Gallery;