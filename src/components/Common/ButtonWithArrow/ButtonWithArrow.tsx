import styles from "./ButtonWithArrow.module.scss"

interface buttonInterFace {
	text?: string, 
	size?: {width: number, height: number}
	fontSize?: number,
}

const ButtonWithArrow: React.FC<buttonInterFace> = ({text, size, fontSize}) => {
	return (
		<div 
			className={styles.buttonWrapper}
			style={{
				width: size ? `${size?.width}px` : '100%',
				height: size ? `${size?.height}px` : '100%'
			}}
		>
			<p 
				className={styles.buttonText}
				style={{fontSize: fontSize ? `${fontSize}px` : `24px`}}
			>
				{text}
			</p>
			<div className={`${styles.arrowContainer} ${styles.arrowRight}`}/>
			<div className={`${styles.arrowContainer} ${styles.arrowLeft}`}/>
		</div>
	)
}

export default ButtonWithArrow;