import { useState, useCallback, useEffect } from "react";
import Modal from "@/components/Common/Modal/Modal";
import ContactFormModal from "@/components/Common/ContactFormModal/ContactFormModal";
import { bycicleService, bikeUniform } from "@/components/Pages/MainPage/constants";
import type { Offer } from "@/store/slices/Offers/types";

import OfferCarousel from "./OfferCarousel/OfferCarousel";
import ElseOffersItem from "./ElseOffersItem/ElseOffersItem";

import styles from "./OurOffersSlide.module.scss";

interface OurOffersSlideProps {
  initialOffers?: Offer[];
}

const OurOffersSlide: React.FC<OurOffersSlideProps> = ({ initialOffers = [] }) => {
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
    <div className={styles.ourOffersWrapper}>
      <div className={styles.titleLine}>
        <p className={styles.titleText}>МЫ ПРЕДЛАГАЕМ</p>
      </div>
      
      <div className={styles.carouselWrapper}>
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
    </div>
  );
};

export default OurOffersSlide;
