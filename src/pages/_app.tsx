import { useEffect } from 'react';
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/router';

import "@/styles/globals.css";

import { store } from '@/store';
import { tacticSansBold, tacticSansRegular, tacticSansMedium, montserrat } from "@/fonts/fonts";
import { useIsMobile } from "@/components/Common/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const inDevelopmentDesktop = false;
const inDevelopmentMobile = false;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (router.pathname === '/websiteInfo') return;
    
    if (inDevelopmentDesktop && isMobile === false) {
      router.replace('/websiteInfo');
    }
    
    if (inDevelopmentMobile && isMobile === true) {
      router.replace('/websiteInfo');
    }
  }, [router.pathname, isMobile]);

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
