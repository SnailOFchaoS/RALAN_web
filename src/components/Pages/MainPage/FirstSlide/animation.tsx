import { FirstSlideAnimationProps, FrameContentAnimationProps } from './animation.types';

export const firstSlideAnimation = ({
	timeLine, 
	titleTextRef, 
	infoTextRef, 
	backgroundWrapperRef,
	darkOverlayRef,
	frameContainerRect,
	laptopScale,
}: FirstSlideAnimationProps) => {

	const backgroundWrapper = backgroundWrapperRef.current;
	const darkOverlay = darkOverlayRef.current;
	if (!backgroundWrapper || !darkOverlay) return;

	timeLine.to(titleTextRef.current, {opacity: 0}, 0);
	timeLine.to(infoTextRef.current, {opacity: 0}, 0);
	
	timeLine.to(backgroundWrapper, {
		x: frameContainerRect.left,
		y: frameContainerRect.top,
		width: frameContainerRect.width,
		height: frameContainerRect.height,
		borderRadius: `${100 * laptopScale}px`,
		immediateRender: false,
	}, 0);

	timeLine.to(darkOverlay, {
		opacity: 0,
		ease: "none",
	}, 0);

	timeLine.addLabel("collapse");

	timeLine.to(backgroundWrapper, {
		width: 0,
		height: 0,
		x: `${frameContainerRect.width / 2 + frameContainerRect.left}px`,
		y: `${frameContainerRect.height / 2 + frameContainerRect.top}px`,
		transformOrigin: "center center", 
		ease: "power2.inOut",
	}, "collapse");

	timeLine.to(backgroundWrapper, {
		opacity: 0,
		duration: 0.1,
	}, ">");

	return;
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
}: FrameContentAnimationProps) => {

	const rect = frameContainerRef.current?.getBoundingClientRect();
	
	if(!rect || !topContentRef.current || !logoTimeline) return;

	const topContentRect = topContentRef.current?.getBoundingClientRect();
	
	const topOffsetPercent = 24.5;
	const topOffset = (window.innerHeight * topOffsetPercent / 100) * laptopScale;

	timeLine.to(frameContainerRef.current, {
		width: 0,
		height: 0,
		y: `${rect?.height / 2 }px`,
		ease: "power2.inOut",
	}, "collapse")

	timeLine.to(bottomContentRef.current, {
		width: 0,
		ease: "power2.inOut",
	}, "collapse")

	timeLine.to(topContentRef.current, {
		scale: 2,
		y: `${rect?.height / 2 }px`,
		ease: "power2.inOut",
	}, "collapse")

	logoTimeline.to(topContentRef.current, {
		width: `${168 / 2 * laptopScale}px`,
		height: `${77 / 2 * laptopScale}px`,
		x: (topContentRect.width - 168 / 2 * laptopScale) / 2,
		top: `-${topOffset}px`,
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
		x: -386 * laptopScale,
	}, '<')

	return;
}
