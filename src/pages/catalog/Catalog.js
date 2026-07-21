'use client';
import React from 'react';
import z from './Catalog.module.css';
import HouseCard from './HouseCard';

const projects = [
  {
    id: 101,
    images: ['/pics/1a.webp', '/pics/1b.webp'],
    name: 'Проект №101',
    price: 'от 3.8 млн ₽',
    priceNum: 3800000,
    totalArea: '98',
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 102,
    images: ['/pics/2a.webp', '/pics/2b.webp'],
    name: 'Проект №102',
    price: 'от 3.8 млн ₽',
    priceNum: 3800000,
    totalArea: '91',
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 103,
    images: ['/pics/3a.webp', '/pics/3b.webp'],
    name: 'Проект №103',
    price: 'от 3.7 млн ₽',
    totalArea: '86',
    priceNum: 3700000,
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 104,
    images: ['/pics/4a.webp', '/pics/4b.webp'],
    name: 'Проект №104',
    price: 'от 3.6 млн ₽',
    totalArea: '91',
    priceNum: 3600000,
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 105,
    images: ['/pics/5a.webp', '/pics/5b.webp'],
    name: 'Проект №105',
    price: 'от 4.4 млн ₽',
    totalArea: '86',
    priceNum: 4400000,
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 106,
    images: ['/pics/6a.webp', '/pics/6b.webp'],
    name: 'Проект №106',
    price: 'от 4.4 млн ₽',
    totalArea: '91',
    priceNum: 4400000,
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 107,
    images: ['/pics/7a.webp', '/pics/7b.webp'],
    name: 'Проект №107',
    price: 'от 4.5 млн ₽',
    totalArea: '86',
    priceNum: 4500000,
    floors: '1',
    bedrooms: '1'
  },
  {
    id: 108,
    images: ['/pics/8a.webp', '/pics/8b.webp'],
    name: 'Проект №108',
    price: 'от 4.7 млн ₽',
    totalArea: '91',
    priceNum: 4700000,
    floors: '1',
    bedrooms: '1'
  }
];

const Catalog = () => {
  return (
    <section className={z.section}>
      <div className={z.inner}>
        <div className={z.header}>
          <div className={z.tag}>КАТАЛОГ</div>
          <h2 className={z.title}>
            Выберите дом <span className={z.accent}>своей мечты</span>
          </h2>
          <p className={z.subTitle}>
            Дома, построенные для жизни — не для галочки. Каждый проект с твёрдой сметой.
          </p>
        </div>

        <div className={z.grid}>
          {projects.map((project) => (
            <HouseCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;