'use client';
import React, { useState, useEffect } from 'react';
import z from './HouseModal.module.css';

const HouseModal = ({ house, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      setName(''); setPhone('');
      setErrors({ name: '', phone: '' });
      setSuccess(false);
    }
  }, [isOpen, house]);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen || !house) return null;

  const photos = Array.from({ length: 5 }, (_, i) => `/pics/${house.id}-${i + 1}.webp`);

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
          description: `Интерес к проекту №${house.id}\nПлощадь: ${house.area} м²\nЦена: от ${(house.price / 1000000).toFixed(1)} млн ₽`,
        }),
      });
      setSuccess(true);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className={z.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={z.modal}>
        <button className={z.closeBtn} onClick={onClose}>✕</button>

        {/* Слайдер */}
        <div className={z.slider}>
          <img src={photos[currentSlide]} alt={`Проект №${house.id}`} className={z.slide} />
          <button className={z.arrow} style={{ left: 16 }} onClick={() => setCurrentSlide((s) => (s - 1 + 5) % 5)}>←</button>
          <button className={z.arrow} style={{ right: 16 }} onClick={() => setCurrentSlide((s) => (s + 1) % 5)}>→</button>
          <div className={z.dots}>
            {photos.map((_, i) => (
              <button key={i} className={`${z.dot} ${i === currentSlide ? z.dotActive : ''}`} onClick={() => setCurrentSlide(i)} />
            ))}
          </div>
        </div>

        {/* Контент */}
        <div className={z.content}>
          <div className={z.info}>
            <div className={z.projectLabel}>Проект №{house.id}</div>
            <div className={z.price}>от {(house.price / 1000000).toFixed(1)} млн ₽</div>
            <div className={z.specs}>
              <div className={z.spec}>
                <div className={z.specVal}>{house.area} м²</div>
                <div className={z.specLabel}>Площадь</div>
              </div>
              <div className={z.specDivider} />
              <div className={z.spec}>
                <div className={z.specVal}>{house.floors}</div>
                <div className={z.specLabel}>Этаж</div>
              </div>
              <div className={z.specDivider} />
              <div className={z.spec}>
                <div className={z.specVal}>{house.bedrooms}</div>
                <div className={z.specLabel}>Спальни</div>
              </div>
            </div>
          </div>

          
          <div className={z.form}>
            {!success ? (
              <>
                <div className={z.formTitle}>Узнать подробности</div>
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
                <button className={z.submitBtn} onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Отправляем...' : 'Отправить заявку'}
                </button>
              </>
            ) : (
              <div className={z.successBlock}>
                <div className={z.successIcon}>✓</div>
                <div className={z.successText}>Спасибо! Менеджер свяжется с вами и расскажет подробнее о проекте №{house.id}.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseModal;