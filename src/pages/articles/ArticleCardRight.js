import React from 'react';
import z from './ArticleCardRight.module.css';
import Link from 'next/link';
const ArticleCardRight = ({ title, description, image, href }) => {
  const mainImage = Array.isArray(image) ? image[0] : image;

  return (
    <div className={z.card}>
      <div className={z.leftPart}>
        <h3 className={z.title}>{title}</h3>
        <p className={z.description}>{description}</p>
       {href && ( 
          <Link href={href} className={z.open}>
            Прочитать статью
          </Link>
        )}
      </div>
      
      <div className={z.rightPart}>
        <img 
          src={mainImage} 
          alt={title}
          loading="lazy"
          decoding="async"
          className={z.img}
        />
      </div>
    </div>
  );
};

export default ArticleCardRight;