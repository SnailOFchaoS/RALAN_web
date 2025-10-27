import React, { useRef, useState } from 'react';

import GalleryImage from './GalleryImage/GalleryImage';
// import Image from 'next/image';

import styles from './Gallery.module.scss';
// import { useMainPageContext } from '../../context';

// Импортируйте изображения
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

// const itemWidth = 244;
// const itemHeight = 196;
// const enlargedWidth = 508;
// const enlargedHeight = 416;
// const gapHorizontal = 20;
// const gapVertical = 24;

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimationPlay, setIsAnimationPlay] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  // const [positions, setPositions] = useState<{[key: number]: {x: number, y: number}}>({});
  // const context = useMainPageContext();

  // useEffect(() => {
  //   const newPositions: {[key: number]: {x: number, y: number}} = {};
  //   images.forEach((_, index) => {
  //     const row = Math.floor(index / 3);
  //     const col = index % 3;
  //     newPositions[index] = {
  //       x: col * (itemWidth + gapHorizontal) * context.laptopScale,
  //       y: row * (itemHeight + gapVertical) * context.laptopScale,
  //     };
  //   });
  //   setPositions(newPositions);
  // }, []);

  // const handleMouseEnter = (index: number) => {
  //   setHoveredIndex(index);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredIndex(null);
  // };

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
        // <div
        //   key={index}
        //   className={`${styles.galleryItem} ${hoveredIndex === index ? styles.hovered : ''}`}
        //   onMouseEnter={() => handleMouseEnter(index)}
        //   onMouseLeave={handleMouseLeave}
        //   style={{
        //     position: 'absolute',
        //     left: positions[index]?.x * context.laptopScale || 0,
        //     top: positions[index]?.y * context.laptopScale || 0,
        //     width: hoveredIndex === index ? enlargedWidth  * context.laptopScale : itemWidth * context.laptopScale,
        //     height: hoveredIndex === index ? enlargedHeight * context.laptopScale : itemHeight * context.laptopScale,
        //     zIndex: hoveredIndex === index ? 2 : 1,
        //   }}
        // >
        //   <Image
        //     src={image}
        //     alt={`Gallery image ${index + 1}`}
        //     layout="fill"
        //     objectFit="cover"
        //     className={styles.image}
        //     priority
        //   />
        // </div>
      ))}
    </div>
  );
};

export default Gallery;