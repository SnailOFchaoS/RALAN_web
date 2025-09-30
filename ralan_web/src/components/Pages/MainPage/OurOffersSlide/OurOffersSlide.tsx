import ElseOffersItem from "./ElseOffersItem/ElseOffersItem";
import MySlider from "./OfferCarousel/OfferCarousel";
import {bycicleService, bikeUniform} from "@/components/Pages/MainPage/constants"

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
      <div className={styles.elseOffers}>
        <ElseOffersItem
          data={bycicleService}
        />
        <ElseOffersItem 
          mirror={true}
          data={bikeUniform}
        />
      </div>
    </div>
  )
}

export default OurOffersSlide;