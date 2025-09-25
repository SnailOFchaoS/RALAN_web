import styles from "./YouWillFindInfoTitle.module.scss"
import { useState } from "react";

const allSubtitles: any[] = [
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
  setOpenedBlocks
}: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

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
      className={styles.youWillFindInfoWrapper}
      onClick={() => onTitleClick()}
      style={{
        borderBottom: isOpened ? 'none' : '3px solid #A8DADC'
      }}
    >
      <div className={styles.textBlock}>
        <div className={styles.allSubtitles}>
          {allSubtitles.map(element => {
            return (
              <>
                <p 
                  className={styles.subtitle}
                  style={{
                    color: subtitle.id !== element.id ? undefined : isOpened ? subtitle.openedColor : '#A8DADC'
                  }}
                >
                  {element.title}
                </p>
                <span className={styles.subtitle}>
                  ,&nbsp;
                </span>
              </>
            )
          })}
        </div>
        <p 
          className={styles.title}
          style={{
            color: isOpened ? subtitle.openedColor : '#A8DADC'
          }}
        >
          {subtitle.title}
        </p>
      </div>
      <div className={styles.arrowBlock}>
        <div 
          className={styles.arrowContainer}
          style={{
            backgroundColor: isOpened ? subtitle.openedColor : '#A8DADC',
            transform: isOpened ? 'rotate(180deg)' : 'none'
          }}
        />
      </div>
    </div>
  )
}

export default YouWillFindInfo;