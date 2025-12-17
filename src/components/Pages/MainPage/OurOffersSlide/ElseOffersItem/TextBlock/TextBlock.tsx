import React from 'react';
import styles from './TextBlock.module.scss';
import { TextBlockProps } from './TextBlock.types';

const TextBlock: React.FC<TextBlockProps> = ({ title, mirror }) => {
	return (
		<div className={styles.textBlock}>
			<div 
				className={styles.allSubtitles}
				style={mirror ? { justifyContent: 'flex-end' } : undefined}
			>
				а также
			</div>
			<p 
				className={styles.title}
				style={{
					color: '#A8DADC',
					textAlign: mirror ? 'right' : undefined,
				}}
			>
				{title}
			</p>
		</div>
	);
};

export default TextBlock;

