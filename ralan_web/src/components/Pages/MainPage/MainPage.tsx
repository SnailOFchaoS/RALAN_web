import Background from "@/components/Background/Background";
import FirstSlide from "./FirstSlide/FirstSlide";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide"
import YouWillFindSlide from "./YouWillFindSlide/YouWillFindSlide"
import TeamRepresentatives from "./TeamRepresentatives/TeamRepresentatives"

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
    </div>
  );
}
