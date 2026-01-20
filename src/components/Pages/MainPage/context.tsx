import { createContext, useContext, RefObject } from 'react';

export interface TopContentEndPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface MainPageContextType {
  laptopScale: number;
  mainPageRef: RefObject<HTMLDivElement | null>;
  mainLogoImageRef?: RefObject<HTMLDivElement | null> | null;
  setMainLogoImageRef?: (ref: RefObject<HTMLDivElement | null> | null) => void,
  mainLogoTextRef?: RefObject<HTMLDivElement | null> | null;
  setMainLogoTextRef?: (ref: RefObject<HTMLDivElement | null> | null) => void,
  mainLogoArrowRef?: RefObject<HTMLDivElement | null> | null;
  setMainLogoArrowRef?: (ref: RefObject<HTMLDivElement | null> | null) => void,
  isMenuVisible?: boolean;
  setIsMenuVisible?: (isMenuVisible: boolean) => void;
  topContentEndPosition?: TopContentEndPosition | null;
  setTopContentEndPosition?: (position: TopContentEndPosition | null) => void;
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