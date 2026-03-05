import React from 'react';
import z from './Articles.module.css';
import ArticleCard from './ArticleCard';

const Articles = () => {
  return (
    <div className={z.page}>

      {/* Заголовок страницы */}
      <div className={z.hero}>
        <div className={z.label}>Блог</div>
        <h1 className={z.title}>Статьи о строительстве</h1>
        <p className={z.subtitle}>Советы, разборы и истории — чтобы вы приняли правильное решение</p>
      </div>

      {/* Карточки */}
      <div className={z.list}>
        <ArticleCard
          title="Дом в лесу: как сделать так, чтобы природа стала частью интерьера"
          description="Большие панорамные окна, терраса без перил, натуральные материалы и свет, который играет на деревянных стенах — ваш дом не просто стоит в лесу, он дышит вместе с ним."
          image={['/pics/les1.webp']}
          href="/articles/forestHouse"
          date="12 января 2025"
          readTime="6"
          reverse={false}
        />
        <ArticleCard
          title="От леса до стены — как выбрать материал для своего дома"
          description="Не все дома одинаковы. Узнайте, как распознать «свой» проект — даже если вы ничего не понимаете в архитектуре. Это не про квадратные метры, а про то, чтобы сердце забилось быстрее."
          image={['/pics/dom5.png']}
          href="/articles/woodHouse"
          date="28 января 2025"
          readTime="8"
          reverse={true}
        />
        <ArticleCard
          title="Как выбрать участок под дом мечты: 7 ошибок, которые разрушат ваш бюджет"
          description="Участок — это не просто клочок земли. Это основа вашего дома, его ориентация по солнцу, устойчивость фундамента и вид из окна каждое утро."
          image={['/pics/water.png']}
          href="/articles/chooseLand"
          date="5 февраля 2025"
          readTime="7"
          reverse={false}
        />
        <ArticleCard
          title="История барнхауса: от американских ферм до русского леса"
          description="Барнхаус родился не в архитектурной студии, а на фермах Среднего Запада — как простой амбар для скота и сена. Сегодня это символ свободы, света и связи с природой."
          image={['/pics/goida.png']}
          href="/articles/barnhouseHistory"
          date="19 февраля 2025"
          readTime="5"
          reverse={true}
        />
      </div>

    </div>
  );
};

export default Articles;