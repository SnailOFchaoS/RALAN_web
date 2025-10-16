import { createContext, useContext, RefObject } from 'react';

interface MainPageContextType {
  laptopScale: number;
  mainPageRef: RefObject<HTMLDivElement | null>;
  isMenuVisible?: boolean;
  setIsMenuVisible?: (isMenuVisible: boolean) => void;
  firstSlideTimeline?: gsap.core.Timeline; 
  setFirstSlideTimeline?: (timeLine: gsap.core.Timeline) => void;
  logoTimeline?: gsap.core.Timeline; 
  setLogoTimeline?: (timeLine: gsap.core.Timeline) => void;
}

const MainPageContext = createContext<MainPageContextType | null>(null);

export const useMainPageContext = () => {
  const context = useContext(MainPageContext);
  if (context === null) {
    throw new Error('useMainPageContext must be used within a MainPageProvider');
  }
  return context;
};

export const MainPageProvider = MainPageContext.Provider;
export default MainPageContext;