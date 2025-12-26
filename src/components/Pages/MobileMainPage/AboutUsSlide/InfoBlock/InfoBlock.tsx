import { INTRO_TEXT, SECTION_TITLE, OFFERS } from "./InfoBlock.constants";
import styles from "./InfoBlock.module.scss";

const InfoBlock = () => {
  return (
    <div className={styles.container}>
			<div className={styles.infoModule}>
				<p className={styles.introText}>{INTRO_TEXT}</p>
				<h2 className={styles.sectionTitle}>{SECTION_TITLE}</h2>
			</div>
      
        {OFFERS.map((offer, index) => (
					<div className={styles.infoModule}>
						<div key={index} className={styles.offerItem}>
							<h3 className={styles.offerTitle}>{offer.title}</h3>
							<p className={styles.offerDescription}>{offer.description}</p>
						</div>
					</div>
        ))}
    </div>
  );
};

export default InfoBlock;
