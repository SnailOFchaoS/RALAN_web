import { useEffect } from "react";
import Head from "next/head";
import MainPage from "@/components/Pages/MainPage/MainPage";
import MobileMainPage from "@/components/Pages/MobileMainPage/MobileMainPagr";
import { useIsMobile } from "@/components/Common/hooks/useIsMobile";
import { schemaOrgData } from "@/schema";
import { logVersion } from "@/version";

export default function Home() {
  const isMobile = useIsMobile();

  useEffect(() => {
    logVersion();
  }, []);

  if (isMobile === null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>RALAN — велотренировки в Москве</title>
        <meta name="description" content="Велотренировки в Москве. Научим кататься на шоссейном велосипеде с нуля, улучшим технику и подготовим к гонкам. Индивидуальные и групповые занятия." />
        <meta property="og:title" content="RALAN — велотренировки в Москве" />
        <meta property="og:description" content="Хочешь освоить шоссейный велосипед с нуля или улучшить технику? Подготовим к любительским гонкам и триатлону. Присоединяйся к команде RALAN!" />
        <meta name="twitter:title" content="RALAN — велотренировки в Москве" />
        <meta name="twitter:description" content="Велотренировки в Москве. Индивидуальные и групповые занятия на шоссейном велосипеде." />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </Head>
      {isMobile ? <MobileMainPage/> : <MainPage/>}
    </>
  );
}
