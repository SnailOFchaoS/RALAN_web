import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { tacticSansBold, tacticSansRegular, montserrat } from "@/fonts/fonts";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          /* Применяем CSS-переменные к корневому элементу документа (:root) */
          --tactic-sans-bold: ${tacticSansBold.style.fontFamily};
          --tactic-sans-regular: ${tacticSansRegular.style.fontFamily};
          --montserrat: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default App;