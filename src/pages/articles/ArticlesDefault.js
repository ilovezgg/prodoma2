// ArticlesDefault.jsx
import React from 'react';
import z from './ArticlesDefault.module.css';

export default function ArticlesDefault({ title, description, image, blocks }) {

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


      {blocks && blocks.map((block, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className={`${z.block} ${
              isEven ? z.imageRight : z.imageLeft
            }`}
          >
            <img 
              src={block.image} 
              alt="" 
              loading="lazy"
              className={z.blockImage}
            />
           <div 
  className={z.blockText}
  dangerouslySetInnerHTML={{ __html: block.text }} 
/>
          </div>
        );
      })}
    </div>
  );
}