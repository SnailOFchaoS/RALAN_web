import { useState } from "react";

import InfoBlock from "./InfoBlock/InfoBlock";
import ChosenImage from "./ChosenImage/ChosenImage";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import { GALLERY_IMAGES } from "./ImageCarousel/ImageCarousel.constants";

import styles from "./AboutUsSlide.module.scss"

const getRandomImage = () => {
	const randomIndex = Math.floor(Math.random() * GALLERY_IMAGES.length);
	return GALLERY_IMAGES[randomIndex];
};

const AboutUsSlide: React.FC = () => {
	const [selectedImage, setSelectedImage] = useState(getRandomImage);

	const handleImageClick = (index: number) => {
		setSelectedImage(GALLERY_IMAGES[index]);
	};

	return (
		<div className={styles.aboutUsSlideWrapper}>
			<div className={styles.leftSide}>
				<InfoBlock />
				<ChosenImage image={selectedImage} />
			</div>
			<div className={styles.rightSide}>
				<ImageCarousel onImageClick={handleImageClick} />
			</div>
		</div>
	)
}

export default AboutUsSlide;
