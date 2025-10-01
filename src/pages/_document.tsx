import { Html, Head, Main, NextScript } from "next/document";
import { tacticSansBold } from "@/fonts/fonts";

export default function Document() {
  return (
    <Html lang="en" className={tacticSansBold.variable}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
