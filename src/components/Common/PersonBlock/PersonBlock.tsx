import { useState } from "react";

import { personDataInterface } from "../types";
import OpenedPersonBlock from "./OpenedPersonBlock/OpenedPersonBlock";
import ClosedPersonBlock from "./ClosedPersonBlock/ClosedPersonBlock";

import styles from "./PersonBlock.module.scss"

const PersonBlock: React.FC<{
  isOpenedDefault: boolean, 
  isStatic: boolean, 
  person: personDataInterface
}> = ({isOpenedDefault = false, isStatic = true, person}) => {
  const [isOpened, setIsOpened] = useState<boolean>(isOpenedDefault)

  const imageOpenedPosition = {
    objectPosition: `${person.image?.opened.positionX ?? 0}px ${person.image?.opened.positionY ?? 0}px`
  }

  const imageClosedPosition = {
    objectPosition: `${person.image?.closed.positionX ?? 0}px ${person.image?.closed.positionY ?? 0}px`,
    transform: `scale(${person.image?.closed.scale})`
  }

  const onPersonClicked = () => {
    if(isStatic){
      return
    }
    setIsOpened(true)
  }

  return (
    <div className={styles.personBlockWrapper}>
      {isOpened ? (
        <OpenedPersonBlock
          person={person}
          imageOpenedPosition={imageOpenedPosition}
        />
      ):(
        <ClosedPersonBlock
          isStatic = {true}
          onPersonClicked = {onPersonClicked}
          person = {person}
          imageClosedPosition={imageClosedPosition}
        />
      )}
    </div>
  )
}

export default PersonBlock;
