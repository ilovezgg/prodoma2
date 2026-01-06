// src/components/HouseCard.jsx
import React, { useState } from 'react';
import z from './HouseCard.module.css';

const HouseCard = ({ 
  images, 
  name, 
  price, 
  totalArea, 
  floors, 
  bedrooms 
}) => {
  const imageList = Array.isArray(images) ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (imageList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    if (imageList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const currentImage = imageList.length > 0 
    ? imageList[currentIndex] 
    : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"><rect width="100%" height="100%" fill="black"/><text x="50%" y="50%" fill="white" font-size="12" text-anchor="middle">нет фото</text></svg>';

  return (
      <div className={z.card}>
    <div className={z.picContainer}>
      <div 
        className={z.pic} 
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      
      {imageList.length > 1 && (
        <>
          <button className={z.navButton} onClick={prevImage} aria-label="Назад">
            &lsaquo;
          </button>
          <button className={z.navButton} onClick={nextImage} aria-label="Вперёд">
            &rsaquo;
          </button>
        </>
      )}
    </div>

    <div className={z.info}>
      <div className={z.name}>{name}</div>
      <div className={z.infoTwo}>
        <div className={z.price}>{price}</div>
        <div className={z.meters}>Общая площадь: {totalArea} м²</div>
        <div className={z.floorsAndSleep}>
          {floors} этаж, {bedrooms} спальня{bedrooms > 1 ? 'и' : ''}
        </div>
      </div>
    </div>

    <button className={z.moreButton} onClick={() => alert('Подробнее')}>
      Подробнее
    </button>
  </div>
  );
};

export default HouseCard;