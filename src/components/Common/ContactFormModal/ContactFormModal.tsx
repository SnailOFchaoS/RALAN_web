import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";

import closeIcon from '../../../../assets/svg/close.svg';
import { useMainPageContext } from "@/components/Pages/MainPage/context";
import Input from '@/components/Common/Input/Input';
import { sendContactForm } from '@/api/telegram';

import styles from './ContactFormModal.module.scss'

interface ContactFormModalProps {
  isOpen: boolean;
  setIsModalOpened: (isOpen: boolean) => void;
  onCloseClick: boolean;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
}

const ContactFormModal = ({ 
  isOpen, 
  setIsModalOpened, 
  onCloseClick 
}: ContactFormModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<gsap.core.Timeline>(null);
  const [isReversing, setIsReversing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const context = useMainPageContext();

  useEffect(() => {
    if (!contentRef.current) return;

    const timeLine = gsap.timeline({
      onReverseComplete: () => {
        setIsModalOpened(false);
        setIsReversing(false);
      },
    });
    timeLineRef.current = timeLine;

    timeLine.fromTo(contentRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50 * context.laptopScale,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    return () => {
      timeLine.kill();
    };
  }, [isOpen, context.laptopScale, setIsModalOpened]);

  useEffect(() => {
    if (onCloseClick) {
      if (timeLineRef.current) {
        setIsReversing(true);
        timeLineRef.current.reverse();
      }
    }
  }, [onCloseClick]);

  const resetForm = useCallback(() => {
    setFormData({ fullName: '', phone: '', email: '' });
    setIsSubmitting(false);
    setSubmitStatus('idle');
  }, []);

  const handleClose = useCallback(() => {
    if (timeLineRef.current) {
      setIsReversing(true);
      timeLineRef.current.reverse();
    }
    resetForm();
  }, [resetForm]);

  const handleInputChange = useCallback((field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const success = await sendContactForm(formData);

    if (success) {
      handleClose();
    } else {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  }, [formData, handleClose, isSubmitting]);

  const isInteractive = isOpen && !onCloseClick && !isReversing;

  return (
    <div 
      className={styles.contactFormModalWrapper} 
      style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
    >

      <div className={styles.content} ref={contentRef}>
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          type="button"
          aria-label="Закрыть"
        >
          <Image
            src={closeIcon}
            alt="Закрыть"
            width={50 * context.laptopScale}
            height={50 * context.laptopScale}
            className={styles.closeIcon}
          />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>ХОТИТЕ НАЧАТЬ ТРЕНИРОВКИ?</h2>
          <p className={styles.subtitle}>Заполните форму и мы с вами свяжемся</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Фамилия Имя Отчество"
            type="text"
            placeholder="Фамилия Имя Отчество"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            required
          />

          <Input
            label="Номер телефона"
            type="tel"
            placeholder="+7 (999) 999-99-99"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            required
          />

          <Input
            label="Адрес электронной почты"
            type="email"
            placeholder="mymail@mail.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
          />

          <p className={styles.infoText}>
            Уже скоро мы с вами свяжемся.<br />
            Не хотите ждать ? Позвоните или<br />
            напишите нам в <a href="https://t.me/ralanpro" className={styles.link} target="_blank" rel="noopener noreferrer">telegramm</a>
          </p>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
          </button>
          
          {submitStatus === 'error' && (
            <p className={styles.errorText}>Ошибка. Попробуйте снова</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
