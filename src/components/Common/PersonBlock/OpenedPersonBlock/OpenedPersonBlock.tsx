import Image from "next/image"

import { personDataInterface } from "../../types";
import InfoBlock from "../../InfoBlock/InfoBlock";

import styles from "./OpenedPersonBlock.module.scss"

const OpenedPersonBlock: React.FC<{
  person: personDataInterface, 
  imageOpenedPosition: React.CSSProperties
}> = ({person, imageOpenedPosition}) => {
  
  return (
    <div className={styles.openedPersonBlock}>
      <div className={styles.textBlock}>
        <div className={styles.textLine}>
          <span className={styles.nameLine}>
            <p className={styles.surname}>{person.surname.toUpperCase()}</p>
            &nbsp;{person.name}&nbsp;{person.patronymic}
          </span>
          <InfoBlock
            data={{
              text: person.descriptionTop,
              color: "#457B9D",
              fontSize: 16,
              blockWidth: 417,
            }}
          />
        </div>
        <div className={styles.textLine}>
          {person.achievements.map((achievement: {text: string}, index: number) => {
            return (
              <InfoBlock
                key={index}
                title={{
                  text: `一${achievement.text.toUpperCase()}`,
                  color: "#1A2344",
                  fontSize: 16,
                  blockWidth: 417,
                }}
              />
            )
          })}
        </div>
        <div className={styles.textLine}>
          <InfoBlock
            data={{
              text: person.descriptionBottom,
              color: "#457B9D",
              fontSize: 16,
              blockWidth: 417,
            }}
          />
        </div>
      </div>
      <div className={styles.imageBlock}>
        <Image
          alt='person'
          src={person.image.src}
          className={styles.image}
          style={imageOpenedPosition}
        />
      </div>
    </div>
  )
}

export default OpenedPersonBlock;