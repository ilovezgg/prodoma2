// ArticlesDefault.jsx
import React from 'react';
import z from './ArticlesDefault.module.css';

export default function ArticlesDefault({ title, description, image, blocks = [] }) { // ← значение по умолчанию

  const heroImage = Array.isArray(image) ? image[0] : image;

  return (
    <div className={z.article}>
      <h1 className={z.mainText}>{title}</h1>
      <p className={z.description}>{description}</p>

      {heroImage && (
        <img 
          src={heroImage} 
          alt={title} 
          className={z.pic} 
          loading="lazy" 
        />
      )}

      <div className={z.articleContent}>
        {Array.isArray(blocks) && blocks.map((block, i) => { // ← дополнительная защита
          if (block.image == null) {
            return (
              <div key={i} className={z.factBlock}>
                <div dangerouslySetInnerHTML={{ __html: block.text }} />
              </div>
            );
          }

          return (
            <div key={i} className={`${z.block} ${i % 2 === 0 ? z.imageRight : z.imageLeft}`}>
              <img src={block.image} className={z.blockImage} loading="lazy" alt="" />
              <div className={z.blockText} dangerouslySetInnerHTML={{ __html: block.text }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}