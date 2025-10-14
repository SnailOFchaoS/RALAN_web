import Image from "next/image";
import logoWithText from '../../../../../../assets/svg/logo_with_text.svg';

import styles from './TopContent.module.scss';

const TopContent = () => {
  return (
    <div className={styles.topContentWrapper}>
      <Image
        src={logoWithText}
        alt="ralan"
        className={styles.logoImage}
      />
    </div>
  )
} 

export default TopContent;
