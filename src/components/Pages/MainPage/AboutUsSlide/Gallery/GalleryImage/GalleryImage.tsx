import { useEffect, useRef, useMemo, useCallback } from "react";
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
	isShowingAnimationComplete: boolean;
}

const GalleryImage = ({
	image, 
	index, 
	hoveredIndex, 
	setHoveredIndex, 
	isAnimationPlay, 
	setIsAnimationPlay,
	isShowingAnimationComplete
}: GalleryImageProps) => {
	const imageRef = useRef<HTMLDivElement>(null);
  const animationRefs = useRef<Record<string, GSAPTween | null>>({
    hover: null,
    right: null,
    left: null,
    top: null,
    bottom: null,
  });
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const animationDelay = 150;

	const context = useMainPageContext();

	const itemWidth = useMemo(() => 244 * context.laptopScale, [context.laptopScale]);
	const itemHeight = useMemo(() => 196 * context.laptopScale, [context.laptopScale]);
	const enlargedWidth = useMemo(() => 508 * context.laptopScale, [context.laptopScale]);
	const enlargedHeight = useMemo(() => 416 * context.laptopScale, [context.laptopScale]);
	const gapHorizontal = useMemo(() => 20 * context.laptopScale, [context.laptopScale]);
	const gapVertical = useMemo(() => 24 * context.laptopScale, [context.laptopScale]);

	const getPosition = useCallback((index: number) => {
		return {
			leftPosition: (index % 3) * (itemWidth + gapHorizontal),
			topPosition: Math.floor(index / 3) * (itemHeight + gapVertical),
		};
	}, [itemWidth, itemHeight, gapHorizontal, gapVertical]);

	const getNewPosition = useCallback((index: number) => {
		return {
			leftPosition: (index % 3 === 2) ? -1 * (enlargedWidth + gapHorizontal) / 2 : 0,
			topPosition: index >= 6 ? -1 * (enlargedHeight + gapVertical) / 2 : 0,
		};
	}, [enlargedWidth, enlargedHeight, gapHorizontal, gapVertical]);

	const handleMouseEnter = () => {
		if(!isShowingAnimationComplete) return;

    if (isAnimationPlay) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (isAnimationPlay) {
        return;
      }
      if (animationRefs.current.hover) {
        setHoveredIndex(index);
      }
    }, animationDelay);
  };

	const handleMouseLeave = () => {
		if(!isShowingAnimationComplete) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (animationRefs.current.hover) {
        setHoveredIndex(null);
      }
    }, animationDelay);
  };

	const needAnimation = useCallback((index: number) => {
		if(hoveredIndex == null || index === hoveredIndex) 
			return null;

		const rowDiff = Math.floor(index / 3) - Math.floor(hoveredIndex / 3);
		const columnDiff = index % 3 - hoveredIndex % 3;

		if(hoveredIndex < 6){
			if(rowDiff <= 1 && rowDiff >= 0){
				if(hoveredIndex % 3 < 2 && index % 3 > hoveredIndex % 3){
					return "right";
				}
				if(hoveredIndex % 3 === 2 && index % 3 < hoveredIndex % 3){
					return "left";
				}
			}
			if(columnDiff === 0 && rowDiff > 0) return "bottom";
		}
		if(hoveredIndex >= 6){
			const rowDiff = Math.floor(index / 3) - Math.floor(hoveredIndex / 3);
			if(rowDiff <= 0 && rowDiff >= -1){
				if(hoveredIndex % 3 < 2 && index % 3 > hoveredIndex % 3){
					return "right";
				}
				if(hoveredIndex % 3 === 2 && index % 3 < hoveredIndex % 3){
					return "left";
				}
			}
			if(columnDiff === 0 && rowDiff < 0) return "top";
		}

		return null;
	}, [hoveredIndex]);

	useEffect(() => {
		if (!context.laptopScale) return;

		if(!isShowingAnimationComplete) return;

		if (!imageRef.current) return;

		const el = imageRef.current;
		animationRefs.current.hover = gsap.fromTo(el, {
			x:0,
			y:0,
			width: itemWidth,
			height: itemHeight,
			borderRadius: 40,
		}, {
			x: getNewPosition(index).leftPosition,
			y: getNewPosition(index).topPosition,
			width: enlargedWidth,
			height: enlargedHeight,
			borderRadius: 60,
			duration: 0.3,
			ease: "power2.out",
			zIndex: 2,
			paused: true,
			onStart: () => setIsAnimationPlay(true),
			onComplete: () => setIsAnimationPlay(false),
			onReverseStart: () => setIsAnimationPlay(true),
			onReverseComplete: () => setIsAnimationPlay(false),
		});
		const configs = [
      { key: "right", x: itemWidth + gapHorizontal, y: 0 },
      { key: "left", x: -1 * (itemWidth + gapHorizontal), y: 0 },
      { key: "top", x: 0, y: -1 * (itemHeight + gapVertical) },
      { key: "bottom", x: 0, y: itemHeight + gapVertical },
    ];
    configs.forEach(({key, x, y}) => {
      animationRefs.current[key] = gsap.fromTo(el, { x: 0, y: 0 }, { x, y, duration: 0.3, ease: "power2.out", paused: true });
    });
		return () => {
      Object.values(animationRefs.current).forEach(anim => { anim?.revert(); anim?.kill(); });
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [
		context.laptopScale, 
		itemWidth, 
		itemHeight, 
		enlargedWidth, 
		enlargedHeight, 
		gapHorizontal, 
		gapVertical, 
		index, 
		getNewPosition, 
		setIsAnimationPlay, 
		isShowingAnimationComplete
	]);

	useEffect(() => {
		const anims = animationRefs.current;
		if (!anims.right || !anims.left || !anims.top || !anims.bottom || !anims.hover) return;
		if (isAnimationPlay) return;
		if (index === hoveredIndex) anims.hover.play();
		else anims.hover.reverse();
		const pos = needAnimation(index);
		if (pos && anims[pos]) { anims[pos]!.play(); return; }
		["left", "right", "bottom", "top"].forEach(key => anims[key]?.reverse());
	}, [hoveredIndex, isAnimationPlay, index, needAnimation]);

	return (
		<div
			ref={imageRef}
			key={index}
			className={styles.galleryItem}
			style={{
				position: "absolute",
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