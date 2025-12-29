import { YOU_WILL_FIND_SUBTITLES } from '../constants';
import { SectionTitleProps } from './SectionTitle.types';

import styles from './SectionTitle.module.scss';

const SectionTitle: React.FC<SectionTitleProps> = ({
  section,
  isOpened,
  isColored,
  onToggle
}) => {
  const displayColor = isColored ? section.openedColor : '#A8DADC';
  const borderColor = isColored ? 'transparent' : '#A8DADC';

  return (
    <div 
      className={styles.sectionTitleWrapper}
      onClick={onToggle}
      style={{ borderBottomColor: borderColor }}
    >
      <div className={styles.textBlock}>
        <div className={styles.subtitles}>
          {YOU_WILL_FIND_SUBTITLES.map((subtitle, index) => (
            <span key={subtitle.id}>
              <span 
                className={styles.subtitle}
                style={{
                  color: section.id === subtitle.id ? displayColor : '#FFFFF0'
                }}
              >
                {subtitle.title}
              </span>
              {index < YOU_WILL_FIND_SUBTITLES.length - 1 && (
                <span className={styles.subtitle}>,&nbsp;</span>
              )}
            </span>
          ))}
        </div>
        <p 
          className={styles.title}
          style={{ color: displayColor }}
        >
          {section.title}
        </p>
      </div>
      <div className={styles.arrowBlock}>
        <div 
          className={styles.arrow}
          style={{
            backgroundColor: displayColor,
            transform: isOpened ? 'rotate(180deg)' : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default SectionTitle;

