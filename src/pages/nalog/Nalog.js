'use client';
import React, { useRef, useEffect } from 'react';
import z from './Nalog.module.css';

const Nalog = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(z.animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <section className={z.section} ref={ref}>
      <div className={z.inner}>
        <div className={z.left}>
          <div className={z.label}>ВЕРНЁТЕ ЧАСТЬ ДЕНЕГ</div>
          <h2 className={z.title}>
            До 650 000 ₽ <br/> налоговым вычетом
          </h2>
          <div className={z.since}>
            Потому что работаем по-белому. Все документы для ФНС даём на руки.
          </div>
        </div>

        <div className={z.divider} />

        <div className={z.right}>
          <p className={z.text}>
            Вы имеете право вернуть 13% от стоимости дома и участка. Государство вернёт вам до 650 000 ₽ за один объект.
          </p>
          <p className={z.text}>
            Мы передаём полный пакет: договор, чеки, акты выполненных работ. Наш бухгалтер бесплатно проконсультирует как подать декларацию и не получить отказ.
          </p>

          <div className={z.facts}>
            <div className={z.fact}>
              <div className={z.factTitle}>13%</div>
              <div className={z.factSub}>от стоимости<br/>дома и земли</div>
            </div>
            <div className={z.factDivider} />
            <div className={z.fact}>
              <div className={z.factTitle}>До 650 000 ₽</div>
              <div className={z.factSub}>вернёт<br/>государство</div>
            </div>
            <div className={z.factDivider} />
            <div className={z.fact}>
              <div className={z.factTitle}>0 ₽</div>
              <div className={z.factSub}>за помощь<br/>с документами</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nalog;