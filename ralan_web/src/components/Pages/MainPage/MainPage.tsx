import Background from "@/components/Background/Background";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide"

import styles from "./MainPage.module.scss"

export default function MainPage() {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344', // Пример: другой цвет
    // imageUrl: '/images/your-awesome-background.jpg', // Пример: другое изображение
  };

  return (
    <div>
      <Background {...mainBackgroundProps} />
      <FirstSlide/>
      <AboutUsSlide/>
    </div>
  );
}
