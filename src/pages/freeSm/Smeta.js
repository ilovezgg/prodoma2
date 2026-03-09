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
      Строим без рисков — для тех кто не хочет сюрпризов
      </div>
      <div className={z.container}>
        <div className={z.first} ref={firstRef}>
          <div className={z.premTitle}>
            Никаких менеджеров по продажам 
          </div>
          <div className={z.premText}>
            Вся информация открыта на сайте. Если есть вопрос — технический консультант отвечает за 15 минут. Не продаёт, не уговаривает.
          </div>
        </div>

        <div className={z.second} ref={secondRef}>
          <div className={z.premTitle}>
            Каждую работу делает специалист
          </div>
          <div className={z.premText}>
            Фундамент, электрика, сантехника, вентиляция — отдельный мастер на каждый раздел. Прораб координирует всех на объекте.
          </div>
        </div>

        <div className={z.third} ref={thirdRef}>
          <div className={z.premTitle}>
            Участок сдаём чистым
          </div>
          <div className={z.premText}>
            После завершения вывозим весь мусор и остатки материалов. Никаких обрезков и брошенного инструмента.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smeta;