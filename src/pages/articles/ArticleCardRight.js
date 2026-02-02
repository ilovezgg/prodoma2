import React from 'react'
import z from './ArticleCardRight.module.css'
const ArticleCardRight = ({ title, description, image }) => {
  return (
    <div className={z.card}>
      <div className={z.leftPart}>
        <h3 className={z.title}>{title}</h3>
        <p className={z.description}>{description}</p>
      </div>
      <div className={z.rightPart}>
        <div className={z.slider}>
          <div className={z.slide}>
            <img src={image} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardRight