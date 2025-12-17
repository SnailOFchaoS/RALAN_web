import { StaticImageData } from "next/image";

export interface GalleryImageProps {
	image: StaticImageData;
	index: number;
	hoveredIndex: number | null;
	setHoveredIndex: (hoveredIndex: number | null) => void;
	isAnimationPlay: boolean;
	setIsAnimationPlay: (isAnimationPlay: boolean) => void;
	isShowingAnimationComplete: boolean;
}

