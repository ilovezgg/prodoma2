
import React, { useState, useEffect, useRef } from 'react';
import z from './ArticleCardLeft.module.css';

const ArticleCardLeft = ({ title, description, image }) => {
  const imageList = Array.isArray(image) ? image : [image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const isHoveredRef = useRef(false);


  useEffect(() => {
    if (imageList.length <= 1) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isHoveredRef.current) {
          setCurrentIndex((prev) => (prev + 1) % imageList.length);
        }
      }, 3000);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [imageList.length]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div 
      className={z.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={z.leftPart}>
        <h3 className={z.title}>{title}</h3>
        <p className={z.description}>{description}</p>
        <button className={z.open}>
         Прочитать статью
        </button>
      </div>
      
      <div className={z.rightPart}>
  
        <div 
          className={z.slider}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageList.map((img, index) => (
            <div key={index} className={z.slide}>
              <img src={img} alt={`${title} ${index + 1}`} />
            </div>
          ))}
        </div>

   
        {imageList.length > 1 && (
          <div className={z.dots}>
            {imageList.map((_, i) => (
              <span
                key={i}
                className={`${z.dot} ${i === currentIndex ? z.activeDot : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCardLeft;