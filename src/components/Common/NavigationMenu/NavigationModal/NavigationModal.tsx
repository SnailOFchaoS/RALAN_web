import Image from "next/image";
import logoWithText from '../../../../../assets/svg/logo_with_text.svg';

import styles from './NavigationModal.module.scss'

const navigationData = [{
	text: 'ВАС ЖДЕТ',
},{
	text: 'О НАС',
},{
	text: 'ПРЕДСТАВИТЕЛИ КОМАНДЫ',
},{
	text: 'УСЛУГИ',
},]

const NavigationModal = () => {
	return (
		<div className={styles.navigationModalWrapper}>
			<div className={styles.topElement}>
				<div className={styles.topContentWrapper}>
					<Image
						src={logoWithText}
						alt="ralan"
						className={styles.logoImage}
					/>
				</div>
				
      </div>
			<div className={styles.content}>
				<div className={styles.modalRow} />
				{navigationData.map((element, id) => (
					<div 
						className={styles.modalRow}
						key={id}
					> 
						<p className={styles.text}>
							{element.text}
						</p>
					</div>
				))}
				<div className={styles.modalRow} />
			</div>
		</div>
	)
}

export default NavigationModal;