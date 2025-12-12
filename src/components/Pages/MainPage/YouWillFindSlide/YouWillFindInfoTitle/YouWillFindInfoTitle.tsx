import { useEffect, useRef, useState } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { YouWillFindInfoTitleProps } from "@/components/Common/types";
import { useElementViewportStatus } from "@/components/Common/hooks/hooks";
import { useMainPageContext } from "../../context";

import styles from "./YouWillFindInfoTitle.module.scss"

interface SubtitleItem {
  id: number;
  title: string;
}

const allSubtitles: SubtitleItem[] = [
  {
    id: 1,
    title: "подготовка"
  },
  {
    id: 2,
    title: "стратегия"
  },
  {
    id: 3,
    title: "победа"
  },
]

const YouWillFindInfo = ({
  subtitle, 
  openedBlocks, 
  setOpenedBlocks,
  changedColorBlocks,
  setChangedColorBlocks,
  slideRef,
  index
}: YouWillFindInfoTitleProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [prevViewport, setPrevViewport] = useState<string | null>(null)
  const [animationFinished, setAnimationFinished] = useState<boolean>(false)
  const [isColored, setIsColored] = useState<boolean>(false)
  const infoBlockRef = useRef<HTMLDivElement | null>(null)
  const textBlockRef = useRef<HTMLDivElement | null>(null)
  const subArrowRef = useRef<HTMLDivElement | null>(null)
  const newArrowBlockRef = useRef<HTMLDivElement | null>(null)
  const hoverAnimatioRef = useRef<GSAPTween>(null)
  const {isBelowViewport, isVisible, isAboveViewport} = useElementViewportStatus(slideRef, 0)
  const laptopScale = useMainPageContext().laptopScale;
  const timeLine = gsap.timeline()

  const handleMouseEnter = () => {
    if(!animationFinished || !hoverAnimatioRef.current) return;

    if (hoverAnimatioRef.current.progress() !== 0) {
      hoverAnimatioRef.current.restart(); 
    } else {
      hoverAnimatioRef.current.play();
    }
  }

  useEffect(()=> {
    setIsColored(changedColorBlocks.find(element => element === subtitle.id) ? true : false)
  }, [changedColorBlocks])

  const handleMouseLeave = () => {

    if(!animationFinished || !hoverAnimatioRef.current) return;

    gsap.set(newArrowBlockRef.current, {
      y: 0
    })
  }

  useEffect(()=> {
    if(isVisible && (prevViewport === null)){
      setPrevViewport('isBelowViewport')
    }
    if(!isVisible && (prevViewport === 'isBelowViewport' || prevViewport === 'isAboveViewport')){
      setPrevViewport('isVisible')
    }
    if(isVisible && prevViewport === 'isVisible'){
      if(infoBlockRef.current){
        gsap.set(infoBlockRef.current, {
          width: 1247 * laptopScale,
        })
      }
      setPrevViewport('isAboveViewport')
    }
    if(isBelowViewport){
      if(infoBlockRef.current){
        gsap.set(infoBlockRef.current, {
          width: 1247 * laptopScale,
        })
      }
      if(newArrowBlockRef.current){
        newArrowBlockRef.current.style.top = '0'
        newArrowBlockRef.current.style.opacity = '0'
      }
      setIsOpened(false)
      setOpenedBlocks([])
      setChangedColorBlocks([])
      setPrevViewport(null)
    }

  }, [isBelowViewport, isAboveViewport, isVisible])

  useEffect(() => {
    if(prevViewport !== 'isBelowViewport') return;
    
    const startPosition = (126 * index + 400) * laptopScale;

    timeLine.fromTo(infoBlockRef.current, {
      width: 0,
    }, {
      width: 1247 * laptopScale,
      ease: "power2.out",
      duration: 2,
    }).fromTo(subArrowRef.current, {
      x: 10 * laptopScale,
    }, {
      x: 1257 * laptopScale,
      ease: "power2.out",
      duration: 2,
    }, '<').fromTo(newArrowBlockRef.current, {
      y: -300 * laptopScale,
    }, {
      y: 0,
      ease: "power2.out",
      duration: 0.5,
      onStart: ()=> {
        if(newArrowBlockRef.current){
          newArrowBlockRef.current.style.opacity = '1'
        }
      },
      onComplete: () => {
        setAnimationFinished(true)
      }
    })

    const scrollTriggerRef = ScrollTrigger.create({
      trigger: infoBlockRef.current,
      start: `bottom bottom +=${startPosition}`,
      animation: timeLine,

      onLeave: ()=> {
        setAnimationFinished(true)
      },
      onEnter: () => {
        setAnimationFinished(false)
      }
    })

    return () => {
      timeLine.kill();
      scrollTriggerRef.kill();
    }
  }, [prevViewport])

  useEffect(()=> {

    if(!newArrowBlockRef.current) return;

    if(!isOpened){
      hoverAnimatioRef.current = gsap.fromTo(newArrowBlockRef.current, {
        y: 0
      }, {
        y: 275 * laptopScale,
        duration: 1,
        ease: "power2.out",
        paused: true,
      })
    } 
    else {
      hoverAnimatioRef.current = gsap.fromTo(newArrowBlockRef.current, {
        y: 275 * laptopScale,
      }, {
        y: 0,
        duration: 1,
        ease: "power2.out",
        paused: true,
      })
    }

  }, [animationFinished, isOpened])

  const onTitleClick = () => {
    if(openedBlocks?.includes(subtitle.id)){
      setOpenedBlocks(openedBlocks?.filter((elem: number) => elem !== subtitle.id))
      setIsOpened(false)
      return
    }
    setOpenedBlocks([...openedBlocks, subtitle.id])
    setIsOpened(true)
  } 

  return (
    <div 
      className="subWrapper" 
      style={{overflow: 'hidden'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.subArrowBlock} ref={subArrowRef}>
        <div 
          className={styles.subArrowContainer}
          style={{
            backgroundColor: '#A8DADC',
          }}
        />
      </div>

      <div 
        className={styles.newArrowBlock} 
        ref={newArrowBlockRef}
      >
        <div 
          className={styles.subArrowContainer}
          style={{
            backgroundColor: isColored ? subtitle.openedColor : '#A8DADC',
            top: `${-262 * laptopScale}px`,
            transform: isOpened ? 'rotate(180deg)' : 'none',
          }}
        />
        <div 
          className={styles.subArrowContainer}
          style={{
            backgroundColor: isColored ? subtitle.openedColor : '#A8DADC',
            top: `${13 * laptopScale}px`,
            transform: isOpened ? 'rotate(180deg)' : 'none'
          }}
        />
      </div>

      <div 
        className={styles.youWillFindInfoWrapper}
        ref={infoBlockRef}
        onClick={() => onTitleClick()}
        style={{
          borderBottom: isColored ? 'none' : '3px solid #A8DADC',
          overflow: `hidden`,
        }}
      >
        <div className={styles.textBlock} ref={textBlockRef}>
          <div className={styles.allSubtitles}>
            {allSubtitles.map((element, index) => {
              return (
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }} 
                  key={index}
                >
                  <p 
                    className={styles.subtitle}
                    style={{
                      color: subtitle.id !== element.id ? undefined : isColored ? subtitle.openedColor : '#A8DADC'
                    }}
                  >
                    {element.title}
                  </p>
                  <span className={styles.subtitle}>
                    ,&nbsp;
                  </span>
                </div>
              )
            })}
          </div>
          <p 
            className={styles.title}
            style={{
              color: isColored ? subtitle.openedColor : '#A8DADC'
            }}
          >
            {subtitle.title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default YouWillFindInfo;
