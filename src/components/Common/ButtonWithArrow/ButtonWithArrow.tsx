import { useMainPageContext } from "@/components/Pages/MainPage/context";

import styles from "./ButtonWithArrow.module.scss"

interface buttonInterFace {
	text?: string, 
	size?: {width: number, height: number}
	fontSize?: number,
}

const ButtonWithArrow: React.FC<buttonInterFace> = ({text, size, fontSize}) => {

	const laptopScale = useMainPageContext();

	return (
		<div 
			className={styles.buttonWrapper}
			style={{
				width: size ? `${size?.width * laptopScale}px` : '100%',
				height: size ? `${size?.height * laptopScale}px` : '100%'
			}}
		>
			<p 
				className={styles.buttonText}
				style={{fontSize: fontSize ? `${fontSize * laptopScale}px` : `${24 * laptopScale}px`}}
			>
				{text}
			</p>
			<div className={`${styles.arrowContainer} ${styles.arrowRight}`}/>
			<div className={`${styles.arrowContainer} ${styles.arrowLeft}`}/>
		</div>
	)
}

export default ButtonWithArrow;