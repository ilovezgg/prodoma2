'use client';
import React, { useState } from 'react';
import z from './Objects.module.css';

const OBJECTS = [
  { id: 1, image: '/pics/obj1.webp' },
  { id: 2, image: '/pics/obj2.webp' },
  { id: 3, image: '/pics/obj3.webp' },
  { id: 4, image: '/pics/obj4.webp' },
  { id: 5, image: '/pics/obj5.webp' },
  { id: 6, image: '/pics/obj6.webp' },
];

const ObjectCard = ({ image, onRequest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={z.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onRequest}
    >
      <img src={image} alt="Построенный объект" className={z.photo} />
      <div className={`${z.cardOverlay} ${hovered ? z.cardOverlayVisible : ''}`}>
        <div className={z.overlayLabel}>Построен нами</div>
        <div className={z.overlayBtn}>Обсудить похожий проект</div>
      </div>
    </div>
  );
};

const Objects = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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
        body: JSON.stringify({ name, phone, description: 'Заявка со страницы объектов — хочет похожий проект' }),
      });
      setSuccess(true);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const closeForm = () => {
    setFormOpen(false);
    setSuccess(false);
    setName(''); setPhone('');
    setErrors({ name: '', phone: '' });
  };

  return (
    <div className={z.page}>
      <div className={z.hero}>
        <div className={z.label}>Наши работы</div>
        <h1 className={z.title}>Построенные объекты</h1>
        <p className={z.subtitle}>Дома, которые мы уже сдали. Каждый — под ключ, в срок, без доплат.</p>
      </div>

      <div className={z.grid}>
        {OBJECTS.map((obj) => (
          <ObjectCard key={obj.id} image={obj.image} onRequest={() => setFormOpen(true)} />
        ))}
      </div>

      {formOpen && (
        <div className={z.modalOverlay} onClick={(e) => e.target === e.currentTarget && closeForm()}>
          <div className={z.modal}>
            <button className={z.closeBtn} onClick={closeForm}>✕</button>
            {!success ? (
              <>
                <div className={z.modalTitle}>Обсудить похожий проект</div>
                <div className={z.modalSub}>Оставьте контакты — менеджер свяжется и подберёт подходящий вариант</div>
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
                <div className={z.successTitle}>Спасибо, {name}!</div>
                <div className={z.successText}>Менеджер свяжется с вами и обсудит детали проекта.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Objects;