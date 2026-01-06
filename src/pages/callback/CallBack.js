// CallBack.jsx
import React, { useState } from 'react';
import z from './CallBack.module.css';

const CallBack = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch('/api/amo-send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, description }),
    });

    if (res.ok) {
      setIsSuccess(true);
      setName('');
      setPhone('');
      setDescription('');
    } else {
      const error = await res.json();
      console.error('Ошибка API:', error);
      alert('Ошибка отправки. Попробуйте позже.');
    }
  } catch (err) {
    console.error('Сетевая ошибка:', err);
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
            <div className={z.subtitle}>
              Мы свяжемся с вами в ближайшее время.
            </div>
          </div>
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
          <form onSubmit={handleSubmit}>
            <input
              className={z.name}
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={z.number}
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <textarea
              className={z.description}
              placeholder="Что важно в вашем доме? Например: 2 этажа, большая кухня-гостиная, терраса, энергоэффективность..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className={z.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Получить индивидуальный проект'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallBack;