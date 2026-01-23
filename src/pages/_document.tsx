import { Html, Head, Main, NextScript } from "next/document";
import { tacticSansBold } from "@/fonts/fonts";

export default function Document() {
  return (
    <Html lang="ru" className={tacticSansBold.variable}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1A2344" />
        <meta name="author" content="RALAN TEAM" />

        <meta name="keywords" content="велоспорт, велотренировки, велотренер, шоссейный велосипед, триатлон, велокоманда, тренировки Москва, велоспорт Москва" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RALAN TEAM" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:url" content="https://ralan.pro" />
        <meta property="og:image" content="https://ralan.pro/og_image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ralan.pro/og_image.png" />
        
        <link rel="canonical" href="https://ralan.pro" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
