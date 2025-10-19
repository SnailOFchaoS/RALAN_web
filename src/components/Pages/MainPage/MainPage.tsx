import { useEffect, useRef, useState, RefObject } from "react";

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

interface NavigationElement{
  text: string,
  ref: React.RefObject<HTMLDivElement | null>,
}

export default function MainPage() {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };
  const [laptopScale, setLaptopScale] = useState<number>(1);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [mainLogoImageRef, setMainLogoImageRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [mainLogoTextRef, setMainLogoTextRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const [mainLogoArrowRef, setMainLogoArrowRef] = useState<RefObject<HTMLDivElement | null> | null>(null);
  const mainPageRef = useRef<HTMLDivElement>(null);

  const aboutUsSlideRef = useRef<HTMLDivElement>(null);
  const youWillFindSlide = useRef<HTMLDivElement>(null);
  const teamRepresentatives = useRef<HTMLDivElement>(null);
  const ourOffersSlide = useRef<HTMLDivElement>(null);

  const [navigationData, setNavigationData] = useState<NavigationElement[]>()

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
