import React, { useRef, useEffect } from 'react';
import z from './HowWeWork.module.css';

const HowWeWork = () => {
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);

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

    const steps = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref];

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
              За 10 минут по телефону поймем, какой дом вы хотите. Сразу скажем, сможем ли реализовать ваш проект и назовем ориентиры по бюджету.
            </div>
            <div className={z.timeBadge}>⏱ 10-15 минут</div>
          </div>
        </div>

       
        <div className={z.step} ref={step2Ref}>
          <div className={z.stepNumber}>2</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Проект, который учитывает каждую мелочь</div>
            <div className={z.textCard}>
              Создадим планировку, где учтено все: от утреннего солнца в спальне до расположения розеток. 
              <strong> Бонус:</strong> стоимость проектирования вернем, если доверите нам строительство.
            </div>
            <div className={z.timeBadge}>⏱ 2-3 недели</div>
          </div>
        </div>

      
        <div className={z.step} ref={step3Ref}>
          <div className={z.stepNumber}>3</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Фиксированная смета - никаких сюрпризов</div>
            <div className={z.textCard}>
              Рассчитаем точную стоимость до копейки. Цена не изменится в процессе стройки. Вы защищены от непредвиденных расходов.
            </div>
            <div className={z.timeBadge}>⏱ 1-2 дня</div>
          </div>
        </div>

      
        <div className={z.step} ref={step4Ref}>
          <div className={z.stepNumber}>4</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Строительство с проверкой качества</div>
            <div className={z.textCard}>
              Работаем без предоплаты - платите только за выполненные этапы. Каждый этап проверяем тепловизором. 
              Гарантируем, что дом будет действительно теплым.
            </div>
            <div className={z.timeBadge}>⏱ 1-2 месяца</div>
          </div>
        </div>

      
        <div className={z.step} ref={step5Ref}>
          <div className={z.stepNumber}>5</div>
          <div className={z.stepContent}>
            <div className={z.titleCard}>Сдача дома и гарантия 5 лет</div>
            <div className={z.textCard}>
              Сдаем дом чистовой отделкой "под ключ". Даем 5 лет гарантии на все конструкции и инженерные системы.
            </div>
            <div className={z.timeBadge}>⏱ 1 день</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;