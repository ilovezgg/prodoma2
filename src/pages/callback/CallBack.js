'use client';
import React, { useState } from 'react';
import z from './CallBack.module.css';
import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('../../components/map/CustomMap'), {
  ssr: false,
  loading: () => <div className={z.mapLoader}>Загрузка карты...</div>,
});

const CallBack = () => {
  const [form, setForm] = useState({ name: '', phone: '', description: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    if (field === 'name') {
      if (val === '' || /^[а-яёА-ЯЁ\s\-]*$/.test(val)) {
        setForm((p) => ({ ...p, name: val }));
        setErrors((p) => ({ ...p, name: '' }));
      }
    } else if (field === 'phone') {
      setForm((p) => ({ ...p, phone: formatPhone(val) }));
      setErrors((p) => ({ ...p, phone: '' }));
    } else {
      setForm((p) => ({ ...p, description: val }));
    }
  };

  const handlePhoneFocus = () => {
    if (!form.phone) setForm((p) => ({ ...p, phone: '+7 (' }));
  };

  const handlePhoneKeyDown = (e) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && form.phone.length <= 4) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const nameErr = !form.name.trim() ? 'Введите имя' : !/^[а-яёА-ЯЁ\s\-]+$/.test(form.name.trim()) ? 'Только кириллица' : '';
    const phoneErr = form.phone.replace(/\D/g, '').length < 11 ? 'Введите полный номер' : '';
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
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsSuccess(true);
        setForm({ name: '', phone: '', description: '' });
      }
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
  };

  return (
    <section className={z.section}>
      <div className={z.hero}>
        <div className={z.inner}>
          <div className={z.formCard}>
            {!isSuccess ? (
              <>
                <div className={z.header}>
                  <div className={z.tag}>ЗАЯВКА</div>
                  <h2 className={z.title}>Ваш дом — <span className={z.accent}>только для вас</span></h2>
                  <p className={z.subtitle}>
                    Расскажите, каким вы его видите — и мы создадим уникальный проект под ваш участок, бюджет и мечты.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className={z.form}>
                  <div className={z.field}>
                    <input
                      className={`${z.input} ${errors.name ? z.inputError : ''}`}
                      type="text"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={handleChange('name')}
                    />
                    {errors.name && <span className={z.error}>{errors.name}</span>}
                  </div>

                  <div className={z.field}>
                    <input
                      className={`${z.input} ${errors.phone ? z.inputError : ''}`}
                      type="tel"
                      placeholder="+7 (000) 000-00-00"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      onFocus={handlePhoneFocus}
                      onKeyDown={handlePhoneKeyDown}
                      maxLength={18}
                    />
                    {errors.phone && <span className={z.error}>{errors.phone}</span>}
                  </div>

                  <div className={z.field}>
                    <textarea
                      className={z.textarea}
                      placeholder="Что важно в вашем доме? Например: 2 этажа, большая кухня-гостиная, терраса, энергоэффективность..."
                      value={form.description}
                      onChange={handleChange('description')}
                      rows={4}
                    />
                  </div>

                  <button className={z.submitBtn} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправляем...' : 'Получить индивидуальный проект'}
                  </button>
                </form>
              </>
            ) : (
              <div className={z.success}>
                <div className={z.successIcon}>✓</div>
                <div className={z.successTitle}>Спасибо!</div>
                <div className={z.successText}>Мы свяжемся с вами в ближайшее время.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={z.mapBlock}>
        <div className={z.inner}>
          <div className={z.mapHeader}>
            <div className={z.tag}>ОФИС</div>
            <h2 className={z.title}>Мечтаете о доме в лесу?</h2>
            <p className={z.subtitle}>
              Уже 142 семьи построили дом своей мечты с нами. Приходите — покажем проекты, рассчитаем бюджет и ответим на все вопросы.
            </p>
          </div>
          <div className={z.mapWrap}>
            <CustomMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallBack;