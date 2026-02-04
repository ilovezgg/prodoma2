import React from 'react';
import z from './ArticleCardLeft.module.css';

const ArticleCardLeft = ({ title, description, image }) => {
  const mainImage = Array.isArray(image) ? image[0] : image;

  return (
    <div className={z.card}>
      <div className={z.leftPart}>
        <h3 className={z.title}>{title}</h3>
        <p className={z.description}>{description}</p>
        <button className={z.open}>
          Прочитать статью
        </button>
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

export default ArticleCardLeft;