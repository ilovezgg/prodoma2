"use client";

import { useState, useCallback, useRef } from "react";
import styles from "./Carousel.module.css";

const DURATION = 500;

export default function Carousel({ slides }) {
  const data = slides && slides.length >= 1? slides : [
    { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80", tag: "Выгода №1", title: "Заезжаете в готовый дом. Без стройки", text: "Не контролируете бригады и не живёте на участке. Принимаете работы по этапам и получаете ключи. Всё." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (direction) => {
      if (animating) return;
      setAnimating(true);
      const newIndex = direction === "next" 
      ? (activeIndex + 1) % data.length 
        : (activeIndex - 1 + data.length) % data.length;
      
      setActiveIndex(newIndex);
      setTimeout(() => setAnimating(false), DURATION);
    },
    [animating, activeIndex, data.length]
  );

  const touchStart = useRef(null);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0? goTo("next") : goTo("prev");
    }
    touchStart.current = null;
  };

  return (
    <div className={styles.wrap}>
      <div 
        className={styles.track}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {data.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === activeIndex? styles.active : ''}`}
            style={{ transform: `translateX(${(i - activeIndex) * 100}%)` }}
          >
            <img src={slide.img} alt={slide.title} draggable={false} />
            <div className={styles.overlay}></div>
            <div className={styles.content}>
              <div className={styles.tag}>{slide.tag}</div>
              <div className={styles.slideTitle}>{slide.title}</div>
              <div className={styles.slideText}>{slide.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {data.map((_, i) => (
            <div 
              key={i} 
              className={`${styles.dot} ${i === activeIndex? styles.dotActive : ''}`}
              onClick={() =>!animating && setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}