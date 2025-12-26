import { StaticImageData } from "next/image";

export interface ImageCarouselProps {
  onImageClick?: (index: number) => void;
}

export interface CarouselImage {
  src: StaticImageData;
  index: number;
}
