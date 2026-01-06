import React from 'react'
import z from './Header.module.css'
const Header = () => {
  return (
    <div className={z.main}>
     <div className={z.logo}>
        <div className={z.logoPic}>
 
        </div>
        
     </div>
     <div className={z.navigation}>
        <div className={z.whyUs}>
        Почему мы?
        </div>
        <div className={z.chooseProject}>
         Подобрать проект
        </div>
        <div className={z.reviews}>
         Отзывы
        </div>
        <div className={z.contacts}>
         Контакты
        </div>
        </div>
    </div>
  )
}

export default Header