import { Html, Head, Main, NextScript } from "next/document";
import { tacticSansBold } from "@/fonts/fonts";

export default function Document() {
  return (
    <Html lang="en" className={tacticSansBold.variable}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
