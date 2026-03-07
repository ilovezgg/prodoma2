// src/components/HouseCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import z from './HouseCard.module.css';
import HouseModal from './HouseModal';
const HouseCard = ({ images, name, price, priceNum, totalArea, floors, bedrooms, id }) => {
  const imageList = Array.isArray(images) ? images : [null];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const updateSlideWidth = () => {
      if (containerRef.current && sliderRef.current) {
        const width = containerRef.current.clientWidth;
        sliderRef.current.style.width = `${width * imageList.length}px`;
        const slides = sliderRef.current.children;
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.width = `${width}px`;
        }

        sliderRef.current.style.transform = `translateX(-${currentIndex * width}px)`;
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [imageList.length, currentIndex]);

  const nextImage = () => {
    if (imageList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    if (imageList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"><rect width="100%" height="100%" fill="black"/><text x="50%" y="50%" fill="white" font-size="12" text-anchor="middle">нет фото</text></svg>';
  const house = { id, price: priceNum, area: totalArea, floors, bedrooms };
  return (
    <div className={z.card}>
      <div className={z.picContainer} ref={containerRef}>
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
            <button className={`${z.navButton} ${z.navButtonPrev}`} onClick={prevImage} aria-label="Назад">
              &lsaquo;
            </button>
            <button className={`${z.navButton} ${z.navButtonNext}`} onClick={nextImage} aria-label="Вперёд">
              &rsaquo;
            </button>
            
            <div className={z.dots}>
              {imageList.map((_, i) => (
                <span
                  key={i}
                  className={`${z.dot} ${i === currentIndex ? z.active : ''}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
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

       <button className={z.moreButton} onClick={() => setModalOpen(true)}>Подробнее</button>

      <HouseModal
        house={house}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default HouseCard;