import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';

import { useMainPageContext } from '../../context';
import { ELSE_OFFERS_ANIMATION_VALUES } from '../../constants';
import styles from './ElseOffersItem.module.scss'
import ElseOfferInfo from './ElseOfferInfo/ElseOfferInfo';
import ArrowBlock from './ArrowBlock/ArrowBlock';
import TextBlock from './TextBlock/TextBlock';
import { ElseOffersItemProps } from './ElseOffersItem.types';

const ElseOffersItem: React.FC<ElseOffersItemProps> = ({mirror = false, data, onDetailsClick}) => {
	const [isOpened, setIsOpened] = useState(false);
	const laptopScale = useMainPageContext().laptopScale;
	
	const contentRef = useRef<HTMLDivElement>(null);
	const newArrowBlockRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<GSAPTween | null>(null);
	const hoverAnimationRef = useRef<GSAPTween | null>(null);

	const scaledValues = useMemo(() => ({
		hoverY: ELSE_OFFERS_ANIMATION_VALUES.HOVER_Y * laptopScale,
		arrowTopOffset: ELSE_OFFERS_ANIMATION_VALUES.ARROW_TOP_OFFSET * laptopScale,
		arrowBottomOffset: ELSE_OFFERS_ANIMATION_VALUES.ARROW_BOTTOM_OFFSET * laptopScale,
		arrowMargin: 32 * laptopScale,
		borderWidth: 3 * laptopScale,
		contentHeight: 710 * laptopScale,
		contentMarginTop: 20 * laptopScale,
	}), [laptopScale]);

	useEffect(() => {
		if (!contentRef.current) return;

		animationRef.current = gsap.fromTo(contentRef.current, {
			height: 0,
			opacity: 1,
			marginTop: 0,
		}, {
			height: scaledValues.contentHeight,
			opacity: 1,
			marginTop: scaledValues.contentMarginTop,
			duration: 0.5,
			ease: "power2.out",
			paused: true,
		});

		return () => {
			animationRef.current?.kill();
		};
	}, [scaledValues.contentHeight, scaledValues.contentMarginTop]);

	useEffect(() => {
		if (!newArrowBlockRef.current) return;

		const fromY = isOpened ? scaledValues.hoverY : 0;
		const toY = isOpened ? 0 : scaledValues.hoverY;

		hoverAnimationRef.current = gsap.fromTo(
			newArrowBlockRef.current,
			{ y: fromY },
			{ y: toY, duration: 1, ease: "power2.out", paused: true }
		);

		return () => {
			hoverAnimationRef.current?.kill();
		};
	}, [isOpened, scaledValues.hoverY]);

	useEffect(() => {
		if (!animationRef.current) return;

		if (isOpened) {
			animationRef.current.play();
		} else {
			animationRef.current.reverse();
		}
	}, [isOpened]);

	const handleMouseEnter = useCallback(() => {
		if (!hoverAnimationRef.current) return;

		if (hoverAnimationRef.current.progress() !== 0) {
			hoverAnimationRef.current.restart();
		} else {
			hoverAnimationRef.current.play();
		}
	}, []);

	const handleMouseLeave = useCallback(() => {
		if (!newArrowBlockRef.current) return;
		gsap.set(newArrowBlockRef.current, { y: 0 });
	}, []);

	const handleClick = useCallback(() => {
		setIsOpened(prev => !prev);
	}, []);

	return (
		<div className={styles.youWillFindInfoWrapper}>
			<div 
				className={styles.titleWrapper}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					borderBottom: isOpened ? 'none' : `${scaledValues.borderWidth}px solid #A8DADC`,
				}}
			>
				{mirror ? (
					<>
						<div className={styles.arrowWrapper} style={{ marginLeft: scaledValues.arrowMargin }}>
							<ArrowBlock
								ref={newArrowBlockRef}
								arrowTopOffset={scaledValues.arrowTopOffset}
								arrowBottomOffset={scaledValues.arrowBottomOffset}
								isOpened={isOpened}
							/>
						</div>
						<TextBlock title={data.title} mirror={mirror} />
					</>
				) : (
					<>
						<TextBlock title={data.title} mirror={mirror} />
						<div className={styles.arrowWrapper} style={{ marginRight: scaledValues.arrowMargin }}>
							<ArrowBlock
								ref={newArrowBlockRef}
								arrowTopOffset={scaledValues.arrowTopOffset}
								arrowBottomOffset={scaledValues.arrowBottomOffset}
								isOpened={isOpened}
							/>
						</div>
					</>
				)}
			</div>
			<div 
				ref={contentRef} 
				style={{ 
					overflow: 'hidden', 
					height: 0, 
					opacity: 0,
					marginTop: 0,
				}}
			>
				<ElseOfferInfo 
					mirror={mirror} 
					data={data}
					onDetailsClick={onDetailsClick}
				/>
			</div>
		</div>
	)
}

export default ElseOffersItem;
