import Image from "next/image";

import { useMainPageContext } from "../Pages/MainPage/context";
import ralanLogoRed from '../../../assets/swg/logo_with_text_red.svg'
import stravaIcon from '../../../assets/swg/strava.svg'
import intervalsIcon from '../../../assets/swg/intervals.svg'
import telegramIcon from '../../../assets/swg/telegram.svg'

import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const laptopScale = useMainPageContext();

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundTop}/>
        <div className={styles.backgroundBottom}/>
      </div>
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          <div className={styles.textContent}>
            <p className={styles.smallText}>
              мы находимся по адресу
            </p>
            <p className={styles.bigText}>
              Г. Москва, ул. Крылатская 10 (Велотрек)
            </p>
          </div>
          <div className={styles.textContent}>
            <p className={styles.smallText}>
              телефон
            </p>
            <p className={styles.bigText}>
              +7-999-538-85-85
            </p>
          </div>
          <div className={styles.textContent}>
            <p className={styles.smallText}>
              электронная почта
            </p>
            <p className={styles.bigText}>
              ralanclub@gmail.com
            </p>
          </div>
        </div>
        <div className={styles.contentColumn}>
          <Image
            alt='ralan'
            src={ralanLogoRed}
            className={styles.mainIcon}
            width={614 * laptopScale}
            height={144 * laptopScale}
          />
          <div className={styles.linksLine}>
            <Image
              alt='intervals'
              src={intervalsIcon}
              className={styles.icon}
              width={50 * laptopScale}
              height={50 * laptopScale}
            />
            <Image
              alt='strava'
              src={stravaIcon}
              className={styles.icon}
              width={50 * laptopScale}
              height={50 * laptopScale}
            />
            <Image
              alt='telegram'
              src={telegramIcon}
              className={styles.icon}
              width={50 * laptopScale}
              height={50 * laptopScale}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;