'use client';
import React from 'react';
import z from './Escrow1.module.css';

const Escrow1 = () => {
  return (
    <div className={z.section}>
      <div className={z.inner}>

       
        <div className={z.heroText}>
          <div className={z.label}>Финансовая безопасность</div>
          <h2 className={z.title}>
            Мы не получаем<br />
            <span className={z.gold}>ни рубля</span><br />
            пока вы не приняли дом
          </h2>
        </div>

      
        <div className={z.scheme}>
          <div className={z.step}>
            <div className={z.stepNum}>01</div>
            <div className={z.stepContent}>
              <div className={z.stepTitle}>Вы кладёте деньги в банк</div>
              <div className={z.stepText}>Не нам — в банк. Деньги замораживаются на эскроу-счёте и недоступны никому.</div>
            </div>
          </div>

          <div className={z.connector} />

          <div className={z.step}>
            <div className={z.stepNum}>02</div>
            <div className={z.stepContent}>
              <div className={z.stepTitle}>Мы строим за свой счёт</div>
              <div className={z.stepText}>Кредитуемся сами. Ваши деньги всё это время лежат в банке и работают на вас.</div>
            </div>
          </div>

          <div className={z.connector} />

          <div className={z.step}>
            <div className={z.stepNum}>03</div>
            <div className={z.stepContent}>
              <div className={z.stepTitle}>Вы принимаете дом</div>
              <div className={z.stepText}>Только после вашей подписи банк переводит деньги нам. Не раньше.</div>
            </div>
          </div>
        </div>

      
        <div className={z.bottomFact}>
  <div className={z.bottomLeft}>
    <div className={z.bigText}>ФЗ №186</div>
    <div className={z.bigSub}>Федеральный закон</div>
  </div>
  <div className={z.bottomDivider} />
  <div className={z.bottomRight}>
    Банк — гарант сделки, не мы. Даже если что-то пойдёт не так — ваши деньги защищены законом и останутся у вас.
  </div>
</div>

      </div>
    </div>
  );
};

export default Escrow1;