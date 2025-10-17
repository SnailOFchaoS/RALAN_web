import Image from "next/image";
import { useEffect, useRef } from "react";

import logoIco from '../../../../../../assets/svg/logo_blue.svg';
import logoText from '../../../../../../assets/svg/logo_text_blue.svg';
import navigationButtonArrowIcon from '../../../../../../assets/svg/navigation_button_arrow.svg'
import { useMainPageContext } from "../../context";

import styles from './TopContent.module.scss';

const TopContent = () => {

  const logoRef = useRef<HTMLDivElement>(null)
  const logoTextRef = useRef<HTMLDivElement>(null)
  const logoArrowRef = useRef<HTMLDivElement>(null)
  const context = useMainPageContext()

  useEffect(()=> {
    if(!logoRef) return;

    if(context?.setMainLogoImageRef){
      context.setMainLogoImageRef(logoRef)
    }

    if(context?.setMainLogoTextRef){
      context.setMainLogoTextRef(logoTextRef)
    }

    if(context?.setMainLogoArrowRef){
      context.setMainLogoArrowRef(logoArrowRef)
    }
  }, [logoRef])

  return (
    <div className={styles.topContentWrapper}>
      <div className={styles.logoImageWrapper} ref={logoRef}>
        <Image
          src={logoIco}
          alt="ralan"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.logoTextWrapper} ref={logoTextRef}>
        <Image
          src={logoText}
          alt="ralan"
          className={styles.logoText}
        />
      </div>

      <div className={styles.logoArrowWrapper} ref={logoArrowRef}>
        <Image
          src={navigationButtonArrowIcon}
          alt="ralan"
          className={styles.logoArrow}
        />
      </div>
      
    </div>
  )
}

export default TopContent;
