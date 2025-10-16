import { gsap } from "gsap";
import { useMainPageContext } from "../context";

interface RectData {
	top: number;
	left: number;
	width: number;
	height: number;
}

interface firstSlideAnimationProps {
	context: any;
	titleTextRef: React.RefObject<HTMLDivElement | null>;
	infoTextRef: React.RefObject<HTMLDivElement | null>;
	mainImage: HTMLDivElement;
	frameContainerRect: RectData;
	laptopScale: number;
}

interface frameContentAnimationProps {
	context: any;
  // logoTimeline: gsap.core.Timeline;
	frameContainerRef: React.RefObject<HTMLDivElement | null>;
	bottomContentRef: React.RefObject<HTMLDivElement | null>;
	topContentRef: React.RefObject<HTMLDivElement | null>;
	laptopScale: number;
}

export const getScrollTriggerOptions = ({context, firstSlideWrapper, laptopScale}: any) => {
	return {
		trigger: firstSlideWrapper,
		start: "top top",
		end: `+=${1400 * laptopScale}vh`,
		pin: true,
		scrub: 2,
		markers: true,
	}
}

export const firstSlideAnimation = ({
	context, 
	titleTextRef, 
	infoTextRef, 
	mainImage, 
	frameContainerRect,
	laptopScale,
}: firstSlideAnimationProps) => {

	if(!context.firstSlideTimeline) return;
	
	context.firstSlideTimeline.to(titleTextRef.current, {opacity: 0,}, 0);
	context.firstSlideTimeline.to(infoTextRef.current, {opacity: 0,}, 0);
	context.firstSlideTimeline.to(mainImage, {
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

	context.firstSlideTimeline.to(mainImage, {
		width: 0,
		height: 0,
		x: `${frameContainerRect?.width / 2 + frameContainerRect.left }px`,
		y: `${frameContainerRect?.height / 2 + frameContainerRect.top }px`,
		transformOrigin: "top center", 
	}, ">")

	return ;
}

export const frameContentAnimation = ({
	context, 
  // logoTimeline,
	frameContainerRef, 
	bottomContentRef, 
	topContentRef,
	laptopScale,
}: frameContentAnimationProps) => {

	// let context = useMainPageContext()
	// console.log("context:", context)
	if(!context?.firstSlideTimeline) return;

	const rect = frameContainerRef.current?.getBoundingClientRect();

	if(!rect || !topContentRef.current) return;

  const logoRect = topContentRef.current?.getBoundingClientRect();

	context.firstSlideTimeline.to(frameContainerRef.current, {
		width: 0,
		height: 0,
		y: `${rect?.height / 2 }px`,
	}, ">")


	return;
}

	// timeLine.to(bottomContentRef.current, {
	// 	width: 0,
	// }, "<")

	// timeLine.to(topContentRef.current, {
	// 	scale: 2,
	// 	ease: "power2.inOut"
	// }, "<")

  // logoTimeline.to(topContentRef.current, {
  //   width: `${84 * laptopScale}px`,
  //   height: `${38.5 * laptopScale}px`,
  //   y: `${logoRect.height += 138.5 * laptopScale}px`,
  //   opacity: 0.5,
  //   ease: "power2.inOut",
  // })
