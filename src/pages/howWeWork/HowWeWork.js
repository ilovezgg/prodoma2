import React, { useRef, useEffect } from 'react';
import z from './HowWeWork.module.css';

const HowWeWork = () => {
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);
 const step6Ref = useRef(null);
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
        threshold: 0.15, 
      }
    );

    const steps = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref,step6Ref];

    steps.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      steps.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className={z.main}>
      <div className={z.title}>
        Как мы строим ваш дом без стресса и скрытых платежей
      </div>

      <div className={z.container}>
   
        <div className={z.step} ref={step1Ref}>
          <div className={z.stepNumber}>1</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Знакомство и ваша мечта о доме</div>
            <div className={z.textCard}>
             За 10 минут по телефону поймём какой дом вы хотите, под какой участок и какой бюджет. Сразу честно скажем — реально ли то что вы задумали, и назовём ориентир по стоимости. Без давления и уговоров.
            </div>
            <div className={z.timeBadge}>⏱ 10-15 минут</div>
          </div>
        </div>

       
        <div className={z.step} ref={step2Ref}>
          <div className={z.stepNumber}>2</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Проектирование</div>
            <div className={z.textCard}>
              Полный проект до первого гвоздя: архитектура, конструктив, все коммуникации — электрика, вода, канализация, отопление, вентиляция. Плюс расстановка мебели и визуализация фасада — увидите дом до начала стройки. Стоимость проектирования возвращаем если доверяете нам строительство.
            </div>
            <div className={z.timeBadge}>1 000 руб/м²</div>
          </div>
        </div>

      
        <div className={z.step} ref={step3Ref}>
          <div className={z.stepNumber}>3</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Твёрдая смета</div>
            <div className={z.textCard}>
             Один документ на всё — от фундамента до каждой розетки. Никаких расплывчатых формулировок и "доплатите потом". Цена фиксируется по ст.709 ГК РФ — подписали договор, эта сумма окончательная.
            </div>
            <div className={z.timeBadge}>⏱ 1-2 дня</div>
          </div>
        </div>

      
        <div className={z.step} ref={step4Ref}>
          <div className={z.stepNumber}>4</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Эскроу-счёт</div>
            <div className={z.textCard}>
              Вы кладёте деньги в банк — они там и лежат, заморожены, пока дом не построен и не принят. Мы не получаем ни рубля до финальной сдачи. Кредитуемся сами. Ваши деньги не рискуют никак.
            </div>
            <div className={z.timeBadge}>ФЗ №186</div>
          </div>
        </div>

      
        <div className={z.step} ref={step5Ref}>
          <div className={z.stepNumber}>5</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Стройка</div>
            <div className={z.textCard}>
             Каждый день — фотоотчёт с объекта. Независимый технический инспектор приезжает на каждую приёмку этапа лично. Без его подписи этап не принят, бригада денег не получает. Он несёт финансовую ответственность за то что подписал.
            </div>
            <div className={z.timeBadge}>По графику</div>
          </div>
        </div>


         <div className={z.step} ref={step6Ref}>
          <div className={z.stepNumber}>6</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Сдача</div>
            <div className={z.textCard}>
          Принимаете дом — участок уже чистый, без мусора и остатков материалов. Полный пакет документов на руках. Все расчёты официально через банк — можете оформить налоговый вычет.
            </div>
            <div className={z.timeBadge}>День в день</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;