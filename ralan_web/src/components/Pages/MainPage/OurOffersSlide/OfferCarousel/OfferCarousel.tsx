// src/components/Carousel/OfferCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Если нужны пагинация или автовоспроизведение

// Импортируйте стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Если используете

import styles from './OfferCarousel.module.scss'; // Ваши стили для карусели

// Ваши данные для карточек
const offerData = [
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "3 500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C", // Темно-синий для карточек
  },
  {
    type: "ШОССЕ",
    title: "МЕСЯЧНЫЙ АБОНЕМЕНТ",
    price: "25 000 ₽",
    details: "12 занятий по 90 мин",
    level: "Любой уровень",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#232F5C", // Чуть светлее для акцента
  },
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C",
  },
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C",
  },
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C",
  },
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C",
  },
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C",
  },
  {
    type: "ШОССЕ/ТРЕК",
    title: "ТРЕНИРОВКА - ФОТОССЕССИЯ",
    date: "30 февраля",
    price: "500 ₽",
    details: "1 занятие 4 часа",
    level: "Опытный райдер",
    buttonText: "ПОДРОБНЕЕ",
    backgroundColor: "#1D264C",
  },
];

const OfferCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Подключите нужные модули
        spaceBetween={20} // Расстояние между слайдами
        slidesPerView={1.5} // Количество видимых слайдов (1.5, чтобы видеть части следующего)
        navigation={{ // Настройки навигации (стрелок)
          nextEl: `.${styles.swiperNextButton}`,
          prevEl: `.${styles.swiperPrevButton}`,
        }}
        pagination={{ clickable: true }} // Если хотите точки пагинации
        loop={true} // Зацикливание карусели
        autoplay={{ delay: 5000 }} // Автоматическое переключение (опционально)
        className={styles.offerSwiper} // Для применения стилей к самому Swiper
        breakpoints={{ // Адаптивность
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3, // На больших экранах показываем 3 карточки
          },
        }}
      >
        {offerData.map((item, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.offerCard} style={{ backgroundColor: item.backgroundColor }}>
              <div className={styles.cardHeader}>
                <span className={styles.cardType}>{item.type}</span>
                {item.title === "МЕСЯЧНЫЙ АБОНЕМЕНТ" && (
                  <span className={styles.exclamationMark}>!</span>
                )}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.date && <p className={styles.cardDate}>{item.date}</p>}
              <p className={styles.cardPrice}>{item.price}</p>
              <p className={styles.cardDetails}>{item.details}</p>
              <p className={styles.cardLevel}>{item.level}</p>
              <button className={styles.cardButton}>{item.buttonText}</button>
            </div>
          </SwiperSlide>
        ))}

        {/* Стрелки навигации */}
        {/* <div className={styles.swiperPrevButton}>
          <img src="" alt="Previous" />
        </div>
        <div className={styles.swiperNextButton}>
          <img src="" alt="Next" />
        </div> */}
      </Swiper>
    </div>
  );
};

export default OfferCarousel;