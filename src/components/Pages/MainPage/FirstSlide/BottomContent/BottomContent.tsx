import { BottomContentProps } from './BottomContent.types';
import styles from "./BottomContent.module.scss"

const BottomContent = ({ onClick }: BottomContentProps) => {
  return (
    <div className={styles.bottomContent} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={styles.buttonText}>
        Начать тренировки
      </div>
    </div>
  )
} 

export default BottomContent;

  
