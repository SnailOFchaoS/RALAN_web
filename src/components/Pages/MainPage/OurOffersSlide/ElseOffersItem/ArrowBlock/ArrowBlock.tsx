import React, { forwardRef } from 'react';
import styles from './ArrowBlock.module.scss';
import { ArrowBlockProps } from './ArrowBlock.types';

const ArrowBlock = forwardRef<HTMLDivElement, ArrowBlockProps>(
	({ arrowTopOffset, arrowBottomOffset, isOpened }, ref) => {
		const arrowTransform = isOpened ? 'rotate(180deg)' : 'none';

		return (
			<div className={styles.newArrowBlock} ref={ref}>
				<div 
					className={styles.arrowContainer}
					style={{
						backgroundColor: '#A8DADC',
						top: arrowTopOffset,
						transform: arrowTransform,
					}}
				/>
				<div 
					className={styles.arrowContainer}
					style={{
						backgroundColor: '#A8DADC',
						top: arrowBottomOffset,
						transform: arrowTransform,
					}}
				/>
			</div>
		);
	}
);

ArrowBlock.displayName = 'ArrowBlock';

export default ArrowBlock;

