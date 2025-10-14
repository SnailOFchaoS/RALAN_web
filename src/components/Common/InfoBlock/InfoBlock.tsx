import { CSSProperties } from 'react';
import { useMainPageContext } from '@/components/Pages/MainPage/context';
import {InfoBlockProps} from "@/components/Common/types"

import styles from "./InfoBlock.module.scss"

const InfoBlock = ({data, title, block}: InfoBlockProps) => {

  const laptopScale = useMainPageContext().laptopScale;

  const titleStyles: CSSProperties = {
    color: title?.color ?? '#1A2344',
    fontSize: title?.fontSize ? `${title.fontSize * laptopScale}px` : `${32 * laptopScale}px`,
    width: title?.blockWidth ? `${title.blockWidth * laptopScale}px` : `${566 * laptopScale}px`,
    textAlign: title?.isRight ? 'end' : 'start',
  }

  const dataStyles: CSSProperties = {
    color: data?.color ?? '#457B9D',
    fontSize: data?.fontSize ? `${data.fontSize * laptopScale}px` : `${20 * laptopScale}px`,
    width: data?.blockWidth ? `${data.blockWidth * laptopScale}px` : `${447 * laptopScale}px`,
    textAlign: data?.isRight ? 'end' : 'start',
  }

  return (
    <div 
      className={styles.InfoBlockWrapper}
      style={block?.styles ?? undefined}
    >
      {title && (
        <p 
          className={styles.titleText}
          style={titleStyles}
        >
          {title?.text}
        </p>
      )}
      {data && (
        <p 
          className={styles.dataText}
          style={dataStyles}
        >
          {data?.text}
        </p>
      )}
    </div>
  );
}

export default InfoBlock;
