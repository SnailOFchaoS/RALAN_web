import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from './Modal.module.scss'

const Modal = ({ isOpen, onClose, children }: any) => {
   const [mounted, setMounted] = useState(false);
   const [rootDiv, setRootDiv] = useState<HTMLDivElement | null>(null);
   const modalRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if(!isOpen){
         return;
      }
         
      if(document.getElementById('modal-root')){
         setRootDiv(document.getElementById('modal-root') as HTMLDivElement);
      } else{
         const div = document.createElement('div');
         div.setAttribute('id', 'modal-root');
         document.body.appendChild(div);
         setRootDiv(div);
      }
      
      setMounted(true);

      return () => {
         setMounted(false);
      };
   }, [isOpen]); 
   

   useEffect(() => {
      if(!rootDiv || !mounted)
         return;
   }, [rootDiv])

   if(!isOpen){
     return null; 
   }

   return mounted && rootDiv
      ? createPortal(
         <div className={styles.modalOverlay} onClick={onClose} ref={modalRef}>
            {children}
         </div>
         , rootDiv)
      : null;
};

export default Modal;