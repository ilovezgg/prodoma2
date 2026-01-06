import React, { useRef, useEffect } from 'react';
import z from './Smeta.module.css';

const Smeta = () => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(z.animate);
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );

    if (firstRef.current) observer.observe(firstRef.current);
    if (secondRef.current) observer.observe(secondRef.current);
    if (thirdRef.current) observer.observe(thirdRef.current);

    return () => {
      if (firstRef.current) observer.unobserve(firstRef.current);
      if (secondRef.current) observer.unobserve(secondRef.current);
      if (thirdRef.current) observer.unobserve(thirdRef.current);
    };
  }, []);

  return (
    <div className={z.main}>
      <div className={z.title}>
        Строим дома под ключ: 3 принципа, которые экономят ваши деньги и нервы
      </div>
      <div className={z.container}>
        <div className={z.first} ref={firstRef}>
          <div className={z.premTitle}>
            Проект, который учитывает каждую вашу <span className={z.accent}>привычку</span>
          </div>
          <div className={z.premText}>
            Создаем планировку, где все продумано до мелочей: от утреннего маршрута до вечернего отдыха. Вы получаете дом, который чувствует ваши потребности.
          </div>
        </div>

        <div className={z.second} ref={secondRef}>
          <div className={z.premTitle}>
            Инженерные системы с <span className={z.accent}>5-летней гарантией</span>
          </div>
          <div className={z.premText}>
            Вам не придется разбираться в проводах и трубах. Мы делаем все коммуникации "под ключ" и берем на себя любые проблемы в течение 5 лет.
          </div>
        </div>

        <div className={z.third} ref={thirdRef}>
          <div className={z.premTitle}>
            <span className={z.accent}>Фиксированная смета</span>: никаких сюрпризов
          </div>
          <div className={z.premText}>
            Знаете точную стоимость до начала стройки. Цена не меняется в процессе — защищаем ваш бюджет от непредвиденных расходов.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smeta;