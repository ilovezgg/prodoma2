'use client';
import React from 'react';
import z from './Escrow1.module.css';

const houses = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    title: 'Барнхаус 120 м²',
    meta: 'КП "Сосновый бор" · 4 месяца',
    price: '8.9 млн ₽',
    tag: 'Сдан в мае 2025'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    title: 'Дом из бруса 150 м²',
    meta: 'Д. Жуковка · 5 месяцев',
    price: '12.4 млн ₽',
    tag: 'Сдан в апреле 2025'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    title: 'Каркасник 95 м²',
    meta: 'КП "Лесной" · 3.5 месяца',
    price: '6.2 млн ₽',
    tag: 'Сдан в марте 2025'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
    title: 'Дом с террасой 180 м²',
    meta: 'П. Ильинское · 6 месяцев',
    price: '15.1 млн ₽',
    tag: 'Сдан в феврале 2025'
  },
];

const Exrow = () => {
  return (
    <section className={z.section}>
      <div className={z.inner}>
        <div className={z.header}>
          <div className={z.tag}>ПОРТФОЛИО</div>
          <h2 className={z.title}>
            142 дома <span className={z.accent}>уже сдали</span> с 2019 года
          </h2>
          <p className={z.subTitle}>
            Каждый дом — по твёрдой смете, в срок, без доплат. Вот последние объекты.
          </p>
        </div>

        <div className={z.grid}>
          {houses.map((house) => (
            <div key={house.id} className={z.card}>
              <div className={z.imageWrap}>
                <img src={house.img} alt={house.title} className={z.image} />
                <div className={z.imageTag}>{house.tag}</div>
              </div>
              <div className={z.content}>
                <div className={z.cardTitle}>{house.title}</div>
                <div className={z.cardMeta}>{house.meta}</div>
                <div className={z.cardBottom}>
                  <div className={z.cardPrice}>{house.price}</div>
                  <button className={z.cardBtn}>Смета проекта</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={z.footer}>
          <button className={z.moreBtn}>Смотреть все 142 сданных дома</button>
        </div>
      </div>
    </section>
  );
};

export default Exrow;