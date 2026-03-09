'use client';
import React from 'react';
import z from './Official.module.css';

const Official = () => {
  return (
    <div className={z.section}>
      <div className={z.inner}>

     
        <div className={z.left}>
          <div className={z.label}>Юридическая чистота</div>
          <h2 className={z.title}>Работаем в правовом поле</h2>
          <div className={z.since}>С 2019 года — без единого серого платежа</div>
        </div>

     
        <div className={z.divider} />

      
        <div className={z.right}>
          <p className={z.text}>
            Белый договор, официальные чеки на каждый платёж, все расчёты строго через банк —
            не нужно снимать наличные и возить крупные суммы.
          </p>
          <p className={z.text}>
            Вы можете оформить налоговый вычет. Никаких серых схем, конвертов
            и формулировок «договоримся на месте». Мы работаем в правовом поле — без исключений.
          </p>

       
          <div className={z.facts}>
            <div className={z.fact}>
              <div className={z.factTitle}>Договор</div>
              <div className={z.factSub}>ст. 709 ГК РФ</div>
            </div>
            <div className={z.factDivider} />
            <div className={z.fact}>
              <div className={z.factTitle}>Чеки</div>
              <div className={z.factSub}>на каждый платёж</div>
            </div>
            <div className={z.factDivider} />
            <div className={z.fact}>
              <div className={z.factTitle}>Налоговый</div>
              <div className={z.factSub}>вычет — ваше право</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Official;