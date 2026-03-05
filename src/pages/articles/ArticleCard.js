import React from 'react';
import Link from 'next/link';
import z from './ArticleCard.module.css';

// reverse=true — фото слева, текст справа (как было ArticleCardRight)
const ArticleCard = ({ title, description, image, href, date, readTime, reverse = false }) => {
  const mainImage = Array.isArray(image) ? image[0] : image;

  return (
    <Link href={href || '#'} className={`${z.card} ${reverse ? z.cardReverse : ''}`}>
      <div className={z.textPart}>
        <div className={z.meta}>
          {date && <span className={z.metaItem}>{date}</span>}
          {date && readTime && <span className={z.metaDot}>·</span>}
          {readTime && <span className={z.metaItem}>{readTime} мин читать</span>}
        </div>
        <h3 className={z.title}>{title}</h3>
        <p className={z.description}>{description}</p>
        <div className={z.readMore}>
          Прочитать статью <span className={z.arrow}>→</span>
        </div>
      </div>

      <div className={z.imagePart}>
        <img
          src={mainImage}
          alt={title}
          loading="lazy"
          decoding="async"
          className={z.img}
        />
        <div className={z.imageOverlay} />
      </div>
    </Link>
  );
};

export default ArticleCard;