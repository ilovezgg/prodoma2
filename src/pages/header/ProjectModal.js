'use client';
import React, { useState, useEffect } from 'react';
import z from './ProjectModal.module.css';

const HOUSES = [
  { id: 101, price: 3780000, area: 91,  floors: 1, bedrooms: 1, tags: ['dacha', 'couple'] },
  { id: 102, price: 3810000, area: 91,  floors: 1, bedrooms: 1, tags: ['couple', 'elderly'] },
  { id: 103, price: 3660000, area: 86,  floors: 1, bedrooms: 1, tags: ['family', 'couple'] },
  { id: 104, price: 3555000, area: 84,  floors: 1, bedrooms: 1, tags: ['dacha', 'elderly'] },
  { id: 105, price: 4380000, area: 102, floors: 1, bedrooms: 2, tags: ['family'] },
  { id: 106, price: 4380000, area: 102, floors: 1, bedrooms: 2, tags: ['family', 'couple'] },
  { id: 107, price: 4470000, area: 105, floors: 1, bedrooms: 2, tags: ['family'] },
  { id: 108, price: 4680000, area: 110, floors: 1, bedrooms: 2, tags: ['dacha'] },
  { id: 109, price: 4695000, area: 111, floors: 1, bedrooms: 2, tags: ['family', 'elderly'] },
  { id: 110, price: 4470000, area: 105, floors: 1, bedrooms: 2, tags: ['family'] },
  { id: 111, price: 5070000, area: 120, floors: 1, bedrooms: 2, tags: ['family', 'couple'] },
  { id: 112, price: 5220000, area: 122, floors: 1, bedrooms: 3, tags: ['dacha', 'elderly'] },
  { id: 113, price: 5610000, area: 130, floors: 1, bedrooms: 3, tags: ['family'] },
  { id: 114, price: 5520000, area: 128, floors: 1, bedrooms: 3, tags: ['family', 'elderly'] },
  { id: 115, price: 6130000, area: 142, floors: 1, bedrooms: 3, tags: ['couple', 'elderly', 'dacha'] },
];


function isIndividual(answers) {
  const budgetOver7m = answers.budget === 'b5';
  const areaOver200 = answers.area === 'xxlarge';
  return budgetOver7m || areaOver200;
}

function matchHouses(answers) {
  const { who, budget, area } = answers;
  const tagMap = { family: ['family'], couple: ['couple'], elderly: ['elderly'], dacha: ['dacha'] };
  const wantedTags = tagMap[who] || [];
  const budgetMax = { b1: 4000000, b2: 5000000, b3: 6000000, b4: 7000000, b5: Infinity }[budget] || Infinity;
  const areaRange = { small: [0, 90], medium: [90, 115], large: [115, 135], xlarge: [135, 200], xxlarge: [200, Infinity] }[area] || [0, Infinity];

  let matched = HOUSES.filter((h) => {
    const tagMatch = wantedTags.length === 0 || h.tags.some((t) => wantedTags.includes(t));
    const budgetMatch = h.price <= budgetMax;
    const areaMatch = h.area >= areaRange[0] && h.area <= areaRange[1];
    const floorMatch = who === 'elderly' ? h.floors === 1 : true;
    return tagMatch && budgetMatch && areaMatch && floorMatch;
  });

  if (matched.length === 0) {
    matched = HOUSES.filter((h) => {
      const budgetMatch = h.price <= budgetMax;
      const tagMatch = wantedTags.length === 0 || h.tags.some((t) => wantedTags.includes(t));
      const floorMatch = who === 'elderly' ? h.floors === 1 : true;
      return budgetMatch && tagMatch && floorMatch;
    });
  }

  return matched.slice(0, 3);
}

function getReason(house, answers) {
  const { who } = answers;
  const reasons = [];
  if (who === 'family') reasons.push(`${house.bedrooms} спальни — достаточно места для всей семьи`);
  else if (who === 'couple') reasons.push('компактный и уютный дом для двоих');
  else if (who === 'elderly') reasons.push('одноэтажный — не нужно подниматься по лестнице');
  else if (who === 'dacha') reasons.push('отличный вариант для загородного отдыха');
  if (house.floors === 1) reasons.push('одноэтажный — просто в обслуживании');
  if (house.area <= 90) reasons.push('небольшая площадь — ниже расходы на отопление');
  if (house.area >= 120) reasons.push(`просторные ${house.area} м² — комфорт на каждый день`);
  return reasons.slice(0, 2).join(', ') + '.';
}

async function sendToAmo({ name, phone, answers, houses, individual }) {
  const whoLabel = { family: 'Семья с детьми', couple: 'Супружеская пара', elderly: 'Пожилые / один', dacha: 'Дача' };
  const budgetLabel = { b1: 'до 4 млн', b2: '4–5 млн', b3: '5–6 млн', b4: '6–7 млн', b5: 'более 7 млн' };
  const areaLabel = { small: 'до 90 м²', medium: '90–115 м²', large: '115–135 м²', xlarge: '135–200 м²', xxlarge: 'более 200 м²' };

  const houseList = individual
    ? 'Индивидуальный проект'
    : houses.map((h) => `Проект №${h.id} (${(h.price / 1000000).toFixed(1)} млн, ${h.area} м²)`).join('; ');

  const description = [
    `Кто живёт: ${whoLabel[answers.who] || answers.who}`,
    `Бюджет: ${budgetLabel[answers.budget] || answers.budget}`,
    `Площадь: ${areaLabel[answers.area] || answers.area}`,
    individual ? 'Тип: Индивидуальный проект под заказ' : `Подобранные проекты: ${houseList}`,
  ].join('\n');

  try {
    const res = await fetch('/api/amo-send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, description, pipeline_id: 10642434 }),
    });
    return res.ok;
  } catch (e) {
    console.error('Ошибка отправки:', e);
    return false;
  }
}

const STEPS = [
  {
    id: 'who',
    question: 'Для кого строим дом?',
    options: [
      { value: 'family',  label: 'Семья с детьми',   icon: '👨‍👩‍👧‍👦' },
      { value: 'couple',  label: 'Супружеская пара', icon: '👫' },
      { value: 'elderly', label: 'Пожилые / один',   icon: '🧓' },
      { value: 'dacha',   label: 'Дача / отдых',     icon: '🌿' },
    ],
  },
  {
    id: 'budget',
    question: 'Ваш бюджет?',
    options: [
      { value: 'b1', label: 'до 4 млн ₽' },
      { value: 'b2', label: '4–5 млн ₽' },
      { value: 'b3', label: '5–6 млн ₽' },
      { value: 'b4', label: '6–7 млн ₽' },
      { value: 'b5', label: 'более 7 млн ₽' },
    ],
  },
  {
    id: 'area',
    question: 'Желаемая площадь?',
    options: [
      { value: 'small',   label: 'до 90 м²' },
      { value: 'medium',  label: '90–115 м²' },
      { value: 'large',   label: '115–135 м²' },
      { value: 'xlarge',  label: '135–200 м²' },
      { value: 'xxlarge', label: 'более 200 м²' },
    ],
  },
];

const ProjectModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [individual, setIndividual] = useState(false);
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  const TOTAL = STEPS.length + 2;

  useEffect(() => {
    if (isOpen) {
      setStep(0); setAnswers({}); setResults([]);
      setIndividual(false);
      setContact({ name: '', phone: '' });
      setSubmitted(false); setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const isResultStep  = step === STEPS.length;
  const isContactStep = step === STEPS.length + 1;
  const progress = (step / TOTAL) * 100;

  const handleSelect = (value) => {
    const currentId = STEPS[step].id;
    const newAnswers = { ...answers, [currentId]: value };
    setAnswers(newAnswers);

    if (step === STEPS.length - 1) {
      const ind = isIndividual(newAnswers);
      setIndividual(ind);
      if (!ind) setResults(matchHouses(newAnswers));
    }

    setAnimating(true);
    setTimeout(() => { setStep((s) => s + 1); setAnimating(false); }, 260);
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.phone) return;
    setLoading(true);
    await sendToAmo({ name: contact.name, phone: contact.phone, answers, houses: results, individual });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={z.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={z.modal}>
        <button className={z.close} onClick={onClose}>✕</button>

        {!submitted ? (
          <>
            <div className={z.progressBar}>
              <div className={z.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={z.stepCount}>{Math.min(step + 1, TOTAL)} / {TOTAL}</div>

            <div className={`${z.content} ${animating ? z.fadeOut : z.fadeIn}`}>

             
              {!isResultStep && !isContactStep && (
                <>
                  <h2 className={z.question}>{STEPS[step].question}</h2>
                  <div className={z.cards}>
                    {STEPS[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        className={`${z.card} ${answers[STEPS[step].id] === opt.value ? z.cardActive : ''}`}
                        onClick={() => handleSelect(opt.value)}
                      >
                        {opt.icon && <span className={z.cardIcon}>{opt.icon}</span>}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              
              {isResultStep && individual && (
                <div className={z.individualBlock}>
                  <div className={z.individualIcon}>◈</div>
                  <h2 className={z.individualTitle}>Ваш запрос выходит за рамки стандартных проектов</h2>
                  <p className={z.individualText}>
                    Для бюджета свыше 7 млн ₽ или площади более 200 м² мы создаём
                    <strong> уникальный проект с нуля</strong> — под ваш участок, образ жизни и архитектурные предпочтения.
                    Никаких шаблонов. Только ваш дом.
                  </p>
                  <ul className={z.individualFeatures}>
                    <li>Авторская архитектура под ваш участок</li>
                    <li>Индивидуальная планировка и фасад</li>
                    <li>Персональный менеджер на всех этапах</li>
                    <li>Полное сопровождение от проекта до сдачи</li>
                  </ul>
                  <button className={z.nextBtn} onClick={() => setStep((s) => s + 1)}>
                    Обсудить индивидуальный проект →
                  </button>
                </div>
              )}

             
              {isResultStep && !individual && (
                <>
                  <h2 className={z.question}>
                    {results.length > 0 ? `Нашли ${results.length} подходящих проекта` : 'Подберём индивидуально'}
                  </h2>
                  <div className={z.results}>
                    {results.map((house) => (
                      <div key={house.id} className={z.resultCard}>
                        <div className={z.resultHeader}>
                          <span className={z.resultName}>Проект №{house.id}</span>
                          <span className={z.resultPrice}>от {(house.price / 1000000).toFixed(1)} млн ₽</span>
                        </div>
                        <div className={z.resultMeta}>
                          {house.area} м² · {house.floors} эт. · {house.bedrooms} сп.
                        </div>
                        <div className={z.resultReason}>
                          Подходит вам, потому что: {getReason(house, answers)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={z.nextBtn} onClick={() => setStep((s) => s + 1)}>
                    Оставить заявку →
                  </button>
                </>
              )}

            
              {isContactStep && (
                <>
                  <h2 className={z.question}>
                    {individual
                      ? 'Оставьте контакты — архитектор свяжется с вами'
                      : 'Оставьте контакты — менеджер свяжется с вами'}
                  </h2>
                  <div className={z.contactForm}>
                    <input
                      className={z.input}
                      type="text"
                      placeholder="Ваше имя"
                      value={contact.name}
                      onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                    />
                    <input
                      className={z.input}
                      type="tel"
                      placeholder="Номер телефона"
                      value={contact.phone}
                      onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                    />
                    <button
                      className={z.submitBtn}
                      onClick={handleSubmit}
                      disabled={!contact.name || !contact.phone || loading}
                    >
                      {loading ? 'Отправляем...' : 'Отправить заявку'}
                    </button>
                  </div>
                </>
              )}
            </div>

            {step > 0 && !isResultStep && (
              <button className={z.back} onClick={() => setStep((s) => s - 1)}>← Назад</button>
            )}
          </>
        ) : (
          <div className={z.success}>
            <div className={z.successIcon}>✓</div>
            <h2 className={z.successTitle}>Спасибо, {contact.name}!</h2>
            <p className={z.successText}>
              {individual
                ? 'Наш архитектор свяжется с вами и обсудит детали вашего уникального проекта.'
                : 'Менеджер свяжется с вами и расскажет подробнее о подобранных проектах.'}
            </p>
            <button className={z.submitBtn} onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;