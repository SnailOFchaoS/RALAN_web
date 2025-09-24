import styles from './Background.module.scss'

interface BackgroundProps {
  children: React.ReactNode; 
}

const Background = ({children}: BackgroundProps) =>{

  return(
    <div className={styles.backgroundWrapper}>
      {children}
    </div>
  )
}

export default Background

