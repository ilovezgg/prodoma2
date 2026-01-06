import React from 'react'
import z from './Main.module.css'
import iconWood from './pics/Проверить ящики by iconSvg.co.svg'

const Main = () => {
  return (
    <div className={z.main}>
      <div className={z.pics}>
        <div className={z.picOne}></div>
        <div className={z.picTwo}></div>
      </div>
      
      <div className={z.title}>
        <div className={z.titleText}>
  Строим <span className={z.order}>дома мечты</span>, в которые хочется возвращаться
</div>

<div className={z.subTitle}>
  <div className={z.element}>
    <div className={z.iconWood}>
      <img src={iconWood} alt="Тепло" className={z.woodSvg} />
    </div>
    <div className={z.textSubTitle}>
      Дома, где действительно тепло - проверяем тепловизором
    </div>
  </div>

  <div className={z.element}>
    <div className={z.iconWood}>
      <img src={iconWood} alt="Сроки" className={z.woodSvg} />
    </div>
    <div className={z.textSubTitle}>
      Соблюдаем сроки - сдаем объекты день в день
    </div>
  </div>
  
  <div className={z.element}>
    <div className={z.iconWood}>
      <img src={iconWood} alt="Качество" className={z.woodSvg} />
    </div>
    <div className={z.textSubTitle}>
      Качество, которое видно - не прячем работу под отделкой
    </div>
  </div>
</div>

<div className={z.buttons}>
  <div className={z.getProjects}>
    🏡 Рассчитать стоимость моего дома
  </div>
  <div className={z.podr}>
    📸 Смотреть построенные объекты
  </div>
</div>
      </div>
    </div>
  )
}

export default Main