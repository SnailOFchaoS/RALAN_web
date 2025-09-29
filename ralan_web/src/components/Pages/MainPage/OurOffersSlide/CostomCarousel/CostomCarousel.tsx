// import React, { useState, useRef, useEffect } from 'react';
// import './CustomCarousel.css'; // Подключите CSS-файл

// const CustomCarousel = ({ children }) => {
//   // Состояние для отслеживания текущего слайда
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // useRef для доступа к контейнеру слайдов
//   const carouselRef = useRef(null);

//   // Количество слайдов (берем из количества children)
//   const slideCount = React.Children.count(children);

//   // Функция для перехода к следующему слайду
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
//   };

//   // Функция для перехода к предыдущему слайду
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
//   };

//   // Эффект для автоматической прокрутки (опционально)
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       nextSlide();
//     }, 5000); // Меняем слайд каждые 5 секунд

//     // Очистка интервала при размонтировании компонента
//     return () => clearInterval(intervalId);
//   }, [slideCount]); // Зависимость от slideCount для пересоздания интервала при изменении количества слайдов

//   // Вычисляем transformX для смещения слайдов
//   const transformX = -currentIndex * 100 + '%';

//   return (
//     <div className="carousel-container">
//       <div className="carousel-wrapper">
//         <div
//           className="carousel-slide-container"
//           style={{
//             transform: `translateX(${transformX})`,
//             width: `${slideCount * 100}%`,
//           }}
//           ref={carouselRef}
//         >
//           {React.Children.map(children, (child, index) => (
//             <div key={index} className="carousel-slide" style={{ width: `${100 / slideCount}%` }}>
//               {child}
//             </div>
//           ))}
//         </div>
//       </div>

//       <button className="carousel-button prev" onClick={prevSlide}>
//         &lt;
//       </button>
//       <button className="carousel-button next" onClick={nextSlide}>
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default CustomCarousel;