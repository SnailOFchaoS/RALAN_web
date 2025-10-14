import { useState } from "react";

import NavigationMenuButton from "./NavigationMenuButton/NavigationMenuButton";
import NavigationModal from "./NavigationModal/NavigationModal";

import styles from "./NavigationMenu.module.scss"

const NavigationMenu = ({}) => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

	return (
		<>
			{!isModalOpened ? (
				<div 
					className={styles.navigationMenuClosedWrapper}
					onClick={() => {setIsModalOpened(!isModalOpened)}}
				>
					<NavigationMenuButton/>
				</div>
			) : (
				<div className={styles.navigationMenuOpenedWrapper}>
					<NavigationModal/>
				</div>
			)}
		</>
		
	);
}

export default NavigationMenu;