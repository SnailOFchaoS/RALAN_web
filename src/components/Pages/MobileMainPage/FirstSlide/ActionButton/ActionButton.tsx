import { forwardRef } from "react";

import { ActionButtonProps } from "./ActionButton.types";

import styles from "./ActionButton.module.scss";

const ActionButton = forwardRef<HTMLDivElement, ActionButtonProps>(({ onClick }, ref) => {
  return (
    <div className={styles.buttonContainer} onClick={onClick} ref={ref}>
      <span className={styles.buttonText}>НАЧАТЬ<br/>ТРЕНИРОВКИ</span>
    </div>
  );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
