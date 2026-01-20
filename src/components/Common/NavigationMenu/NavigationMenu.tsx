import { useCallback, useState, memo, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";

import NavigationMenuButton from "./NavigationMenuButton/NavigationMenuButton";
import NavigationModal from "./NavigationModal/NavigationModal";
import Modal from "../Modal/Modal";
import { useMainPageContext } from "@/components/Pages/MainPage/context";
import { NavigationElement } from "./NavigationMenu.types";

import styles from "./NavigationMenu.module.scss"

const NavigationMenu = ({navigationData}: {navigationData: NavigationElement[]  | undefined}) => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [onCloseClick, setOnCloseClick] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isAnimatingToDefaultRef = useRef<boolean>(false);
	const context = useMainPageContext();
  const { isMenuVisible, topContentEndPosition, laptopScale, isAtDefaultPosition, setIsAtDefaultPosition, isTopContentHidden } = context;

  const defaultTop = useMemo(() => 18 * laptopScale, [laptopScale]);

  useEffect(() => {
    if (!isMenuVisible && setIsAtDefaultPosition) {
      setIsAtDefaultPosition(false);
    }
  }, [isMenuVisible, setIsAtDefaultPosition]);

  useEffect(() => {
    if (isTopContentHidden && !isAtDefaultPosition && wrapperRef.current && topContentEndPosition) {
      const currentTop = topContentEndPosition.top;

      if (Math.abs(currentTop - defaultTop) > 1) {
        isAnimatingToDefaultRef.current = true;
        gsap.to(wrapperRef.current, {
          top: defaultTop,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            isAnimatingToDefaultRef.current = false;
            setIsAtDefaultPosition?.(true);
          }
        });
      } else {

        setIsAtDefaultPosition?.(true);
      }
    }
  }, [isTopContentHidden, isAtDefaultPosition, topContentEndPosition, defaultTop, setIsAtDefaultPosition]);

	const handleCloseModal = useCallback(() => {
    setOnCloseClick(true);
  }, []);

  useEffect(()=> {
    if(isModalOpened){
      setOnCloseClick(false)
    }
  },[isModalOpened])

  const handleToggleModal = useCallback(() => {
    setIsModalOpened(prev => !prev);
  }, []);

  const positionStyles = useMemo(() => {

    if (!isMenuVisible || isModalOpened) {
      return {
        opacity: '0',
        pointerEvents: 'none' as const,
      };
    }

    if (isAtDefaultPosition) {
      return {
        opacity: '1',
        pointerEvents: 'auto' as const,
        cursor: 'pointer',
      };
    }

    if (topContentEndPosition && topContentEndPosition.top >= 0) {
      return {
        opacity: '1',
        top: `${topContentEndPosition.top}px`,
        pointerEvents: 'auto' as const,
        cursor: 'pointer',
      };
    }

    return {
      opacity: '1',
      pointerEvents: 'auto' as const,
      cursor: 'pointer',
    };
  }, [isMenuVisible, isModalOpened, isAtDefaultPosition, topContentEndPosition]);

	return (
		<>
			<div 
        ref={wrapperRef}
        className={styles.navigationMenuClosedWrapper}
        onClick={handleToggleModal}
        style={positionStyles}
      >
        <NavigationMenuButton isOpen={isModalOpened}/>
      </div>
			<Modal isOpen={isModalOpened} onClose={handleCloseModal} needBgAnimation={false}>
				<NavigationModal 
          isOpen={isModalOpened} 
          setIsModalOpened={setIsModalOpened} 
          onCloseClick={onCloseClick}
          navigationData={navigationData}
        />
			</Modal>
		</>
	);
}

export default  memo(NavigationMenu);