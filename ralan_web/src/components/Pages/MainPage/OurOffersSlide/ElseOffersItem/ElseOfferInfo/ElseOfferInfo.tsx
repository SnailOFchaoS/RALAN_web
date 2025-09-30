import Image from 'next/image';

import InfoBlock from '@/components/Common/InfoBlock/InfoBlock';
import { ElseOfferInterface } from '@/components/Common/types';

import styles from './ElseOfferInfo.module.scss'

const ElseOfferInfo: React.FC<{mirror?: boolean, data: ElseOfferInterface}> = ({mirror = false, data}: any) => {

	const imagePosition = {
		objectPosition: `${data.image?.positionX ?? 0}px ${data.image?.positionY ?? 0}px`
	}

	return (
		<div className={styles.elseOfferInfoWrapper}>
			<div className={styles.imageBlock}>
				<Image
					alt="person"
					className={styles.image}
					src={data.image.src}
					style={imagePosition}
				/>
			</div>
			{data.textInfo.map((element: any) => {
				return(
					<div className={`${styles.blockLine} ${mirror ? styles.mirror : ''}`}>
						<InfoBlock
							title={{
								text: element.title,
								blockWidth: 407,
								fontSize: 26,
								isRight: mirror,
							}}
							data={{
								text: element.data,
								blockWidth: 407,
								fontSize: 18,
								isRight: mirror,
							}}
						/>
					</div>
				)
			})}
			<div 
				className={styles.blockLine}
				style={{
					justifyContent: 'center',
					alignItems: 'flex-end',
				}}
			>
				<div className={styles.buttonWrapper}>
					<p className={styles.buttonText}>
						ПОДРОБНЕЕ
					</p>
					<div className={styles.arrowContainer}/>
				</div>
			</div>
		</div>
	);
}

export default ElseOfferInfo;