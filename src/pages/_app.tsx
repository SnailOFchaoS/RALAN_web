import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { tacticSansBold, tacticSansRegular, tacticSansMedium, montserrat } from "@/fonts/fonts";
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <style jsx global>{`
        :root {
          --tactic-sans-bold: ${tacticSansBold.style.fontFamily};
          --tactic-sans-regular: ${tacticSansRegular.style.fontFamily};
          --tactic-sans-medium: ${tacticSansMedium.style.fontFamily};
          
          --montserrat: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;