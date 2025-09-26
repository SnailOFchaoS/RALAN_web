import PersonBlock from "@/components/Common/PersonBlock/PersonBlock";

import { representatives } from "@/pages/api/mockData";

import styles from "./TeamRepresentatives.module.scss"

const TeamRepresentatives = () => {
  return (
    <div className={styles.teamRepresentativesWrapper}>
      <div className={styles.titleLine}>
        <p className={styles.titleText}>
          ПРЕДСТАВИТЕЛИ КОМАНДЫ
        </p>
      </div>
      <div className={styles.slideLine}>
        {representatives.map((person: any) => (
          <PersonBlock
            isOpenedDefault={true}
            isStatic
            person={person}
          />
        ))}
      </div>
    </div>
  )
}

export default TeamRepresentatives;