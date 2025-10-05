import styles from './Background.module.scss';

interface BackgroundProps {
  imageUrl?: string;
  backgroundColor?: string;
}

const Background = ({ imageUrl, backgroundColor }: BackgroundProps) => {
  // const backgroundStyles: React.CSSProperties = {
  //   backgroundColor: backgroundColor || '#1A2344', // Цвет по умолчанию, если не задан
  //   backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  // };

  // style={backgroundStyles}

  return (
    <div className={styles.fixedBackground} >

    </div>
  );
};

export default Background;