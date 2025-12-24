import Image from "next/image"

import { useMainPageContext } from "@/components/Pages/MainPage/context";

import { personDataInterface } from "../../types";
import InfoBlock from "../../InfoBlock/InfoBlock";

import styles from "./OpenedPersonBlock.module.scss"

const OpenedPersonBlock: React.FC<{
  person: personDataInterface, 
  imageOpenedPosition: React.CSSProperties
}> = ({person, imageOpenedPosition}) => {
  const { laptopScale } = useMainPageContext();
  
  return (
    <div className={styles.openedPersonBlock}>
      <div className={styles.textBlock}>
        <div className={styles.textLine}>
          <span className={styles.nameLine}>
            {person.name}&nbsp;
            <p className={styles.surname}>{person.surname.toUpperCase()}</p>
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
        <div className={styles.textLine} style={{gap: 4 * laptopScale}}>
          {person.achievements.map((achievement: {text: string}, index: number) => (
            <p key={index} className={styles.achievementItem}>
              {`一${achievement.text.toUpperCase()}`}
            </p>
          ))}
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