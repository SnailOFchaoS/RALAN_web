import { useCallback, useState, memo, useEffect, useRef } from "react";
import gsap from "gsap";

import NavigationMenuButton from "./NavigationMenuButton/NavigationMenuButton";
import NavigationModal from "./NavigationModal/NavigationModal";
import Modal from "../Modal/Modal";
import { useMainPageContext } from "@/components/Pages/MainPage/context";

import styles from "./NavigationMenu.module.scss"

const NavigationMenu = ({}) => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
	const bottomContentRef = useRef<HTMLDivElement>(null);
	const context = useMainPageContext();

	const handleCloseModal = useCallback(() => {
    setIsModalOpened(false);
  }, []);

	useEffect(()=> {
		if(context && context.isMenuVisible){
			
		}
	}, [context.isMenuVisible])
	

	return (
		<>
			{!isModalOpened ? (
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
					<NavigationMenuButton/>
				</div>
			) : (
				<></>
			)}
			<Modal isOpen={isModalOpened} onClose={handleCloseModal}>
				<NavigationModal/>
			</Modal>
		</>
		
	);
}

export default  memo(NavigationMenu);