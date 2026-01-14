import Image from "next/image";

import ralanLogoRed from '../../../../../assets/svg/logo_with_text_red.svg'
import stravaIcon from '../../../../../assets/svg/strava.svg'
import telegramIcon from '../../../../../assets/svg/telegram.svg'

import styles from './Footer.module.scss'

const Footer: React.FC = () => {
	return (
		<div className={styles.footerWrapper}>
			<div className={styles.backgroundWrapper}>
				<div className={styles.backgroundTop} />
				<div className={styles.backgroundBottom} />
			</div>
			<div className={styles.content}>
				<div className={styles.logoWrapper}>
					<Image
						alt='ralan'
						src={ralanLogoRed}
						width={319}
						height={75}
					/>
				</div>
				<div className={styles.contactsWrapper}>
					<div className={styles.contactRow}>
						<div className={styles.textContent}>
							<p className={styles.smallText}>
								мы находимся по адресу
							</p>
							<p className={styles.bigText}>
								Г. Москва, ул. Крылатская 10 (Велотрек)
							</p>
						</div>
						<div className={styles.linksLine}>
							<a href="https://t.me/ralanpro" target="_blank" rel="noopener noreferrer">
								<Image
									alt='telegram'
									src={telegramIcon}
									className={styles.icon}
									width={22}
									height={22}
								/>
							</a>
							<a href='https://www.strava.com/clubs/1151973' target="_blank" rel="noopener noreferrer">
								<Image
									alt='strava'
									src={stravaIcon}
									className={styles.icon}
									width={22}
									height={22}
								/>
							</a>
						</div>
					</div>
					<div className={styles.contactRow}>
						<div className={styles.textContent}>
							<p className={styles.smallText}>
								телефон
							</p>
							<p className={styles.bigText}>
								+7-999-538-85-85
							</p>
						</div>
						<div className={styles.textContent}>
							<p className={styles.smallTextRight}>
								электронная почта
							</p>
							<p className={styles.bigTextRight}>
								ralanclub@gmail.com
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer;
