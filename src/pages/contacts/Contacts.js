'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import z from './Contacts.module.css';

const CustomMap = dynamic(() => import('../../components/map/CustomMap'), {
  ssr: false,
  loading: () => <div className={z.mapLoading}>Загрузка карты...</div>,
});

const Contacts = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) return;
    setLoading(true);
    try {
      const res = await fetch('/api/amo-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          description: message ? `Сообщение: ${message}` : 'Заявка со страницы контактов',
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setName(''); setPhone(''); setMessage('');
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className={z.page}>


      <div className={z.hero}>
        <div className={z.heroInner}>
          <div className={z.label}>Контакты</div>
          <h1 className={z.title}>Свяжитесь с нами</h1>
          <p className={z.subtitle}>Ответим на все вопросы, рассчитаем стоимость и подберём проект под ваш бюджет</p>
        </div>
      </div>

 
      <div className={z.main}>

     
        <div className={z.info}>

          <div className={z.infoBlock}>
            <div className={z.infoLabel}>Телефон</div>
            <a className={z.infoValue} href="tel:+79218444448">+7 (921) 844-44-48</a>
          </div>

          <div className={z.infoBlock}>
            <div className={z.infoLabel}>Почта</div>
            <a className={z.infoValue} href="mailto:mail@prodoma.info">mail@prodoma.info</a>
          </div>

          <div className={z.infoBlock}>
            <div className={z.infoLabel}>Офис</div>
            <div className={z.infoText}>
              Новгородская обл., г. Пестово,<br />
              ул. Гайдара д. 8<br />
              <span className={z.infoMuted}>пн–пт с 9:00 до 18:00</span>
            </div>
          </div>

          <div className={z.infoBlock}>
            <div className={z.infoLabel}>Юридический адрес</div>
            <div className={z.infoText}>
              174510 Новгородская обл., г. Пестово,<br />
              ул. Производственная д. 11А
            </div>
          </div>

          <div className={z.infoBlock}>
            <div className={z.infoLabel}>Мы в соцсетях</div>
            <div className={z.socials}>
              <a className={z.socialLink} href="#" target="_blank" rel="noopener noreferrer">
                <span className={z.socialIcon}>WA</span> WhatsApp
              </a>
              <a className={z.socialLink} href="#" target="_blank" rel="noopener noreferrer">
                <span className={z.socialIcon}>TG</span> Telegram
              </a>
              <a className={z.socialLink} href="#" target="_blank" rel="noopener noreferrer">
                <span className={z.socialIcon}>ВК</span> Вконтакте
              </a>
            </div>
          </div>

          <div className={z.infoBlock}>
            <div className={z.infoLabel}>Свидетельства о гос. регистрации</div>
            <div className={z.docs}>
              <a className={z.docLink} href="#" target="_blank">Свидетельство ООО «ПроДома»</a>
              <a className={z.docLink} href="#" target="_blank">Свидетельство ИП Цветков А.И.</a>
            </div>
          </div>

        </div>

       
        <div className={z.formWrap}>
          <div className={z.formTitle}>Оставьте заявку</div>
          <p className={z.formSubtitle}>Перезвоним в течение 30 минут в рабочее время</p>

          {!success ? (
            <div className={z.form}>
              <input
                className={z.input}
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={z.input}
                type="tel"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className={z.textarea}
                placeholder="Ваш вопрос или пожелание (необязательно)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <button
                className={z.submitBtn}
                onClick={handleSubmit}
                disabled={!name || !phone || loading}
              >
                {loading ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </div>
          ) : (
            <div className={z.successBlock}>
              <div className={z.successIcon}>✓</div>
              <div className={z.successText}>Спасибо! Мы свяжемся с вами в ближайшее время.</div>
            </div>
          )}
        </div>
      </div>

     
      <div className={z.mapWrap}>
        <CustomMap />
      </div>

    </div>
  );
};

export default Contacts;