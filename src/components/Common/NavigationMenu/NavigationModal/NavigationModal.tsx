import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

import logoIco from '../../../../../assets/svg/logo_blue.svg';
import logoText from '../../../../../assets/svg/logo_text_blue.svg';
import navigationButtonArrowIcon from '../../../../../assets/svg/navigation_button_arrow.svg'
import { useMainPageContext } from "@/components/Pages/MainPage/context";

import styles from './NavigationModal.module.scss'

interface NavigationModalProps{
  isOpen: boolean, 
  setIsModalOpened: (isOpen: boolean) => void, 
  onCloseClick: boolean,
  navigationData: {
    text: string,
    ref: React.RefObject<HTMLDivElement | null>,
  }[] | undefined,
}

const NavigationModal = ({ 
  isOpen, 
  setIsModalOpened, 
  onCloseClick, 
  navigationData 
}: NavigationModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null)
  const logoTextRef = useRef<HTMLDivElement>(null)
  const logoArrowRef = useRef<HTMLDivElement>(null)
  const logoImageRef = useRef<HTMLDivElement>(null)
  const timeLineRef = useRef<gsap.core.Timeline>(null);
  const [isReversing, setIsReversing] = useState(false);

  const context = useMainPageContext();

  useEffect(() => {

    if (!contentRef.current) return;

    const timeLine = gsap.timeline({
      onReverseComplete: () => {
        setIsModalOpened(false)
      },

    });
    timeLineRef.current = timeLine;

    timeLine.fromTo(contentRef.current, {
      height: `0px`,
      width: `${168 * context.laptopScale}px`,
      x: `${(336 - 168) * context.laptopScale / 2}px`,
      y: `${-30 * context.laptopScale}px`
    }, {
      height: `${456 * context.laptopScale}px`,
      width: `${336 * context.laptopScale}px`,
      x: `0px`,
      y: `0px`,
      duration: 0.5,
    }, 0)

    timeLine.fromTo(logoRef.current, {
      height: `${77 * context.laptopScale}px`,
      width: `${168 * context.laptopScale}px`,
      top: `${-48 * context.laptopScale}px`,
      padding: `0 ${13 * context.laptopScale}px`,
    }, {
      height: `${100 * context.laptopScale}px`,
      width: `${296 * context.laptopScale}px`,
      padding: `0 ${24 * context.laptopScale}px`,
    }, 0)

    timeLine.fromTo(logoImageRef.current, {
      height: `${66 * context.laptopScale}px`,
      width: `${66 * context.laptopScale}px`,
    }, {
      height: `${60 * context.laptopScale}px`,
      width: `${60 * context.laptopScale}px`,
    }, '<')

    timeLine.fromTo(logoTextRef.current, {
      x: 200 * context.laptopScale,
    }, {
      x: `0px`,
    }, '<')

    timeLine.fromTo(logoArrowRef.current, {
      x: `0px`
    }, {
      x: 200 * context.laptopScale,
    }, '<')

    return () => {
      timeLine.kill();
    };

  }, [isOpen])

  useEffect(() => {

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (!isReversing) {
        if (!timeLineRef.current) return;
        setIsReversing(true);
        timeLineRef.current.reverse();

        timeLineRef.current.then(() => {
          setIsReversing(false);
        });
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, isReversing]);

  useEffect(() => {
    if (onCloseClick) {
      if (timeLineRef.current) {
        timeLineRef.current.reverse();
      }
    }
  }, [onCloseClick])

  const onLogoClicked = () => {
    if (timeLineRef.current) {
      timeLineRef.current.reverse();
    }
  }

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (timeLineRef.current) {
      timeLineRef.current.reverse();
    }
  };

  return (
    <div className={styles.navigationModalWrapper} >
      <div className={styles.topContentWrapper}>
        <div
          className={styles.topElement}
          onClick={() => onLogoClicked()}
          ref={logoRef}
        >
          <div className={styles.logoImageWrapper} ref={logoImageRef}>
            <Image
              src={logoIco}
              alt="ralan"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.logoTextWrapper} ref={logoTextRef}>
            <Image
              src={logoText}
              alt="ralan"
              className={styles.logoText}
            />
          </div>

          <div className={styles.logoArrowWrapper} ref={logoArrowRef}>
            <Image
              src={navigationButtonArrowIcon}
              alt="ralan"
              className={styles.logoArrow}
            />
          </div>
        </div>

      </div>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.modalRow} />
        {navigationData?.map((element: any, id: number) => (
          <div
            className={styles.modalRow}
            key={id}
          >
            <p className={styles.text} onClick={() => { scrollToSection(element.ref) }}>
              {element.text}
            </p>
          </div>
        ))}
        <div className={styles.modalRow} />
      </div>
    </div>
  )
}

export default NavigationModal;