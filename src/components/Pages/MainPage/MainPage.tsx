import { use, useEffect, useRef, useState } from "react";

import Background from "@/components/Background/Background";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide"
import YouWillFindSlide from "./YouWillFindSlide/YouWillFindSlide"
import TeamRepresentatives from "./TeamRepresentatives/TeamRepresentatives"
import OurOffersSlide from "./OurOffersSlide/OurOffersSlide"
import CallToActionSlide from "./CallToActionSlide/CallToActionSlide";
import Footer from "@/components/Footer/Footer";
import { MainPageProvider } from "./context";

import styles from './MainPage.module.scss'
import NavigationMenu from "@/components/Common/NavigationMenu/NavigationMenu";

export default function MainPage() {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };

  const [laptopScale, setLaptopScale] = useState<number>(1);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const mainPageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 1366) {
				setLaptopScale(0.67);
			} else {
				setLaptopScale(1);
			}
		};
	
		handleResize();
	
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

  return (
    <MainPageProvider value={{laptopScale, mainPageRef, isMenuVisible, setIsMenuVisible}}>
      <div className={styles.scaleWrapper} ref={mainPageRef}>
        <NavigationMenu/>
        <Background {...mainBackgroundProps} />
        <FirstSlide/>
        <AboutUsSlide/>
        <YouWillFindSlide/>
        <TeamRepresentatives/>
        <OurOffersSlide/>
        <CallToActionSlide/>
        <Footer/>
      </div>
    </MainPageProvider>
    
  );
}
