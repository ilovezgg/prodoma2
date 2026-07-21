'use client';
import React, { useRef, useEffect } from 'react';
import z from './Smeta.module.css';

const risks = [
  {
    id: '01',
    title: 'Ваши деньги защищены банком',
    text: 'Не платите нам напрямую. Деньги хранятся на эскроу-счёте по ФЗ №186. Мы получим их только после того, как вы подпишете акт приёмки готового дома.',
    tag: 'Финансовая безопасность'
  },
  {
    id: '02', 
    title: 'Цена в договоре — финальная',
    text: 'Составляем полную смету до гвоздя. Фиксируем её по ст. 709 ГК РФ. Если бетон или дерево подорожают завтра — это наши убытки, не ваши.',
    tag: 'Без доплат'
  },
  {
    id: '03',
    title: 'Качество проверяет не прораб',
    text: 'Каждый этап принимает независимый технадзор. Он материально отвечает за найденный брак. Поэтому ему выгодно найти косяк, а не закрыть на него глаза.',
    tag: 'Контроль качества'
  },
];

const Smeta = () => {
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
    <div className={z.wrap}>
      <div className={z.inner}>
        <div className={z.header}>
          <div className={z.tag}>СИСТЕМА БЕЗОПАСНОСТИ</div>
          <h2 className={z.title}>
            3 причины, почему с нами <span className={z.accent}>вы не рискуете</span>
          </h2>
          <div className={z.subTitle}>
            Мы убрали из стройки всё, из-за чего 90% людей теряют деньги и нервы
          </div>
        </div>

        <div className={z.grid}>
          {risks.map((item, i) => (
            <div 
              key={item.id} 
              className={z.card} 
              ref={el => refs.current[i] = el}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={z.cardTop}>
                <div className={z.cardId}>{item.id}</div>
                <div className={z.cardTag}>{item.tag}</div>
              </div>
              <div className={z.cardTitle}>{item.title}</div>
              <div className={z.cardText}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Smeta;