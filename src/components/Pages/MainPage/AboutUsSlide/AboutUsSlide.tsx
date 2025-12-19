import InfoBlock from "../../../Common/InfoBlock/InfoBlock"
import {aboutUsInfo} from "../constants"
import Galery from "./Gallery/Gallery";

import styles from "./AboutUsSlide.module.scss"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useElementViewportStatus } from "@/components/Common/hooks/hooks";
import { useMainPageContext } from "../context";

const AboutUsSlide = () => {
  const laptopScale = useMainPageContext().laptopScale;
  const textInfoBlockRef = useRef<HTMLDivElement>(null);
  const {isBelowViewport, isVisible, isAboveViewport} = useElementViewportStatus(textInfoBlockRef, 0)
  const [prevViewport, setPrevViewport] = useState<string | null>(null)
  const timeLine = useRef(gsap.timeline());
  const imageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    if(isVisible && (prevViewport === null)){
      setPrevViewport('isBelowViewport')
      gsap.set(imageBlockRef.current, {
        opacity: 1,
      })
    }
    if(!isVisible && (prevViewport === 'isBelowViewport' || prevViewport === 'isAboveViewport')){
      setPrevViewport('isVisible')
      gsap.set(imageBlockRef.current, {
        opacity: 0,
      })
    }
    if(isVisible && prevViewport === 'isVisible'){
      setPrevViewport('isAboveViewport')
      gsap.set(imageBlockRef.current, {
        opacity: 1,
      })
    }
    if(isBelowViewport){
      setPrevViewport(null)
    }

  }, [isBelowViewport, isAboveViewport, isVisible])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elem = textInfoBlockRef.current;

    if (!elem) return;

    if(prevViewport !== 'isBelowViewport') return;

    gsap.set(elem, { height: 156 });

    timeLine.current.clear();

    timeLine.current.to(elem, {
      height: 856 * laptopScale / 2,
      scrollTrigger: {
        trigger: elem,
        start: "bottom bottom",
        end: `+=${313 * laptopScale}px`,
        scrub: 1.5,
        onLeave: (self: any) => {
          self.kill();
          gsap.fromTo(elem, {
            height: 856 * laptopScale / 2,
          }, {
            height: 856 * laptopScale,
            ease: "power2.out",
            duration: 1,
          })
        }
      },
    });
    return () => {
      timeLine.current?.kill();
    };
  }, [prevViewport]);

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
      <div className={styles.imageBlock} ref={imageBlockRef}>
        <Galery
          prevViewport={prevViewport}
        />
      </div>
    </div>
  );
}

export default AboutUsSlide;