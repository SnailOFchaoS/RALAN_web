import { forwardRef } from "react";
import Image from "next/image";

import logoIco from '../../../../../../assets/svg/logo_blue.svg';
import logoText from '../../../../../../assets/svg/logo_text_blue.svg';

import styles from "./LogoBlock.module.scss";

const LogoBlock = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={styles.logoContainer} ref={ref}>
      <div className={styles.logoImageWrapper}>
        <Image
          src={logoIco}
          alt="ralan"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.logoTextWrapper}>
        <Image
          src={logoText}
          alt="ralan"
          className={styles.logoText}
        />
      </div>
    </div>
  );
});

LogoBlock.displayName = 'LogoBlock';

export default LogoBlock;

