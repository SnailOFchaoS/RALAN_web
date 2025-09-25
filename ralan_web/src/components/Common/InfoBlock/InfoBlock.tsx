import styles from "./InfoBlock.module.scss"
import {InfoBlockProps} from "@/components/Common/types"

const InfoBlock = ({data, title, block}: InfoBlockProps) => {

  const titleStyles = {
    color: title?.color ?? '#1A2344',
    fontSize: title?.fontSize ? `${title.fontSize}px` : '32px',
    width: title?.blockWidth ? `${title.blockWidth}px` : '566px',
  }

  const dataStyles = {
    color: data?.color ?? '#457B9D',
    fontSize: data?.fontSize ? `${data.fontSize}px` : '20px',
    width: data?.blockWidth ? `${data.blockWidth}px` : '447px',
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
