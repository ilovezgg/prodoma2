"use client";

import { useState, useCallback, useRef } from "react";
import styles from "./Carousel.module.css";

const DURATION = 600;

function makeItems(images, centerImgIndex, idRef) {
  return [-2, -1, 0, 1, 2].map((pos) => ({
    id: idRef.current++,
    imgIndex: (centerImgIndex + pos + images.length) % images.length,
    pos,
  }));
}

export default function Carousel({ slides }) {
  const images =
    slides && slides.length >= 3
      ? slides
      : [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
          "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
          "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
        ];

  const idRef = useRef(0);
  const [centerImg, setCenterImg] = useState(0);
  const [items, setItems] = useState(() => makeItems(images, 0, idRef));
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (direction) => {
      if (animating) return;
      setAnimating(true);

      const delta = direction === "next" ? -1 : 1;

      setItems((prev) =>
        prev.map((item) => ({ ...item, pos: item.pos + delta }))
      );

      setTimeout(() => {
        const newCenter = (centerImg - delta + images.length) % images.length;
        setCenterImg(newCenter);
        setItems(makeItems(images, newCenter, idRef));
        setAnimating(false);
      }, DURATION);
    },
    [animating, centerImg, images]
  );

  const posClass = (pos) => {
    if (pos === 0) return styles.center;
    if (pos === -1) return styles.sideLeft;
    if (pos === 1) return styles.sideRight;
    if (pos <= -2) return styles.exitLeft;
    if (pos >= 2) return styles.enterRight;
    return styles.hidden;
  };

  return (
    <div className={styles.track}>
      {items.map(({ id, imgIndex, pos }) => (
        <div
          key={id}
          className={`${styles.slide} ${posClass(pos)}`}
          onClick={() => {
            if (pos > 0) goTo("next");
            if (pos < 0) goTo("prev");
          }}
        >
          <img src={images[imgIndex]} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}