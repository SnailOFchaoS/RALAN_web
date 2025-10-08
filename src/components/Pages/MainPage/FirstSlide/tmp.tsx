// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
// import FrameComponent from "./FrameContent/FrameContent";
// import TopContent from "./TopContent/TopContent"
// import BottomContent from "./BottomContent/BottomContent";
// import { useMainPageContext } from '../context';

// import styles from "./FirstSlide.module.scss";

// gsap.registerPlugin(ScrollTrigger);

// interface RectData {
//     top: number;
//     left: number;
//     width: number;
//     height: number;
// }

// const FirstSlide = () => {
//   const mainImageRef = useRef<HTMLDivElement>(null);
//   const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
//   const mainContentRef = useRef<HTMLDivElement>(null);
//   const laptopScale = useMainPageContext();

//   const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);

//   // Используем useRef для targetTop и targetLeft
//   const targetTopRef = useRef<number>(0);
//   const targetLeftRef = useRef<number>(0);
//   const firstSlideWrapper = firstSlideWrapperRef.current;

//   // useCallback для вычисления targetTop и targetLeft
//   const calculateTargetPosition = useCallback(() => {
//       if (!frameContainerRect || !firstSlideWrapper) {
//           return;
//       }
//       const wrapperRect = firstSlideWrapper.getBoundingClientRect();
//       targetTopRef.current = frameContainerRect.top - wrapperRect.top;
//       targetLeftRef.current = frameContainerRect.left - wrapperRect.left;
//   }, [frameContainerRect, firstSlideWrapper]);

//   // Эффект для вычисления targetTop и targetLeft
//   useEffect(() => {
//       calculateTargetPosition();
//   }, [frameContainerRect?.top, frameContainerRect?.left, calculateTargetPosition]);

//   // useEffect для GSAP анимации
//   useEffect(() => {
//     if (
//       !mainImageRef.current ||
//       !firstSlideWrapperRef.current ||
//       !mainContentRef.current ||
//       !frameContainerRect
//     ) {
//       return;
//     }

//     const mainImage = mainImageRef.current;
//     const preventScroll = () => {
//       document.body.style.overflow = 'hidden';
//     };

//     const allowScroll = () => {
//       document.body.style.overflow = '';
//     };

//     gsap.to(mainImage, {
//       scrollTrigger: {
//         trigger: firstSlideWrapper,
//         start: "top top",
//         end: "+=500vh",
//         pin: true,
//         scrub: 2,
//         onEnter: () => {
//           preventScroll();
//         },
//         onLeave: () => {
//           allowScroll();
//         },
//         onLeaveBack: () => {
//           allowScroll();
//         },
//       },
//       scale: 1,
//       xPercent: 0,
//       yPercent: 0,
//       top: targetTopRef.current, // Используем значения из useRef
//       left: targetLeftRef.current, // Используем значения из useRef
//       width: frameContainerRect.width,
//       height: frameContainerRect.height,
//       borderRadius: `${100 * laptopScale}px`,
//       onComplete: () => {
//         allowScroll();
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(st => st.kill());
//     };
//   }, [frameContainerRect?.width, frameContainerRect?.height, firstSlideWrapper]); // Важные изменения тут


//   // ** Callback для FrameComponent **
//   const handleContainerReady = useCallback((rect: DOMRect) => {
//     const roundedRect: RectData = {
//       top: Math.round(rect.top),
//       left: Math.round(rect.left),
//       width: Math.round(rect.width),
//       height: Math.round(rect.height),
//     };
//     setFrameContainerRect(roundedRect);
//   }, []); // Зависимости здесь пусты

//   return (
//     <div className={styles.firstSlideWrapper} ref={firstSlideWrapperRef}>
//       <div className={styles.mainImage} ref={mainImageRef}>
//         <Image
//           src={fistSlidePhoto}
//           alt=''
//           fill={true}
//           className={styles.image}
//         />
//       </div>
//       <div className={styles.contentWrapper}>
//         <FrameComponent
//           topContent={<TopContent />}
//           bottomContent={<BottomContent />}
//           onContainerReady={handleContainerReady} // Передаем callback
//         >
//           <div className={styles.mainContent} ref={mainContentRef}>
//             <div className={styles.titleText}>
//               ПОДГОТОВКА, СТРАТEГИЯ, ПОБЕДА
//             </div>
//             <div className={styles.infoText}>
//               Поможем раскрыть ваш потенциал и достичь поставленных целей.<br/>
//               Начните тренировки сейчас.
//             </div>
//           </div>
//         </FrameComponent>
//       </div>
//     </div>
//   );
// };

// export default FirstSlide;

// import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// import fistSlidePhoto from '../../../../../assets/png/fist_slide_photo.png';
// import FrameComponent from "./FrameContent/FrameContent";
// import TopContent from "./TopContent/TopContent"
// import BottomContent from "./BottomContent/BottomContent";
// import { useMainPageContext } from '../context';

// import styles from "./FirstSlide.module.scss";

// gsap.registerPlugin(ScrollTrigger);

// interface RectData {
//     top: number;
//     left: number;
//     width: number;
//     height: number;
// }

// const FirstSlide = () => {
//   const mainImageRef = useRef<HTMLDivElement>(null);
//   const firstSlideWrapperRef = useRef<HTMLDivElement>(null);
//   const mainContentRef = useRef<HTMLDivElement>(null);
//   const laptopScale = useMainPageContext();

//   const [frameContainerRect, setFrameContainerRect] = useState<RectData | null>(null);

//   // useRef для хранения начального смещения (offset)
//   const initialTopOffsetRef = useRef<number>(0);
//   const initialLeftOffsetRef = useRef<number>(0);

//   const firstSlideWrapper = firstSlideWrapperRef.current;

//   // useCallback для вычисления начального смещения и установки в useRef
//   const calculateInitialOffsets = useCallback(() => {
//       if (!frameContainerRect || !firstSlideWrapper) {
//           return;
//       }
//       const wrapperRect = firstSlideWrapper.getBoundingClientRect();
//       initialTopOffsetRef.current = frameContainerRect.top - wrapperRect.top;
//       initialLeftOffsetRef.current = frameContainerRect.left - wrapperRect.left;
//   }, [frameContainerRect, firstSlideWrapper]);


//   // Хук для захвата начального смещения
//     useLayoutEffect(() => {
//         calculateInitialOffsets();
//     }, [calculateInitialOffsets]);

//   // useEffect для GSAP анимации (запускается только при изменении размеров)
//   useEffect(() => {
//     if (
//       !mainImageRef.current ||
//       !firstSlideWrapperRef.current ||
//       !mainContentRef.current ||
//       !frameContainerRect
//     ) {
//       return;
//     }

//     const mainImage = mainImageRef.current;

//     const preventScroll = () => {
//       document.body.style.overflow = 'hidden';
//     };

//     const allowScroll = () => {
//       document.body.style.overflow = '';
//     };

//     gsap.to(mainImage, {
//       scrollTrigger: {
//         trigger: firstSlideWrapper,
//         start: "top top",
//         end: "+=500vh",
//         pin: true,
//         scrub: 2,
//         onEnter: () => {
//           preventScroll();
//         },
//         onLeave: () => {
//           allowScroll();
//         },
//         onLeaveBack: () => {
//           allowScroll();
//         },
//       },
//       scale: 1,
//       xPercent: 0,
//       yPercent: 0,
//       // Вычисляем top и left пропорционально ширине
//       top: initialTopOffsetRef.current * (frameContainerRect.width / frameContainerRect.width), // Просто множитель 1, но для примера
//       left: initialLeftOffsetRef.current * (frameContainerRect.width / frameContainerRect.width), // Тоже самое
//       width: frameContainerRect.width,
//       height: frameContainerRect.height,
//       borderRadius: `${100 * laptopScale}px`,
//       immediateRender: false,
//       onComplete: () => {
//         allowScroll();
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(st => st.kill());
//     };
//   }, [
//     frameContainerRect?.width,
//     frameContainerRect?.height,
//     initialTopOffsetRef.current,
//     initialLeftOffsetRef.current
//   ]);

//   // Callback для FrameComponent
//   const handleContainerReady = useCallback((rect: DOMRect) => {
//     const roundedRect: RectData = {
//       top: Math.round(rect.top),
//       left: Math.round(rect.left),
//       width: Math.round(rect.width),
//       height: Math.round(rect.height),
//     };
//     setFrameContainerRect(roundedRect);
//   }, []);

//   return (
//     <div className={styles.firstSlideWrapper} ref={firstSlideWrapperRef}>
//       <div className={styles.mainImage} ref={mainImageRef}>
//         <Image
//           src={fistSlidePhoto}
//           alt=''
//           fill={true}
//           className={styles.image}
//         />
//       </div>
//       <div className={styles.contentWrapper}>
//         <FrameComponent
//           topContent={<TopContent />}
//           bottomContent={<BottomContent />}
//           onContainerReady={handleContainerReady}
//         >
//           <div className={styles.mainContent} ref={mainContentRef}>
//             <div className={styles.titleText}>
//               ПОДГОТОВКА, СТРАТEГИЯ, ПОБЕДА
//             </div>
//             <div className={styles.infoText}>
//               Поможем раскрыть ваш потенциал и достичь поставленных целей.<br/>
//               Начните тренировки сейчас.
//             </div>
//           </div>
//         </FrameComponent>
//       </div>
//     </div>
//   );
// };

// export default FirstSlide;

// import React, { useRef, useEffect } from 'react';
// import styles from './FrameContent.module.scss';

// interface FrameComponentProps {
//   topContent: React.ReactNode;
//   bottomContent: React.ReactNode;
//   children: React.ReactNode;
//   // ** Изменено: теперь принимаем setFrameContainerRect напрямую **
//   onContainerReady: (rect: DOMRect) => void; 
// }

// const FrameComponent = ({ topContent, bottomContent, children, onContainerReady }: FrameComponentProps) => {
//   const frameContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (frameContainerRef.current) { // Больше не проверяем onContainerReady
//       const rect = frameContainerRef.current.getBoundingClientRect();
//       onContainerReady(rect);
//     }
//   }, [onContainerReady]); // ** Зависимость: onContainerReady **

//   return (
//     <div className={styles.frameContainer} ref={frameContainerRef}>
//       <div className={styles.topElement}>
//         {topContent}
//       </div>
//       <div className={styles.bottomElement}>
//         {bottomContent}
//       </div>
//       <div className={styles.content}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default FrameComponent;