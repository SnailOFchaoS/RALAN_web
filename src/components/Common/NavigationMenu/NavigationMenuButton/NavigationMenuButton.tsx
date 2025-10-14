import Image from "next/image";

import { useMainPageContext } from "../../../Pages/MainPage/context";
import logoIcon from '../../../../../assets/svg/logo_blue.svg'
import navigationButtonArrowIcon from '../../../../../assets/svg/navigation_button_arrow.svg'

import styles from './NavigationMenuButton.module.scss'

const NavigationMenuButton = () => {

	const laptopScale = useMainPageContext().laptopScale;

	return (
		<div className={styles.navigationMenuButton}>
			<Image
				alt='logo'
				width={66 * laptopScale}
				height={66 * laptopScale}
				src={logoIcon}
			/>

			<Image
				alt='arrow'
				width={41 * laptopScale}
				src={navigationButtonArrowIcon}
			/>
		</div>
	);
}

export default NavigationMenuButton;