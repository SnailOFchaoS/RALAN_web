interface RectData {
	top: number;
	left: number;
	width: number;
	height: number;
}

interface firstSlideAnimationProps {
	timeLine: gsap.core.Timeline;
	titleTextRef: React.RefObject<HTMLDivElement | null>;
	infoTextRef: React.RefObject<HTMLDivElement | null>;
	mainImage: HTMLDivElement;
	frameContainerRect: RectData;
	laptopScale: number;
}

interface frameContentAnimationProps {
	timeLine: gsap.core.Timeline;
	frameContainerRef: React.RefObject<HTMLDivElement | null>;
	bottomContentRef: React.RefObject<HTMLDivElement | null>;
	topContentRef: React.RefObject<HTMLDivElement | null>;
}

export const firstSlideAnimation = ({
	timeLine, 
	titleTextRef, 
	infoTextRef, 
	mainImage, 
	frameContainerRect,
	laptopScale,
}: firstSlideAnimationProps) => {

	timeLine.to(titleTextRef.current, {opacity: 0,}, 0);
	timeLine.to(infoTextRef.current, {opacity: 0,}, 0);
	timeLine.to(mainImage, {
		x: frameContainerRect.left,
		y: frameContainerRect.top,
		width: frameContainerRect.width,
		height: frameContainerRect.height,
		borderRadius: `${100 * laptopScale}px`,
		immediateRender: false,
		onUpdate: function() {2
			const brightnessValue = this.progress() * 0.5 + 0.5;
			(mainImage as HTMLElement).style.setProperty('filter', `brightness(${brightnessValue})`);
		},
	}, 0);

	timeLine.to(mainImage, {
		width: 0,
		height: 0,
		x: `${frameContainerRect?.width / 2 + frameContainerRect.left }px`,
		y: `${frameContainerRect?.height / 2 + frameContainerRect.top }px`,
		transformOrigin: "top center", 
	}, ">")

	return ;
}

export const frameContentAnimation = ({
	timeLine, 
	frameContainerRef, 
	bottomContentRef, 
	topContentRef
}: frameContentAnimationProps) => {

	const rect = frameContainerRef.current?.getBoundingClientRect();

	if(!rect) return;

	timeLine.to(frameContainerRef.current, {
		width: 0,
		height: 0,
		y: `${rect?.height / 2 }px`,
	}, "<")

	timeLine.to(bottomContentRef.current, {
		width: 0,
	}, "<")

	timeLine.to(topContentRef.current, {
		scale: 2,
		ease: "power2.inOut"
	}, "<")

	return;
}