import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { useMainPageContext } from "../../../context";

import styles from "./GalleryImage.module.scss"

interface GalleryImageProps{
	image: StaticImageData;
	index: number;
	hoveredIndex: number | null;
	setHoveredIndex: (hoveredIndex: number | null) => void;
	isAnimationPlay: boolean;
	setIsAnimationPlay: (isAnimationPlay: boolean) => void;
}

const GalleryImage = ({image, index, hoveredIndex, setHoveredIndex, isAnimationPlay, setIsAnimationPlay}: GalleryImageProps) => {
	const imageRef = useRef<HTMLDivElement>(null);
  const hoverAnimationRef = useRef<GSAPTween | null>(null);
	const accompanyingRightAnimationRef = useRef<GSAPTween | null>(null);
	const accompanyingLeftAnimationRef = useRef<GSAPTween | null>(null);
	const accompanyingTopAnimationRef = useRef<GSAPTween | null>(null);
	const accompanyingBottomAnimationRef = useRef<GSAPTween | null>(null);

	const contex = useMainPageContext();

	const itemWidth = 244 * contex.laptopScale;
	const itemHeight = 196 * contex.laptopScale;
	const enlargedWidth = 508 * contex.laptopScale;
	const enlargedHeight = 416 * contex.laptopScale;
	const gapHorizontal = 20 * contex.laptopScale;
	const gapVertical = 24 * contex.laptopScale;

	const getPosition = (index: number) => {
		const leftPosition = (index % 3) * (itemWidth + gapHorizontal);
		const topPosition = Math.floor(index / 3) * (itemHeight + gapVertical);
		return {
			leftPosition,
			topPosition,
		};
	}

	const getNewPosition = (index: number) => {
		const topPosition = index >= 6 ? -1 * (enlargedHeight + gapVertical) / 2 : 0;
		const leftPosition = (index % 3 === 2) ? -1 * (enlargedWidth + gapHorizontal) / 2 : 0;
		return {
			leftPosition,
			topPosition,
		};
	}

	const handleMouseEnter = () => {
    if (hoverAnimationRef.current) {
			setHoveredIndex(index)
      hoverAnimationRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (hoverAnimationRef.current) {
			setHoveredIndex(null)
      hoverAnimationRef.current.reverse();
    }
  };


	const needAnimation = (index: number) => {
		if(hoveredIndex == null)
			return null;

		if(index === hoveredIndex)
			return null;

		if(index !== 4)
			return null;

		if(hoveredIndex < 6){
			const rowDiff = Math.floor(index / 3) - Math.floor(hoveredIndex / 3);
			if(rowDiff <= 1 && rowDiff >= 0){
				if(hoveredIndex % 3 < 2){
					if(index % 3 > hoveredIndex % 3){
						console.log('right');
						return "right";
					}
					if(index % 3 === hoveredIndex % 3)
						console.log('bottom');
						return "bottom"
				}
				if(hoveredIndex % 3 === 2){
					if(index % 3 < hoveredIndex % 3){
						console.log('left');
						return "left";
					}
					if(index % 3 === hoveredIndex % 3)
						console.log('bottom');
						return "bottom"
				}
			}
		}
			
		if(hoveredIndex >= 6){
			const rowDiff = Math.floor(index / 3) - Math.floor(hoveredIndex / 3);
			if(rowDiff <= 1 && rowDiff >= 0){

			}
		}
			// return 'left'

		return null;
	}

	useEffect(() => {
		if(!contex.laptopScale){
			return ;
		}

    if (imageRef.current) {
      const currentElement = imageRef.current;

      hoverAnimationRef.current = gsap.to(currentElement, {
        x: getNewPosition(index).leftPosition,
        y: getNewPosition(index).topPosition,
        width: enlargedWidth,
        height: enlargedHeight,
				borderRadius: 60,
        duration: 0.3,
        ease: "power2.out",
        zIndex: 2,
        paused: true,
      });

			accompanyingRightAnimationRef.current = gsap.to(currentElement, {
				x: itemWidth + gapHorizontal,
				duration: 0.3,
        ease: "power2.out",
				paused: true,
			})

			accompanyingLeftAnimationRef.current = gsap.to(currentElement, {
				x: -1 * (itemWidth + gapHorizontal),
				duration: 0.3,
        ease: "power2.out",
				paused: true,
			})

			accompanyingTopAnimationRef.current = gsap.to(currentElement, {
				y: -1 * (itemHeight + gapVertical),
				duration: 0.3,
        ease: "power2.out",
				paused: true,
			})

			accompanyingBottomAnimationRef.current = gsap.to(currentElement, {
				y: itemHeight + gapVertical,
				duration: 0.3,
        ease: "power2.out",
				paused: true,
			})
    }

    return () => {
      hoverAnimationRef.current?.revert()
      hoverAnimationRef.current?.kill();
			accompanyingRightAnimationRef.current?.revert()
      accompanyingRightAnimationRef.current?.kill();
			accompanyingLeftAnimationRef.current?.revert()
      accompanyingLeftAnimationRef.current?.kill();
			accompanyingTopAnimationRef.current?.revert()
      accompanyingTopAnimationRef.current?.kill();
			accompanyingBottomAnimationRef.current?.revert()
      accompanyingBottomAnimationRef.current?.kill();
    };
  }, [contex])

	useEffect(() => {
		if(
			!accompanyingRightAnimationRef.current ||
			!accompanyingLeftAnimationRef.current ||
			!accompanyingTopAnimationRef.current ||
			!accompanyingBottomAnimationRef.current
		){
			return;
		}

		const animetionPosition = needAnimation(index);

		if(animetionPosition === 'left'){
			accompanyingLeftAnimationRef.current.play();
			return;
		}
		if(animetionPosition === 'right'){
			accompanyingRightAnimationRef.current.play();
			return;
		}
		if(animetionPosition === 'bottom'){
			accompanyingBottomAnimationRef.current.play();
			return;
		}

		accompanyingLeftAnimationRef.current.reverse();
		accompanyingRightAnimationRef.current.reverse();
		accompanyingBottomAnimationRef.current.reverse();

		return ;
	}, [hoveredIndex])
	
	return (
		<div
			ref={imageRef}
			key={index}
			className={styles.galleryItem}
			style={{
				position: 'absolute',
				left: getPosition(index).leftPosition,
				top: getPosition(index).topPosition,
				width: itemWidth,
				height: itemHeight,
			}}
			onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
		>
			<Image
				src={image}
				alt={`Gallery image ${index + 1}`}
				layout="fill"
				objectFit="cover"
				priority
			/>
		</div>
	);
}

export default GalleryImage;