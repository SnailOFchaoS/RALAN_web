import { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import MainPage from "@/components/Pages/MainPage/MainPage";
import MobileMainPage from "@/components/Pages/MobileMainPage/MobileMainPagr";
import { useIsMobile } from "@/components/Common/hooks/useIsMobile";
import { schemaOrgData } from "@/schema";
import { logVersion } from "@/version";
import type { Offer } from "@/store/slices/Offers/types";
import SeoOffersList from "@/components/SeoOffersList/SeoOffersList";

const OFFERS_API_URL = "https://ralan.pro/api/offers";

function sortOffersForSeo(list: Offer[]) {
  return [...list].sort((a, b) => {
    const aImportant = a.important === true ? 1 : 0;
    const bImportant = b.important === true ? 1 : 0;
    if (bImportant !== aImportant) return bImportant - aImportant;
    return a.price - b.price;
  });
}

export const getServerSideProps: GetServerSideProps<{
  initialOffers: Offer[];
}> = async () => {
  let initialOffers: Offer[] = [];
  try {
    const res = await fetch(OFFERS_API_URL);
    if (res.ok) {
      const json = await res.json();
      if (json?.data && Array.isArray(json.data)) {
        initialOffers = sortOffersForSeo(json.data);
      }
    }
  } catch {
  }
  return { props: { initialOffers } };
};

export default function Home({ initialOffers = [] }: { initialOffers?: Offer[] }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    logVersion();
  }, []);

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
      {initialOffers.length > 0 && <SeoOffersList offers={initialOffers} />}
      {isMobile === null ? null : isMobile ? <MobileMainPage initialOffers={initialOffers} /> : <MainPage initialOffers={initialOffers} />}
    </>
  );
}
