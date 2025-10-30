import InfoBlock from "../../../Common/InfoBlock/InfoBlock"
import {aboutUsInfo} from "../constants"
import Galery from "./Gallery/Gallery";

import styles from "./AboutUsSlide.module.scss"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useElementViewportStatus } from "@/components/Common/hooks/hooks";

const AboutUsSlide = () => {
  const textInfoBlockRef = useRef<HTMLDivElement>(null);
  const {isBelowViewport, isVisible} = useElementViewportStatus(textInfoBlockRef, 0)
  const timeLine = useRef(gsap.timeline());


  useEffect(() => {
    if (typeof window === "undefined") return;

    const elem = textInfoBlockRef.current;

    if (!elem) return;
    console.log("isBelowViewport:", isBelowViewport)

    if(isVisible)return;

    // Начальное состояние
    gsap.set(elem, { height: 156 });

    // Очистим предыдущие
    timeLine.current.clear();

    // Основная анимация
    timeLine.current.to(elem, {
      height: 856 * 0.67 / 2,
      // ease: "power2.out",
      scrollTrigger: {
        trigger: elem,
        start: "bottom bottom",
        end: "+=209",
        scrub: 1.5,
        markers: true,
        onLeave(self){
          self.kill()
          gsap.fromTo(elem,{
            height: 856 * 0.67 / 2,
          }, {
            height: 856 * 0.67,
            ease: "power2.out",
            duration: 1,
          })
        }
      },
    });
    return () => {
      timeLine.current.kill();
    };
  }, [isVisible]);

  return (
    <div className={styles.aboutUsSlideWrapper}>
      <div className={styles.textInfoBlock} ref={textInfoBlockRef}>
        <div className={styles.contentRow}>
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
      </div>
    </div>
  );
}

export default AboutUsSlide;