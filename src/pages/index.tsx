import MainPage from "@/components/Pages/MainPage/MainPage";
import MobileMainPage from "@/components/Pages/MobileMainPage/MobileMainPagr";
import { useIsMobile } from "@/components/Common/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <>
      {isMobile ? <MobileMainPage/> : <MainPage/>}
    </>
  );
}
