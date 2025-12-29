import { useRef } from "react";

import Background from "@/components/Background/Background";
import { MainPageProvider } from "@/components/Pages/MainPage/context";

import CallToActionSlide from "./CallToActionSlide/CallToActionSlide";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide";
import OurOffersSlide from "./OurOffersSlide/OurOffersSlide";
import YouWillFindSlide from "./YouWillFindSlide/YouWillFindSlide";

const MobileMainPage = () => {
	const mainPageRef = useRef<HTMLDivElement>(null);

	const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };

	const mobileContextValue = {
		laptopScale: 1,
		mainPageRef,
	};

	return (
		<MainPageProvider value={mobileContextValue}>
			<div ref={mainPageRef}>
				<Background {...mainBackgroundProps} />
				<FirstSlide />
				<AboutUsSlide />
				<YouWillFindSlide />
				<OurOffersSlide />
				<CallToActionSlide />
			</div>
		</MainPageProvider>
	)
}

export default MobileMainPage;
