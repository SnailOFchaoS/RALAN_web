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
import type { Offer } from "@/store/slices/Offers/types";

import styles from './MainPage.module.scss'
import NavigationMenu from "@/components/Common/NavigationMenu/NavigationMenu";

interface MainPageProps {
  initialOffers?: Offer[];
}

export default function MainPage({ initialOffers = [] }: MainPageProps) {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };
  const [laptopScale, setLaptopScale] = useState<number>(1);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [mainLogoImageRef, setMainLogoImageRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [mainLogoTextRef, setMainLogoTextRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [mainLogoArrowRef, setMainLogoArrowRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [topContentEndPosition, setTopContentEndPosition] = useState<TopContentEndPosition | null>(null);
  const [isAtDefaultPosition, setIsAtDefaultPosition] = useState<boolean>(false);
  const [isTopContentHidden, setIsTopContentHidden] = useState<boolean>(false);
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
				setLaptopScale(1);
			} else if (width > 1600) {
				setLaptopScale(1);
			} else if (width > 1440) {
				setLaptopScale(0.67);
			} else if (width > 1366) {
				setLaptopScale(0.67);
			} else if (width > 1280) {
				setLaptopScale(0.67);
			} else {
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
      isAtDefaultPosition,
      setIsAtDefaultPosition,
      isTopContentHidden,
      setIsTopContentHidden,
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
          <OurOffersSlide initialOffers={initialOffers} />
        </div>
        <>
          <CallToActionSlide/>
        </>
        <Footer/>
      </div>
    </MainPageProvider>
    
  );
}
