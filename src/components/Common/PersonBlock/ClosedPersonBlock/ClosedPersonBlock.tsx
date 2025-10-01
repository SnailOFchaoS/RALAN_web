import Image from "next/image";

import { personDataInterface } from "../../types";

import styles from "./ClosedPersonBlock.module.scss"

const ClosedPersonBlock: React.FC<{
  isStatic: boolean,
  onPersonClicked: () => void,
  person: personDataInterface,
  imageClosedPosition: React.CSSProperties,
}> = ({isStatic, onPersonClicked, person, imageClosedPosition}) => {
  return (
    <div className={styles.closedPersonBlock}
      style={!isStatic ? {cursor: 'pointer'} : {cursor: 'default'}}
      onClick={() => {onPersonClicked()}}
    >
      <div className={styles.imageBlock}>
        <Image
          alt="person"
          className={styles.image}
          src={person.image.src}
          style={imageClosedPosition}
        />
      </div>
      <div className={styles.nameLine}>
        {person.surname.toUpperCase()} <br/>
        {person.name}&nbsp;{person.patronymic}
      </div>
    </div>
  )
}

export default ClosedPersonBlock;