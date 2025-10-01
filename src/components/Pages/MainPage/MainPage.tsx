import Background from "@/components/Background/Background";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide"
import YouWillFindSlide from "./YouWillFindSlide/YouWillFindSlide"
import TeamRepresentatives from "./TeamRepresentatives/TeamRepresentatives"
import OurOffersSlide from "./OurOffersSlide/OurOffersSlide"
import CallToActionSlide from "./CallToActionSlide/CallToActionSlide";
import Footer from "@/components/Footer/Footer";

import styles from './MainPage.module.scss'

export default function MainPage() {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };

  return (
    <div className={styles.scaleWrapper}>
      <Background {...mainBackgroundProps} />
      <FirstSlide/>
      <AboutUsSlide/>
      <YouWillFindSlide/>
      <TeamRepresentatives/>
      <OurOffersSlide/>
      <CallToActionSlide/>
      <Footer/>
    </div>
  );
}
