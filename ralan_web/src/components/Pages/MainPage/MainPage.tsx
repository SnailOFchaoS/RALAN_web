import Background from "@/components/Background/Background";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide"
import YouWillFindSlide from "./YouWillFindSlide/YouWillFindSlide"
import TeamRepresentatives from "./TeamRepresentatives/TeamRepresentatives"
import OurOffersSlide from "./OurOffersSlide/OurOffersSlide"
import CallToActionSlide from "./CallToActionSlide/CallToActionSlide";

export default function MainPage() {

  const mainBackgroundProps = {
    backgroundColor: '#1A2344',
  };

  return (
    <div>
      <Background {...mainBackgroundProps} />
      <FirstSlide/>
      <AboutUsSlide/>
      <YouWillFindSlide/>
      <TeamRepresentatives/>
      <OurOffersSlide/>
      <CallToActionSlide/>
    </div>
  );
}
