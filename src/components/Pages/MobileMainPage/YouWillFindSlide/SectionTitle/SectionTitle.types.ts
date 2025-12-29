import { YouWillFindSection } from '../constants';

export interface SectionTitleProps {
  section: YouWillFindSection;
  isOpened: boolean;
  isColored: boolean;
  onToggle: () => void;
}

