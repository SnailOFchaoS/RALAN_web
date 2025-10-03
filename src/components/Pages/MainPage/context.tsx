import { createContext, useContext } from 'react';

// 1. Создаем контекст. Начальное значение может быть любым (null, undefined, или значение по умолчанию)
const MainPageContext = createContext<number>(1);

// 2. Создаем кастомный хук для удобного использования
export const useMainPageContext = () => {
  const context = useContext(MainPageContext);
  if (context === undefined) {
    throw new Error('useExampleContext must be used within an ExampleProvider');
  }
  return context;
};

// 3. Экспортируем провайдер и сам контекст (если он нужен для объявления типа)
export const MainPageProvider = MainPageContext.Provider;
export default MainPageContext;