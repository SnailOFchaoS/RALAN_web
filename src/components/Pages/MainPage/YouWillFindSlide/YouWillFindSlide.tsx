import { useRef, useState } from "react";

import YouWillFindInfoTitle from "./YouWillFindInfoTitle/YouWillFindInfoTitle";
import YouWillFindInfoBlock from "./YouWillFindInfoBlock/YouWillFindInfoBlock";
import {YouWillFindTextData} from "../constants"
import {YouWillFindInfoBlockProps} from "@/components/Common/types"

import styles from "./YouWillFindSlide.module.scss"


const YouWillFindSlide = () => {
  const slideRef = useRef<HTMLDivElement | null>(null)
  const [openedBlocks, setOpenedBlocks] = useState<number[]>([])

  return (
    <div className={styles.youWillFindSlideWrapper} ref={slideRef}>
      <div className={styles.titleLine}>
        <p className={styles.titleText}>
          ВАС ЖДЁТ
        </p>
      </div>
      {YouWillFindTextData.map((element: YouWillFindInfoBlockProps, index) => {
        return (
          <div 
            className={styles.slideLine}
            key={index}
          >
            <YouWillFindInfoTitle
              subtitle = {element}
              openedBlocks = {openedBlocks}
              setOpenedBlocks = {setOpenedBlocks}
              slideRef = {slideRef}
              index = {index}
            />
            <YouWillFindInfoBlock
              infoBlockContent={element}
              openedBlocks={openedBlocks}
              index={element.id}
            />
            {/* {
              openedBlocks.includes(element.id) && (
                <YouWillFindInfoBlock
                  infoBlockContent={element}
                  openedBlocks={openedBlocks}
                  // index={element.id}
                />
              )
            } */}
          </div>
        );
      })}
    </div>
  );
}

export default YouWillFindSlide;