import React, { useState } from 'react';
import z from './CallBack.module.css';
import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('../../components/map/CustomMap'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '400px' }}>Загрузка карты...</div>,
});

const CallBack = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '' });

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

  const handlePhoneFocus = () => {
    if (!phone) setPhone('+7 (');
  };

  const handlePhoneKeyDown = (e) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && phone.length <= 4) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const nameErr = !name.trim() ? 'Введите имя' : !/^[а-яёА-ЯЁ\s\-]+$/.test(name.trim()) ? 'Только кириллица' : '';
    const phoneErr = phone.replace(/\D/g, '').length < 11 ? 'Введите полный номер' : '';
    setErrors({ name: nameErr, phone: phoneErr });
    return !nameErr && !phoneErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/amo-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, description }),
      });
      if (res.ok) {
        setIsSuccess(true);
        setName(''); setPhone(''); setDescription('');
      } else {
        alert('Ошибка отправки. Попробуйте позже.');
      }
    } catch (err) {
      alert('Не удалось подключиться к серверу.');
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className={z.main}>
        <div className={z.pic}>
          <div className={z.blackCube} style={{ textAlign: 'center' }}>
            <div className={z.title}>Спасибо!</div>
            <div className={z.subtitle}>Мы свяжемся с вами в ближайшее время.</div>
          </div>
        </div>
        <div className={z.mapSection}>
          <h1 className={z.titleTwo}>Мечтаете о доме в лесу?</h1>
          <p className={z.mapSubtitle}>
            Уже 142 семьи построили дом своей мечты с нами. Приходите — покажем проекты, рассчитаем бюджет и ответим на все вопросы.
          </p>
          <CustomMap />
        </div>
        <div className={z.text}>
          <span>prodoma</span>
          <span className={z.pipe}></span>
          <span>prodoma</span>
          <span className={z.pipe}></span>
          <span>prodoma</span>
        </div>
      </div>
    );
  }

  return (
    <div className={z.main}>
      <div className={z.pic}>
        <div className={z.blackCube}>
          <div className={z.title}>Ваш дом — только для вас</div>
          <div className={z.subtitle}>
            Расскажите, каким вы его видите — и мы создадим уникальный проект под ваш участок, бюджет и мечты.
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className={z.fieldWrap}>
              <input
                className={`${z.name} ${errors.name ? z.inputError : ''}`}
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={handleNameChange}
              />
              {errors.name && <div className={z.errorMsg}>{errors.name}</div>}
            </div>
            <div className={z.fieldWrap}>
              <input
                className={`${z.number} ${errors.phone ? z.inputError : ''}`}
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
            <textarea
              className={z.description}
              placeholder="Что важно в вашем доме? Например: 2 этажа, большая кухня-гостиная, терраса, энергоэффективность..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={z.submitBtn} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Получить индивидуальный проект'}
            </button>
          </form>
        </div>
      </div>

      <div className={z.mapSection}>
        <h1 className={z.titleTwo}>Мечтаете о доме в лесу?</h1>
        <p className={z.mapSubtitle}>
          Уже 142 семьи построили дом своей мечты с нами. Приходите — покажем проекты, рассчитаем бюджет и ответим на все вопросы.
        </p>
        <CustomMap />
      </div>

      <div className={z.text}>
        <span>prodoma</span>
        <span className={z.pipe}></span>
        <span>prodoma</span>
        <span className={z.pipe}></span>
        <span>prodoma</span>
      </div>
    </div>
  );
};

export default CallBack;