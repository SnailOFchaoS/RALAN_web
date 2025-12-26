import Image, { StaticImageData } from "next/image";
import styles from "./ChosenImage.module.scss";

interface ChosenImageProps {
	image: StaticImageData | null;
}

const ChosenImage = ({ image }: ChosenImageProps) => {
	return (
		<div className={styles.chosenImageWrapper}>
			{image && (
				<Image
					src={image}
					alt="chosen image"
					fill
					className={styles.image}
				/>
			)}
		</div>
	)
}

export default ChosenImage;
