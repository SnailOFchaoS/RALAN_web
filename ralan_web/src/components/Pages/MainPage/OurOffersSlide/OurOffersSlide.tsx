import OfferCarousel from "./OfferCarousel/OfferCarousel";

import styles from "./OurOffersSlide.module.scss"

const OurOffersSlide = () => {
  return (
    <div className={styles.ourOffersWrapper}>
      <div className={styles.titleLine}>
        <p className={styles.titleText}>
          МЫ ПРЕДЛАГАЕМ
        </p>
        <OfferCarousel/>
      </div>
    </div>
  )
}

export default OurOffersSlide;