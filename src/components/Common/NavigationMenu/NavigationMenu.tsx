import { useCallback, useState, memo, useEffect } from "react";

import NavigationMenuButton from "./NavigationMenuButton/NavigationMenuButton";
import NavigationModal from "./NavigationModal/NavigationModal";
import Modal from "../Modal/Modal";
import { useMainPageContext } from "@/components/Pages/MainPage/context";

import styles from "./NavigationMenu.module.scss"

interface NavigationElement{
  text: string,
  ref: React.RefObject<HTMLDivElement | null>,
}

const NavigationMenu = ({navigationData}: {navigationData: NavigationElement[]  | undefined}) => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [onCloseClick, setOnCloseClick] = useState<boolean>(false)
	const context = useMainPageContext();
  const { isMenuVisible, topContentEndPosition } = context;

	const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(()=> {
    if(isModalOpened){
      setOnCloseClick(false)
    }
  },[isModalOpened])

  // Позиционируем кнопку в том же месте, где заканчивается TopContent
  const getPositionStyles = () => {
    // Скрываем кнопку когда меню не видимо ИЛИ когда модалка открыта
    if (!isMenuVisible || isModalOpened) {
      return {
        opacity: '0',
        pointerEvents: 'none' as const,
      };
    }

    // Используем только top из координат TopContent, центрирование по X из CSS
    if (topContentEndPosition && topContentEndPosition.top >= 0) {
      return {
        opacity: '1',
        top: `${topContentEndPosition.top}px`,
        // left и transform остаются из CSS для центрирования
        pointerEvents: 'auto' as const,
        cursor: 'pointer',
      };
    }

    // Fallback на CSS позицию
    return {
      opacity: '1',
      pointerEvents: 'auto' as const,
      cursor: 'pointer',
    };
  };

	
	return (
		<>
			<div 
        className={styles.navigationMenuClosedWrapper}
        onClick={() => {setIsModalOpened(!isModalOpened)}}
        style={getPositionStyles()}
      >
        <NavigationMenuButton isOpen={isModalOpened}/>
      </div>
			<Modal isOpen={isModalOpened} onClose={handleCloseModal} needBgAnimation={false}>
				<NavigationModal 
          isOpen={isModalOpened} 
          setIsModalOpened={setIsModalOpened} 
          onCloseClick={onCloseClick}
          navigationData={navigationData}
        />
			</Modal>
		</>
		
	);
}

export default  memo(NavigationMenu);