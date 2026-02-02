import React from 'react'
import z from './Articles.module.css'
import ArticleCardLeft from './ArticleCardLeft'
const Articles = () => {
  return (
    <div className={z.main}>
    <div className={z.first}>
    <ArticleCardLeft
  title="Дом в лесу: как построить так, чтобы природа стала частью интерьера"
  description="Большие панорамные окна, терраса без перил, натуральные материалы и свет, который играет на деревянных стенах — ваш дом не просто стоит в лесу, он дышит вместе с ним. Рассказываем, как спроектировать пространство, где граница между «внутри» и «снаружи» исчезает, а каждое утро начинается с вида на сосны и пение птиц."
  image={[
    '/pics/les1.png',
    '/pics/les2.png',
    '/pics/les3.png'
  ]}
/>
    </div>
    </div>
  )
}

export default Articles