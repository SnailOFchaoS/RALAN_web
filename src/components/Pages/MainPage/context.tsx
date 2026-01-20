import { createContext, useContext } from 'react';
import { MainPageContextType, TopContentEndPosition } from './MainPage.types';

export type { TopContentEndPosition };

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