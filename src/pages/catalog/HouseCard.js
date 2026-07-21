'use client';
import React, { useState, useRef, useEffect } from 'react';
import z from './HouseCard.module.css';
import HouseModal from './HouseModal';

const HouseCard = ({ images, name, price, priceNum, totalArea, floors, bedrooms, id }) => {
  const imageList = Array.isArray(images) && images.length? images : [null];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const sliderRef = useRef(null);

  const nextImage = (e) => {
    e.stopPropagation();
    if (imageList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (imageList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"><rect width="100%" height="100%" fill="%23111111"/><text x="50%" y="50%" fill="%23666" font-size="14" font-family="Inter, sans-serif" text-anchor="middle">нет фото</text></svg>';
  const house = { id, price: priceNum, area: totalArea, floors, bedrooms };

  return (
    <div className={z.card}>
      <div className={z.picContainer}>
        <div className={z.slider} ref={sliderRef}>
          {imageList.map((img, i) => (
            <div key={i} className={z.slide}>
              <img
                src={img || placeholder}
                alt={`${name} ${i + 1}`}
                className={z.pic}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {imageList.length > 1 && (
          <>
            <button className={`${z.navButton} ${z.navPrev}`} onClick={prevImage} aria-label="Назад">
              ‹
            </button>
            <button className={`${z.navButton} ${z.navNext}`} onClick={nextImage} aria-label="Вперёд">
              ›
            </button>

            <div className={z.dots}>
              {imageList.map((_, i) => (
                <button
                  key={i}
                  className={`${z.dot} ${i === currentIndex? z.active : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  aria-label={`Слайд ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={z.info}>
        <div className={z.topInfo}>
          <div className={z.name}>{name}</div>
          <div className={z.price}>{price}</div>
        </div>
        <div className={z.specs}>
          <span>{totalArea} м²</span>
          <span className={z.divider}>/</span>
          <span>{floors} этаж</span>
          <span className={z.divider}>/</span>
          <span>{bedrooms} спальн{bedrooms > 1? 'и' : 'я'}</span>
        </div>
        <button className={z.moreButton} onClick={() => setModalOpen(true)}>
          Подробнее
        </button>
      </div>

      <HouseModal
        house={house}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default HouseCard;