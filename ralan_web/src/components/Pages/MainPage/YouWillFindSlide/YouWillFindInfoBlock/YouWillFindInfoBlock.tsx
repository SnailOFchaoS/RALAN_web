import Image from 'next/image';

import InfoBlock from '@/components/Common/InfoBlock/InfoBlock'
import {YouWillFindInfoBlockProps} from "@/components/Common/types"

import styles from './YouWillFindInfoBlock.module.scss'

const YouWillFindInfoBlock: React.FC<{ infoBlockContent: YouWillFindInfoBlockProps }> = ({ infoBlockContent }) => {

  const imagePosition = {
    objectPosition: `${infoBlockContent?.image?.positionX ?? 0}px ${infoBlockContent?.image?.positionY ?? 0}px`
  }

  return (
    <div 
      className={styles.youWillFindInfoBlockWrapper}
      style={{
        backgroundColor: infoBlockContent.openedColor
      }}
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
                  height: '152px',
                  paddingBottom: '24px',
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