import React from 'react'
import z from './Header.module.css'
import Link from 'next/link'
const Header = () => {
  return (
    <div className={z.main}>
     <div className={z.logo}>
        <div className={z.logoPic}>
 
        </div>
        
     </div>
     <div className={z.navigation}>
     <Link href="/articles">Статьи</Link>
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