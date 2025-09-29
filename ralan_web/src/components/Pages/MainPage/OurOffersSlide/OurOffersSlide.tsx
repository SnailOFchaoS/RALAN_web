import OfferCarousel from "./OfferCarousel/OfferCarousel";
import MySlider from "./OfferCarouselСlone/OfferCarousel";

import styles from "./OurOffersSlide.module.scss"

const OurOffersSlide = () => {
  return (
    <div className={styles.ourOffersWrapper}>
      <div className={styles.titleLine}>
        <p className={styles.titleText}>
          МЫ ПРЕДЛАГАЕМ
        </p>
      </div>
      <div className={styles.sliderWrapper}>
        <MySlider/>
      </div>
      
    </div>
  )
}

export default OurOffersSlide;