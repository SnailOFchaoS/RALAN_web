import { useEffect, useRef, useState, RefObject } from "react";

import Background from "@/components/Background/Background";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide"
import YouWillFindSlide from "./YouWillFindSlide/YouWillFindSlide"
import TeamRepresentatives from "./TeamRepresentatives/TeamRepresentatives"
import OurOffersSlide from "./OurOffersSlide/OurOffersSlide"
import CallToActionSlide from "./CallToActionSlide/CallToActionSlide";
import Footer from "@/components/Footer/Footer";
import { MainPageProvider, TopContentEndPosition } from "./context";
import { NavigationElement } from "./MainPage.types";

import styles from './MainPage.module.scss'
import NavigationMenu from "@/components/Common/NavigationMenu/NavigationMenu";

export default function MainPage() {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };
  const [laptopScale, setLaptopScale] = useState<number>(1);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [mainLogoImageRef, setMainLogoImageRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [mainLogoTextRef, setMainLogoTextRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [mainLogoArrowRef, setMainLogoArrowRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [topContentEndPosition, setTopContentEndPosition] = useState<TopContentEndPosition | null>(null);
  const mainPageRef = useRef<HTMLDivElement>(null);

  const aboutUsSlideRef = useRef<HTMLDivElement>(null);
  const youWillFindSlide = useRef<HTMLDivElement>(null);
  const teamRepresentatives = useRef<HTMLDivElement>(null);
  const ourOffersSlide = useRef<HTMLDivElement>(null);

  const [navigationData, setNavigationData] = useState<NavigationElement[]>()

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			
			if (width >= 2560) {
				// 4K мониторы
				setLaptopScale(1);
			} else if (width > 1600) {
				// Десктоп (Full HD и стандартный)
				setLaptopScale(1);
			} else if (width > 1440) {
				// Большой ноутбук
				setLaptopScale(0.67);
			} else if (width > 1366) {
				// Средний ноутбук
				setLaptopScale(0.67);
			} else if (width > 1280) {
				// Маленький ноутбук
				setLaptopScale(0.67);
			} else {
				// Меньше 1280px (планшеты и т.д.)
				setLaptopScale(0.67);
			}
		};
	
		handleResize();
	
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

  useEffect(()=>{
    if(aboutUsSlideRef && youWillFindSlide && teamRepresentatives && ourOffersSlide){
      setNavigationData([{
        text: 'О НАС',
        ref: aboutUsSlideRef,
      }, {
        text: 'ВАС ЖДЕТ',
        ref: youWillFindSlide,
      }, {
        text: 'ПРЕДСТАВИТЕЛИ КОМАНДЫ',
        ref: teamRepresentatives,
      }, {
        text: 'УСЛУГИ',
        ref: ourOffersSlide,
      }
      ])
    }
  }, [aboutUsSlideRef, youWillFindSlide, teamRepresentatives, ourOffersSlide])

  return (
    <MainPageProvider value={{
      laptopScale, 
      mainPageRef,
      isMenuVisible, 
      setIsMenuVisible,
      mainLogoImageRef,
      setMainLogoImageRef,
      mainLogoTextRef,
      setMainLogoTextRef,
      mainLogoArrowRef,
      setMainLogoArrowRef,
      topContentEndPosition,
      setTopContentEndPosition,
    }}>
      <div className={styles.scaleWrapper} ref={mainPageRef}>
        <NavigationMenu navigationData={navigationData}/>
        <Background {...mainBackgroundProps} />
        <FirstSlide/>
        <div ref = {aboutUsSlideRef}>
          <AboutUsSlide/>
        </div>
        <div ref={youWillFindSlide}>
          <YouWillFindSlide/>
        </div>
        
        <div ref={teamRepresentatives}>
          <TeamRepresentatives/>
        </div>
        
        <div ref={ourOffersSlide}>
          <OurOffersSlide/>
        </div>
        <>
          <CallToActionSlide/>
        </>
        <Footer/>
      </div>
    </MainPageProvider>
    
  );
}
