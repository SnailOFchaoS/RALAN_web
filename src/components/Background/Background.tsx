import styles from './Background.module.scss';

interface BackgroundProps {
  imageUrl?: string;
  backgroundColor?: string;
}

const Background = ({ imageUrl, backgroundColor }: BackgroundProps) => {
  return (
    <div className={styles.fixedBackground} >
      <div className={styles.noizeBackground}>

      </div>
    </div>
  );
};

export default Background;