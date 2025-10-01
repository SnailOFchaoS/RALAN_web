import { useState } from "react";

import YouWillFindInfoTitle from "./YouWillFindInfoTitle/YouWillFindInfoTitle";
import YouWillFindInfoBlock from "./YouWillFindInfoBlock/YouWillFindInfoBlock";
import {YouWillFindTextData} from "../constants"
import {YouWillFindInfoBlockProps} from "@/components/Common/types"

import styles from "./YouWillFindSlide.module.scss"


const YouWillFindSlide = () => {

  const [openedBlocks, setOpenedBlocks] = useState<number[]>([])

  return (
    <div className={styles.youWillFindSlideWrapper}>
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
            />
            {
              openedBlocks.includes(element.id) && (
                <YouWillFindInfoBlock
                  infoBlockContent={element}
                />
              )
            }
          </div>
        );
      })}
    </div>
  );
}

export default YouWillFindSlide;