import Image from 'next/image';

import InfoBlock from '@/components/Common/InfoBlock/InfoBlock';
import ButtonWithArrow from '@/components/Common/ButtonWithArrow/ButtonWithArrow';
import { ElseOfferInfoProps } from './ElseOfferInfo.types';

import styles from './ElseOfferInfo.module.scss'

const ElseOfferInfo: React.FC<ElseOfferInfoProps> = ({mirror = false, data, onDetailsClick}) => {

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
			{data.textInfo.map((element: {title: string, data: string}, index: number) => {
				return(
					<div 
            key={index}
            className={`${styles.blockLine} ${mirror ? styles.mirror : ''}`}
          >
						<InfoBlock
							title={{
								text: element.title,
								blockWidth: 550,
								fontSize: 26,
								isRight: mirror,
							}}
							data={{
								text: element.data,
								blockWidth: 550,
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
			<ButtonWithArrow
				text='ПОДРОБНЕЕ'
				size={{width: 412, height: 85}}
				fontSize={24}
				onClick={onDetailsClick}
			/>
		</div>
		</div>
	);
}

export default ElseOfferInfo;
