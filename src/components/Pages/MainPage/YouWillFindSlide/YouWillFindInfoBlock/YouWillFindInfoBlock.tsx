import { useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import InfoBlock from '@/components/Common/InfoBlock/InfoBlock'
import {YouWillFindInfoBlockProps} from "@/components/Common/types"

import styles from './YouWillFindInfoBlock.module.scss'
import { useMainPageContext } from '../../context';


interface YouWillFindInfoProps {
  infoBlockContent: YouWillFindInfoBlockProps;
  openedBlocks: number[];
  index: number;
  setChangedColorBlocks: (data: number[]) => void;
  changedColorBlocks: number[];
}

const YouWillFindInfoBlock: React.FC<YouWillFindInfoProps> = ({ 
  infoBlockContent, 
  openedBlocks, 
  index,
  setChangedColorBlocks,
  changedColorBlocks,
}) => {

  const imagePosition = {
    objectPosition: `${infoBlockContent?.image?.positionX ?? 0}px ${infoBlockContent?.image?.positionY ?? 0}px`
  }
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const laptopScale = useMainPageContext().laptopScale;
  const blockRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<GSAPTween>(null)

  useEffect(()=> {
    animationRef.current = gsap.fromTo(blockRef.current, {
      height: 0,
      opacity: 0,
      margin: 0,
      padding: 0,
    }, {
      height: `${560 * laptopScale}px`,
      duration: 0.5,
      paused: true,

      onReverseComplete: () => {
        if(blockRef.current){
          blockRef.current.style.opacity = "0"
          blockRef.current.style.padding = "0"
          setIsOpened(false)
        }
      },
      onStart: ()=> {
        if(blockRef.current){
          blockRef.current.style.opacity = "1"
          blockRef.current.style.padding = `${32 * laptopScale}px`
          setIsOpened(true)
        }
      }
    })

    return () => {
      animationRef?.current?.kill()
    }
  }, [laptopScale])

  useEffect(()=> {
    setChangedColorBlocks(isOpened ? 
      [...changedColorBlocks, index] : 
      changedColorBlocks?.filter((elem: number) => elem !== index))
  }, [isOpened])

  useEffect(()=> {
    console.log("here")
    if(!animationRef.current) return;

    if(openedBlocks.includes(index)){
      console.log("check")
      animationRef.current.play()
    }
    else{
      animationRef.current.reverse()
    }
  }, [openedBlocks])

  return (
    <div 
      className={styles.youWillFindInfoBlockWrapper}
      style={{
        backgroundColor: infoBlockContent.openedColor
      }}
      ref={blockRef}
    >
      <div className={styles.textBlock}>
        {infoBlockContent.textInfo?.map((element: {title?: string, text?: string}, index) => {
          return (
            <InfoBlock
              key={index}
              title={{
                color: infoBlockContent.openedColor !=='#FFFFF0' ? '#FFFFF0' : '#1A2344',
                text: element.title || '',
                blockWidth: 380,
                fontSize: 24,
              }}
              data={{
                color: infoBlockContent.openedColor !=='#FFFFF0' ? '#FFFFF0' : '#1A2344',
                text: element.text || '',
                blockWidth: 300,
                fontSize: 16,
              }}
              block={{
                styles:{
                  height:  `${laptopScale * 152}px`,
                  paddingBottom: `${laptopScale * 24}px`,
                  justifyContent: 'space-between'
                }
              }}
            />
          )
        })}
      </div>
      <div className={styles.imageBlock}>
        {infoBlockContent?.image?.src && 
          <Image
            alt='you will find'
            src={infoBlockContent.image.src}
            className={styles.image}
            style={imagePosition}
          />
        }
      </div>
    </div>
  )
}

export default YouWillFindInfoBlock;