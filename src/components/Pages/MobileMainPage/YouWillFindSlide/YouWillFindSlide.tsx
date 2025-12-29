import { useState, useCallback } from 'react';

import SectionTitle from './SectionTitle/SectionTitle';
import SectionContent from './SectionContent/SectionContent';
import { YOU_WILL_FIND_SECTIONS, YouWillFindSection } from './constants';

import styles from './YouWillFindSlide.module.scss';

const YouWillFindSlide: React.FC = () => {
  const [openedSections, setOpenedSections] = useState<number[]>([]);

  const handleToggleSection = useCallback((sectionId: number) => {
    setOpenedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const isSectionOpened = useCallback((sectionId: number) => 
    openedSections.includes(sectionId), 
    [openedSections]
  );

  return (
    <div className={styles.youWillFindSlideWrapper}>
      <h2 className={styles.mainTitle}>ВАС ЖДЁТ</h2>
      
      <div className={styles.sectionsContainer}>
        {YOU_WILL_FIND_SECTIONS.map((section: YouWillFindSection) => {
          const isOpened = isSectionOpened(section.id);
          
          return (
            <div key={section.id} className={styles.sectionWrapper}>
              <SectionTitle
                section={section}
                isOpened={isOpened}
                isColored={isOpened}
                onToggle={() => handleToggleSection(section.id)}
              />
              <SectionContent
                section={section}
                isOpened={isOpened}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouWillFindSlide;
