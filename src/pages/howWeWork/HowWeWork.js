'use client';
import React, { useRef, useEffect } from 'react';
import z from './HowWeWork.module.css';

const steps = [
  {
    id: '01',
    title: 'Звонок 10 минут',
    text: 'Обсуждаем ваш участок, состав семьи, бюджет. Сразу говорим что реально построить за эти деньги. Без продаж, только техконсультация.',
    badge: 'Бесплатно'
  },
  {
    id: '02',
    title: 'Проект под вас',
    text: 'Делаем полный проект: архитектура, конструктив, все сети, расстановка мебели. Вы видите дом в 3D до стройки. Стоимость проекта 1000₽/м² — вернём при заказе строительства.',
    badge: '1 000 ₽/м²'
  },
  {
    id: '03',
    title: 'Строим и отчитываемся',
    text: 'Каждый день — фото/видео с объекта в чат. Каждую неделю — приёмка этапа с независимым технадзором. Вы видите всё, ездить не нужно.',
    badge: 'Ежедневно'
  },
  {
    id: '04',
    title: 'Сдаём чистый дом',
    text: 'Вывозим весь мусор. Передаём ключи и полный пакет документов для вычета. Заезжаете и живёте.',
    badge: 'Под ключ'
  }
];

const HowWeWork = () => {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(z.animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => refs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  return (
    <section className={z.section}>
      <div className={z.inner}>
        <div className={z.header}>
          <div className={z.tag}>ПРОЦЕСС</div>
          <h2 className={z.title}>
            От звонка до ключей — <span className={z.accent}>4 шага</span>
          </h2>
        </div>

        <div className={z.grid}>
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={z.step}
              ref={el => refs.current[i] = el}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={z.stepTop}>
                <div className={z.stepId}>{step.id}</div>
                <div className={z.stepBadge}>{step.badge}</div>
              </div>
              <div className={z.stepTitle}>{step.title}</div>
              <div className={z.stepText}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;