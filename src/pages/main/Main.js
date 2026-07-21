'use client';
import React, { useState } from 'react';
import z from './Main.module.css';
import HeroSlider from './mainSlider/Carousel';
import Link from 'next/link';

const slides = [
  { 
    img: '/pics/-a-frame-8k (1).webp', 
    tag: 'Выгода №1',
    title: 'Заезжаете в готовый дом. Без стройки',
    text: 'Не контролируете бригады и не живёте на участке. Принимаете работы по этапам и получаете ключи. Всё.'
  },
  { 
    img: '/pics/-a-frame-8k.webp', 
    tag: 'Выгода №2', 
    title: 'Знаете финальную цену до старта',
    text: 'Полный проект со всеми сетями и отделкой. Смета фиксируется в договоре. Никаких «а это не посчитали».'
  },
  { 
    img: '/pics/cozy_minimalist_house_night.webp', 
    tag: 'Выгода №3',
    title: 'Ваши деньги защищены законом',
    text: 'Не платите нам напрямую. Деньги лежат в банке на эскроу-счёте. Получим их только после вашей приёмки дома.'
  },
];

const ConsultModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
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
    const nameErr = !name.trim() ? 'Как к вам обращаться?' : !/^[а-яёА-ЯЁ\s\-]+$/.test(name.trim()) ? 'Только кириллица' : '';
    const phoneErr = phone.replace(/\D/g, '').length < 11 ? 'Номер неполный' : '';
    if (nameErr || phoneErr) { setErrors({ name: nameErr, phone: phoneErr }); return; }
    setLoading(true);
    try {
      await fetch('/api/amo-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone,
          description: `Заявка с главного экрана\nКомментарий: ${comment || '—'}`,
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
            <div className={z.modalTitle}>Узнайте стоимость вашего дома</div>
            <div className={z.modalSub}>
              Инженер за 10 минут разберёт вашу задачу по телефону. Посчитает реальный бюджет под ключ и скажет, на чём можно сэкономить без потери качества. Это бесплатно и ни к чему не обязывает.
            </div>

            <div className={z.fieldWrap}>
              <input
                className={`${z.input} ${errors.name ? z.inputError : ''}`}
                type="text"
                placeholder="Ваше имя"
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
            <div className={z.fieldWrap}>
              <textarea
                className={z.textarea}
                placeholder="Какой дом хотите? Метраж, этажи, материал. Если есть участок — напишите особенности"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
            <button className={z.submitBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Отправляем...' : 'Получить расчёт'}
            </button>
            <div className={z.modalNote}>Нажимая кнопку, вы соглашаетесь на обработку данных. Звонков без повода не будет.</div>
          </>
        ) : (
          <div className={z.successBlock}>
            <div className={z.successIcon}>✓</div>
            <div className={z.successTitle}>Готово, {name}</div>
            <div className={z.successText}>Инженер свяжется с вами в течение 15 минут и подготовит предварительный расчёт. Если заявка вечером — наберём с 9:00.</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={z.container}>
      <div className={z.main}>
        <div className={z.left}>
          <div className={z.tag}>Строим с 2012 года</div>
          <h1 className={z.titleText}>
            Загородные дома <span className={z.order}>под ключ</span> — от проекта до тапочек
          </h1>
          <div className={z.subText}>
            Берём на себя всё: проектирование, закупку, стройку, контроль и уборку. Вы просто принимаете готовый дом и заезжаете жить. Без рисков, доплат и нервов.
          </div>
          
          <div className={z.trustLine}>
            <div className={z.trustItem}>
              <span className={z.trustIcon}>✓</span> Деньги в банке до сдачи по ФЗ №186
            </div>
            <div className={z.trustItem}>
              <span className={z.trustIcon}>✓</span> Цена в договоре финальная по ст. 709 ГК РФ
            </div>
            <div className={z.trustItem}>
              <span className={z.trustIcon}>✓</span> Независимый технадзор отвечает за качество
            </div>
          </div>

          <div className={z.buttons}>
            <div className={z.btnPrimary} onClick={() => setModalOpen(true)}>
              Узнать стоимость моего дома
            </div>
            <Link href="/objects" className={z.btnSecondary}>Смотреть 142 сданных дома</Link>
          </div>
        </div>

        <div className={z.right}>
          <HeroSlider slides={slides} />
        </div>
      </div>

      {modalOpen && <ConsultModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Main;