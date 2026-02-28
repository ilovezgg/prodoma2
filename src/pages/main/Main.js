import React from 'react'
import z from './Main.module.css'
import HeroSlider from './mainSlider/Carousel'
const slides = [
  '/pics/main1.webp',
  '/pics/main2.webp',
  '/pics/main3.webp',
];
const Main = () => {
  return (
     <div className={z.main}>
  <div className={z.pics}>
    <HeroSlider slides={slides} />
  </div>
  
  <div className={z.title}>
    <div className={z.titleText}>
      Строим <span className={z.order}>дома мечты</span>, в которые хочется возвращаться
    </div>
    <div className={z.subTitle}>
  <div className={z.element}>
    <div className={z.iconWood}>
     <img src="/pics/Проверить ящики by iconSvg.co.svg" alt="Тепло" className={z.woodSvg} />
    </div>
    <div className={z.textSubTitle}>
      Дома, где действительно тепло - проверяем тепловизором
    </div>
  </div>

  <div className={z.element}>
    <div className={z.iconWood}>
    <img src="/pics/Проверить ящики by iconSvg.co.svg" alt="Тепло" className={z.woodSvg} />
    </div>
    <div className={z.textSubTitle}>
      Соблюдаем сроки - сдаем объекты день в день
    </div>
  </div>
  
  <div className={z.element}>
    <div className={z.iconWood}>
  <img src="/pics/Проверить ящики by iconSvg.co.svg" alt="Тепло" className={z.woodSvg} />
    </div>
    <div className={z.textSubTitle}>
      Качество, которое видно - не прячем работу под отделкой
    </div>
  </div>
</div>

    <div className={z.buttonsDesktop}>
      <div className={z.getProjects}>🏡 Рассчитать стоимость моего дома</div>
      <div className={z.podr}>📸 Смотреть построенные объекты</div>
    </div>
  </div>


  <div className={z.buttonsMobile}>
    <div className={z.getProjects}>🏡 Рассчитать стоимость моего дома</div>
    <div className={z.podr}>📸 Смотреть построенные объекты</div>
  </div>
</div>
  )
}

export default Main