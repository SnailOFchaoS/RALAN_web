import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { YouWillFindInfoTitleProps } from "@/components/Common/types";
import { useElementViewportStatus } from "@/components/Common/hooks/ElementViewportStatusHooks";
import { useMainPageContext } from "../../context";
import { YOU_WILL_FIND_ANIMATION_VALUES, YOU_WILL_FIND_SUBTITLES } from "../../constants";

import styles from "./YouWillFindInfoTitle.module.scss"

const YouWillFindInfo = ({
  subtitle, 
  openedBlocks, 
  setOpenedBlocks,
  changedColorBlocks,
  setChangedColorBlocks,
  slideRef,
  index
}: YouWillFindInfoTitleProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const [prevViewport, setPrevViewport] = useState<string | null>(null)
  const [animationFinished, setAnimationFinished] = useState(false)
  
  const infoBlockRef = useRef<HTMLDivElement | null>(null)
  const subArrowRef = useRef<HTMLDivElement | null>(null)
  const newArrowBlockRef = useRef<HTMLDivElement | null>(null)
  const hoverAnimatioRef = useRef<GSAPTween>(null)
  const timeLineRef = useRef<gsap.core.Timeline | null>(null)
  
  const {isBelowViewport, isVisible, isAboveViewport} = useElementViewportStatus(slideRef, 0)
  const laptopScale = useMainPageContext().laptopScale;

  const isColored = useMemo(() => 
    changedColorBlocks.includes(subtitle.id), 
    [changedColorBlocks, subtitle.id]
  );
  
  const scaledValues = useMemo(() => ({
    infoBlockWidth: YOU_WILL_FIND_ANIMATION_VALUES.INFO_BLOCK_WIDTH * laptopScale,
    subArrowXStart: YOU_WILL_FIND_ANIMATION_VALUES.SUB_ARROW_X_START * laptopScale,
    subArrowXEnd: YOU_WILL_FIND_ANIMATION_VALUES.SUB_ARROW_X_END * laptopScale,
    newArrowYStart: YOU_WILL_FIND_ANIMATION_VALUES.NEW_ARROW_Y_START * laptopScale,
    hoverY: YOU_WILL_FIND_ANIMATION_VALUES.HOVER_Y * laptopScale,
    arrowTopOffset: YOU_WILL_FIND_ANIMATION_VALUES.ARROW_TOP_OFFSET * laptopScale,
    arrowBottomOffset: YOU_WILL_FIND_ANIMATION_VALUES.ARROW_BOTTOM_OFFSET * laptopScale,
  }), [laptopScale]);

  const setFinalAnimationState = useCallback(() => {
    if(infoBlockRef.current){
      gsap.set(infoBlockRef.current, { width: scaledValues.infoBlockWidth })
    }
    if(subArrowRef.current){
      gsap.set(subArrowRef.current, { x: scaledValues.subArrowXEnd })
    }
    if(newArrowBlockRef.current){
      gsap.set(newArrowBlockRef.current, { y: 0 })
      newArrowBlockRef.current.style.opacity = '1'
    }
    setAnimationFinished(true)
  }, [scaledValues])

  const handleMouseEnter = useCallback(() => {
    if(!animationFinished || !hoverAnimatioRef.current) return;

    if (hoverAnimatioRef.current.progress() !== 0) {
      hoverAnimatioRef.current.restart(); 
    } else {
      hoverAnimatioRef.current.play();
    }
  }, [animationFinished])

  const handleMouseLeave = useCallback(() => {
    if(!animationFinished || !hoverAnimatioRef.current) return;
    gsap.set(newArrowBlockRef.current, { y: 0 })
  }, [animationFinished])

  useEffect(()=> {
    if(isVisible && prevViewport === null){
      setPrevViewport('isBelowViewport')
    }
    if(!isVisible && (prevViewport === 'isBelowViewport' || prevViewport === 'isAboveViewport')){
      setPrevViewport('isVisible')
    }
    if(isVisible && prevViewport === 'isVisible'){
      if(infoBlockRef.current){
        gsap.set(infoBlockRef.current, { width: scaledValues.infoBlockWidth })
      }
      setPrevViewport('isAboveViewport')
    }
    if(isAboveViewport){
      timeLineRef.current?.kill();
      setFinalAnimationState();
    }
    if(isBelowViewport){
      if(infoBlockRef.current){
        gsap.set(infoBlockRef.current, { width: scaledValues.infoBlockWidth })
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
  }, [isBelowViewport, isAboveViewport, isVisible, scaledValues, setFinalAnimationState, setOpenedBlocks, setChangedColorBlocks])

  useEffect(() => {
    if(prevViewport !== 'isBelowViewport') return;
    
    const startPosition = (126 * index + 400) * laptopScale;
    const timeLine = gsap.timeline();
    timeLineRef.current = timeLine;

    timeLine
      .fromTo(infoBlockRef.current, 
        { width: 0 }, 
        { width: scaledValues.infoBlockWidth, ease: "power2.out", duration: 2 }
      )
      .fromTo(subArrowRef.current, 
        { x: scaledValues.subArrowXStart }, 
        { x: scaledValues.subArrowXEnd, ease: "power2.out", duration: 2 }, 
        '<'
      )
      .fromTo(newArrowBlockRef.current, 
        { y: scaledValues.newArrowYStart }, 
        { 
          y: 0, 
          ease: "power2.out", 
          duration: 0.5,
          onStart: () => {
            if(newArrowBlockRef.current) newArrowBlockRef.current.style.opacity = '1'
          },
          onComplete: () => setAnimationFinished(true)
        }
      )

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: infoBlockRef.current,
      start: `bottom bottom +=${startPosition}`,
      animation: timeLine,
      onLeave: () => setAnimationFinished(true),
      onEnter: () => setAnimationFinished(false)
    })

    return () => {
      timeLine.kill();
      scrollTriggerInstance.kill();
    }
  }, [prevViewport, index, laptopScale, scaledValues])

  useEffect(()=> {
    if(!newArrowBlockRef.current) return;

    const fromY = isOpened ? scaledValues.hoverY : 0;
    const toY = isOpened ? 0 : scaledValues.hoverY;

    hoverAnimatioRef.current = gsap.fromTo(
      newArrowBlockRef.current, 
      { y: fromY }, 
      { y: toY, duration: 1, ease: "power2.out", paused: true }
    );
  }, [animationFinished, isOpened, scaledValues.hoverY])

  const onTitleClick = useCallback(() => {
    if(openedBlocks?.includes(subtitle.id)){
      setOpenedBlocks(openedBlocks.filter((elem: number) => elem !== subtitle.id))
      setIsOpened(false)
    } else {
      setOpenedBlocks([...openedBlocks, subtitle.id])
      setIsOpened(true)
    }
  }, [openedBlocks, setOpenedBlocks, subtitle.id])

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

      <div className={styles.newArrowBlock} ref={newArrowBlockRef}>
        <div 
          className={styles.subArrowContainer}
          style={{
            backgroundColor: isColored ? subtitle.openedColor : '#A8DADC',
            top: `${scaledValues.arrowTopOffset}px`,
            transform: isOpened ? 'rotate(180deg)' : 'none',
          }}
        />
        <div 
          className={styles.subArrowContainer}
          style={{
            backgroundColor: isColored ? subtitle.openedColor : '#A8DADC',
            top: `${scaledValues.arrowBottomOffset}px`,
            transform: isOpened ? 'rotate(180deg)' : 'none'
          }}
        />
      </div>

      <div 
        className={styles.youWillFindInfoWrapper}
        ref={infoBlockRef}
        onClick={onTitleClick}
        style={{
          borderBottom: isColored ? 'none' : '3px solid #A8DADC',
          overflow: `hidden`,
        }}
      >
        <div className={styles.textBlock}>
          <div className={styles.allSubtitles}>
            {YOU_WILL_FIND_SUBTITLES.map((element, index) => {
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
