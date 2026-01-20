import React from 'react';

export interface FrameComponentProps {
	children: React.ReactNode;
	onContainerReady: (rect: DOMRect) => void;
	frameContainerRef: React.RefObject<HTMLDivElement | null>;
	timeLine: gsap.core.Timeline | null;
	mainImageRef: React.RefObject<HTMLDivElement | null>;
}
