'use client';
import React, { useState } from 'react';
import z from './Main.module.css';
import HeroSlider from './mainSlider/Carousel';
import Link from 'next/link';

const slides = [
  '/pics/main1.webp',
  '/pics/main2.webp',
  '/pics/main3.webp',
];

const ProjectsModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [wish, setWish] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatPhone = (val) => {
    let digits = val.replace(/\D/g, '');
    if (digits.startsWith('8') || digits.startsWith('7')) digits = digits.slice(1);
    digits = digits.slice(0, 10);
    let result = '+7';
    if (digits.length > 0) result += ' (' + digits.slice(0, 3);
    if (digits.length >= 3) result += ') ' + digits.slice(3, 6);
    if (digits.length >= 6) result += '-' + digits.slice(6, 8);
    if (digits.length >= 8) result += '-' + digits.slice(8, 10);
    return result;
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^[а-яёА-ЯЁ\s\-]*$/.test(val)) {
      setName(val);
      setErrors((p) => ({ ...p, name: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
    setErrors((p) => ({ ...p, phone: '' }));
  };

  const handlePhoneFocus = () => { if (!phone) setPhone('+7 ('); };
  const handlePhoneKeyDown = (e) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && phone.length <= 4) e.preventDefault();
  };

  const handleSubmit = async () => {
    const nameErr = !name.trim() ? 'Введите имя' : !/^[а-яёА-ЯЁ\s\-]+$/.test(name.trim()) ? 'Только кириллица' : '';
    const phoneErr = phone.replace(/\D/g, '').length < 11 ? 'Введите полный номер' : '';
    if (nameErr || phoneErr) { setErrors({ name: nameErr, phone: phoneErr }); return; }
    setLoading(true);
    try {
      await fetch('/api/amo-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone,
          description: `Запрос доступа к топ-200 проектов\nEmail: ${email || '—'}\nПожелания: ${wish || '—'}`,
        }),
      });
      setSuccess(true);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className={z.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={z.modal}>
        <button className={z.closeBtn} onClick={onClose}>✕</button>
        {!success ? (
          <>
            <div className={z.modalTitle}>В нашей базе 200 типовых проектов</div>
            <div className={z.modalSub}>Оставьте данные — мы вышлем доступ к базе проектов, а проектировщик поможет подобрать и доработать проект</div>

            <div className={z.fieldWrap}>
              <input
                className={`${z.input} ${errors.name ? z.inputError : ''}`}
                type="text"
                placeholder="Введите своё имя"
                value={name}
                onChange={handleNameChange}
              />
              {errors.name && <div className={z.errorMsg}>{errors.name}</div>}
            </div>
            <div className={z.fieldWrap}>
              <input
                className={`${z.input} ${errors.phone ? z.inputError : ''}`}
                type="tel"
                placeholder="+7 (000) 000-00-00"
                value={phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onKeyDown={handlePhoneKeyDown}
                maxLength={18}
              />
              {errors.phone && <div className={z.errorMsg}>{errors.phone}</div>}
            </div>
            <div className={z.fieldLabel}>Куда высылать примеры проектов? Необязательное поле:</div>
            <div className={z.fieldWrap}>
              <input
                className={z.input}
                type="email"
                placeholder="Введите свой email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={z.fieldWrap}>
              <textarea
                className={z.textarea}
                placeholder="Оставьте свои пожелания к проекту, если они у вас есть"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                rows={3}
              />
            </div>
            <button className={z.submitBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Отправляем...' : 'Обсудить проект'}
            </button>
          </>
        ) : (
          <div className={z.successBlock}>
            <div className={z.successIcon}>✓</div>
            <div className={z.successTitle}>Спасибо, {name}!</div>
            <div className={z.successText}>Мы вышлем доступ к базе проектов и свяжемся с вами в ближайшее время.</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={z.main}>
      <div className={z.pics}>
        <HeroSlider slides={slides} />
      </div>

      <div className={z.title}>
        <div className={z.titleText}>
          Строим <span className={z.order}>дома мечты</span>, в которые хочется возвращаться
        </div>
        <div className={z.subTitle}>
          <div className={z.element}>
            <div className={z.iconWood}>
              <img src="/pics/Проверить ящики by iconSvg.co.svg" alt="Тепло" className={z.woodSvg} />
            </div>
            <div className={z.textSubTitle}>Дома, где действительно тепло - проверяем тепловизором</div>
          </div>
          <div className={z.element}>
            <div className={z.iconWood}>
              <img src="/pics/Проверить ящики by iconSvg.co.svg" alt="Тепло" className={z.woodSvg} />
            </div>
            <div className={z.textSubTitle}>Соблюдаем сроки - сдаем объекты день в день</div>
          </div>
          <div className={z.element}>
            <div className={z.iconWood}>
              <img src="/pics/Проверить ящики by iconSvg.co.svg" alt="Тепло" className={z.woodSvg} />
            </div>
            <div className={z.textSubTitle}>Качество, которое видно - не прячем работу под отделкой</div>
          </div>
        </div>

        <div className={z.buttonsDesktop}>
          <div className={z.getProjects} onClick={() => setModalOpen(true)}>
            Получить доступ к топ-200 проектов
          </div>
          <Link href="/objects" className={z.podr}>Смотреть построенные объекты</Link>
        </div>
      </div>

      <div className={z.buttonsMobile}>
        <div className={z.getProjects} onClick={() => setModalOpen(true)}>
          Получить доступ к топ-200 проектов
        </div>
        <Link href="/objects" className={z.podr}>Смотреть построенные объекты</Link>
      </div>

      {modalOpen && <ProjectsModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Main;