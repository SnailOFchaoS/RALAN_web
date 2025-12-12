import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean, 
  onClose: () => void, 
  children: React.ReactNode, 
  needBgAnimation: boolean,
}

const Modal = ({ isOpen, onClose, children, needBgAnimation = true }: ModalProps) => {
  const rootDivRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<gsap.core.Timeline>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let modalRoot = document.getElementById('modal-root') as HTMLDivElement;
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
    rootDivRef.current = modalRoot;
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!modalRef.current || !isMounted) return;

    const timeLine = gsap.timeline({
      onReverseComplete: () => {
        onClose && onClose();
      },
    });
    timeLineRef.current = timeLine;

    if (isOpen && needBgAnimation) {
      timeLine.fromTo(
        modalRef.current,
        {
          backgroundColor: `rgba(26, 35, 68, 0)`,
          backdropFilter: `blur(0px)`
        },
        {
          backgroundColor: `rgba(26, 35, 68, 0.5)`,
          backdropFilter: `blur(10px)`,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: false,
        }
      );
    } else if (needBgAnimation) {
      timeLine.to(
        modalRef.current,
        {
          backgroundColor: `rgba(26, 35, 68, 0)`,
          backdropFilter: `blur(0px)`,
          duration: 0.5,
          ease: "power2.in",
          immediateRender: false,
        }
      );
    }

    return () => {
      timeLine.kill();
    };
  }, [isOpen, isMounted, needBgAnimation]);

  const onCliseClick = (event: React.MouseEvent) => {
    if(event.target === modalRef.current){
        if (needBgAnimation && timeLineRef.current) {
          timeLineRef.current.reverse();
        } else {
          onClose && onClose();
        }
    }
  }

  return isMounted && rootDivRef.current
    ? createPortal(
      <div
        className={styles.modalOverlay}
        onClick={onCliseClick}
        ref={modalRef}
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {children}
      </div>,
      rootDivRef.current
    )
    : null;
};

export default Modal;