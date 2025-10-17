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
  logoTimeline?: gsap.core.Timeline;
	frameContainerRef: React.RefObject<HTMLDivElement | null>;
	bottomContentRef: React.RefObject<HTMLDivElement | null>;
	topContentRef: React.RefObject<HTMLDivElement | null>;
	laptopScale: number;
	mainLogoImageRef: React.RefObject<HTMLDivElement | null>;
	mainLogoTextRef: React.RefObject<HTMLDivElement | null>;
	mainLogoArrowRef: React.RefObject<HTMLDivElement | null>;
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
    ease: "power2.inOut",
	}, ">")

	return ;
}

export const frameContentAnimation = ({
	timeLine, 
  logoTimeline,
	frameContainerRef, 
	bottomContentRef, 
	topContentRef,
	laptopScale,
	mainLogoImageRef,
	mainLogoTextRef,
	mainLogoArrowRef,
}: frameContentAnimationProps) => {

	const rect = frameContainerRef.current?.getBoundingClientRect();
	
	if(!rect || !topContentRef.current || !logoTimeline) return;

	const topContentRect = topContentRef.current?.getBoundingClientRect();

	timeLine.to(frameContainerRef.current, {
		width: 0,
		height: 0,
		y: `${rect?.height / 2 }px`,
    ease: "power2.inOut",
	}, "<")

	timeLine.to(bottomContentRef.current, {
		width: 0,
    ease: "power2.inOut",
	}, "<")

	timeLine.to(topContentRef.current, {
		scale: 2,
    y: `${rect?.height / 2 }px`,
		ease: "power2.inOut",
	}, "<")

	logoTimeline.to(topContentRef.current, {
		width: `${168 / 2 * laptopScale}px`,
		height: `${77 / 2 * laptopScale}px`,
		x: (topContentRect.width - 168 / 2 * laptopScale) / 2,
		top: `-140px`,
		padding: `0 ${13 / 2 * laptopScale - 2}px`,
	}, 0)

	logoTimeline.to(mainLogoImageRef.current, {
		width: `${66 / 2 * laptopScale}px`,
		height: `${66 / 2 * laptopScale}px`,
		x: (topContentRect.width - 168 / 2 * laptopScale) / 2 - 66 / 2 * laptopScale - 8 * laptopScale,
	}, '<')

	logoTimeline.to(mainLogoTextRef.current, {
		x: 200 * laptopScale,
	}, '<')

	logoTimeline.to(mainLogoArrowRef.current, {
		width: `${41 / 2 * laptopScale}px`,
		height: `${41 / 2 * laptopScale}px`,
		x: -388 * laptopScale,
	}, '<')

	return;
}