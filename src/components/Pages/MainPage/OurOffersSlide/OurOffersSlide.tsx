import { useState, useCallback, useEffect } from "react";
import ElseOffersItem from "./ElseOffersItem/ElseOffersItem";
import OfferCarousel from "./OfferCarousel/OfferCarousel";
import Modal from "@/components/Common/Modal/Modal";
import ContactFormModal from "@/components/Common/ContactFormModal/ContactFormModal";
import { bycicleService, bikeUniform } from "@/components/Pages/MainPage/constants";
import type { Offer } from "@/store/slices/Offers/types";

import styles from "./OurOffersSlide.module.scss";

interface OurOffersSlideProps {
  initialOffers?: Offer[];
}

const OurOffersSlide = ({ initialOffers = [] }: OurOffersSlideProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [onCloseClick, setOnCloseClick] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpened(true);
    setOnCloseClick(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(() => {
    if (isModalOpened) {
      setOnCloseClick(false);
    }
  }, [isModalOpened]);

  return (
    <section className={styles.ourOffersWrapper} aria-label="Наши предложения">
      <div className={styles.titleLine}>
        <h2 className={styles.titleText}>
          МЫ ПРЕДЛАГАЕМ
        </h2>
      </div>
      <div className={styles.sliderWrapper}>
        <OfferCarousel initialOffers={initialOffers} />
      </div>
      <div className={styles.elseOffers}>
        <ElseOffersItem
          data={bycicleService}
          onDetailsClick={handleOpenModal}
        />
        <ElseOffersItem 
          mirror={true}
          data={bikeUniform}
          onDetailsClick={handleOpenModal}
        />
      </div>

      <Modal isOpen={isModalOpened} onClose={handleCloseModal} needBgAnimation={true}>
        <ContactFormModal
          isOpen={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          onCloseClick={onCloseClick}
        />
      </Modal>
    </section>
  )
}

export default OurOffersSlide;