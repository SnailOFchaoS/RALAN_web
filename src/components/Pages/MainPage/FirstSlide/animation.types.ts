import React from 'react';

export interface RectData {
	top: number;
	left: number;
	width: number;
	height: number;
}

export interface FirstSlideAnimationProps {
	timeLine: gsap.core.Timeline;
	titleTextRef: React.RefObject<HTMLDivElement | null>;
	infoTextRef: React.RefObject<HTMLDivElement | null>;
	backgroundWrapperRef: React.RefObject<HTMLDivElement | null>;
	darkOverlayRef: React.RefObject<HTMLDivElement | null>;
	frameContainerRect: RectData;
	laptopScale: number;
}

export interface FrameContentAnimationProps {
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
