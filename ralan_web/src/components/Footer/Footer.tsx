import Image from "next/image";
import ralanLogoRed from '../../../assets/swg/logo_with_text_red.svg'
import stravaIcon from '../../../assets/swg/strava.svg'
import intervalsIcon from '../../../assets/swg/intervals.svg'
import telegramIcon from '../../../assets/swg/telegram.svg'


import styles from './Footer.module.scss'

const Footer: React.FC = () => {
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
            width={614}
            height={144}
          />
          <div className={styles.linksLine}>
            <Image
              alt='intervals'
              src={intervalsIcon}
              className={styles.icon}
              width={50}
              height={50}
            />
            <Image
              alt='strava'
              src={stravaIcon}
              className={styles.icon}
              width={50}
              height={50}
            />
            <Image
              alt='telegram'
              src={telegramIcon}
              className={styles.icon}
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;