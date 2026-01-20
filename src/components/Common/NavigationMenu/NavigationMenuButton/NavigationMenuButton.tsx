import { memo, useMemo } from "react";
import Image from "next/image";

import { useMainPageContext } from "../../../Pages/MainPage/context";
import logoIcon from '../../../../../assets/svg/logo_blue.svg'
import navigationButtonArrowIcon from '../../../../../assets/svg/navigation_button_arrow.svg'

import styles from './NavigationMenuButton.module.scss'

const NavigationMenuButton = memo(({isOpen}:{isOpen: boolean}) => {
	const { laptopScale } = useMainPageContext();

	const logoSize = useMemo(() => 66 * laptopScale, [laptopScale]);
	const arrowWidth = useMemo(() => 41 * laptopScale, [laptopScale]);

	const boxShadowStyle = useMemo(() => 
		!isOpen ? { boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.25)` } : undefined
	, [isOpen]);

	return (
		<div className={styles.navigationMenuButton} style={boxShadowStyle}>
			<Image
				alt='logo'
				width={logoSize}
				height={logoSize}
				src={logoIcon}
			/>

			<Image
				alt='arrow'
				width={arrowWidth}
				src={navigationButtonArrowIcon}
			/>
		</div>
	);
});

NavigationMenuButton.displayName = 'NavigationMenuButton';

export default NavigationMenuButton;