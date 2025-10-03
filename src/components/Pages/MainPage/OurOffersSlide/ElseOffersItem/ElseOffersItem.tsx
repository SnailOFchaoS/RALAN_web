import { useState } from 'react';

import { useMainPageContext } from '../../context';
import styles from './ElseOffersItem.module.scss'
import ElseOfferInfo from './ElseOfferInfo/ElseOfferInfo';
import { ElseOfferInterface } from '@/components/Common/types';

const ElseOffersItem: React.FC<{mirror?: boolean, data: ElseOfferInterface}> = ({mirror = false, data}) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const laptopScale = useMainPageContext();

	return (
		<div className={styles.youWillFindInfoWrapper}>
			<div 
				className={styles.titleWrapper}
				onClick={() => setIsOpened(!isOpened)}
				style={{
					borderBottom: !isOpened ? `${3 * laptopScale}px solid #A8DADC` : `${3 * laptopScale}px solid transparent`,
				}}
			>
				{mirror ? (
					<>
						<div className={styles.arrowBlock}>
							<div 
								className={styles.arrowContainer}
								style={{
									backgroundColor: '#A8DADC',
									marginLeft: `${32 * laptopScale}px`,
									transform: isOpened ? 'rotate(180deg)' : 'none'
								}}
							/>
						</div>
						<div className={styles.textBlock}>
							<div 
								className={styles.allSubtitles}
								style={{
									justifyContent: `flex-end`,
								}}
							>
								а также
							</div>
							<p 
								className={styles.title}
								style={{
									color: '#A8DADC',
									textAlign: 'right'
								}}
							>
								{data.title}
							</p>
						</div>
					</>
				):(
					<>
						<div className={styles.textBlock}>
							<div 
								className={styles.allSubtitles}
							>
								а также
							</div>
							<p 
								className={styles.title}
								style={{
									color: '#A8DADC'
								}}
							>
								{data.title}
							</p>
						</div>
						<div className={styles.arrowBlock}>
							<div 
								className={styles.arrowContainer}
								style={{
									backgroundColor: '#A8DADC',
									transform: isOpened ? 'rotate(180deg)' : 'none',
									marginRight: `${32 * laptopScale}px`,
								}}
							/>
						</div>
					</>
				)}
			</div>
			{isOpened && (
				<ElseOfferInfo 
					mirror={mirror} 
					data={data}
				/>
			)}
		</div>
	)
}

export default ElseOffersItem;
