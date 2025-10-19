import { useCallback, useState, memo, useEffect, useRef } from "react";

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

	const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(()=> {
    if(isModalOpened){
      setOnCloseClick(false)
    }
  },[isModalOpened])

	
	return (
		<>
			<div 
        className={styles.navigationMenuClosedWrapper}
        onClick={() => {setIsModalOpened(!isModalOpened)}}
        style={!context.isMenuVisible ? 
          {
            opacity: '0',
          } : {
            pointerEvents: `auto`,
            cursor: 'pointer',
          }}
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