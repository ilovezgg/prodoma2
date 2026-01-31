import React from 'react'
import z from './Footer.module.css'
const Footer = () => {
  return (
    <div className={z.main}>
    <div className={z.container}>
     <div className={z.office}>
      <div className={z.name}>
     Офис
      </div>
      <div className={z.adress}>
 Новгородская обл., г. Пестово, ул. Гайдара д. 8<br></br>
Время работы офиса: пн-пт с 9.00 до 18.00
      </div>
     </div>
     <div className={z.phoneNumber}>
 <div className={z.name}>
     Телефон
      </div>
      <div className={z.number}>
+7 (921) 844-44-48
      </div>
     </div>
     <div className={z.socialMedia}>
 <div className={z.name}>
     Мы в соцсетях
      </div>
      <div className={z.media}>
        <div className={z.whats}>
WhatsApp
        </div>
       <div className={z.tg}>
Telegram
        </div>
        <div className={z.vk}>
     Группа Вконтакте
        </div>
      </div>
     </div>
     <div className={z.contacts}>

     </div>
    </div>
    <div className={z.containerTwo}>
     <div className={z.office}>
      <div className={z.name}>
     Юридический адрес
      </div>
      <div className={z.adress}>
174510 Новгородская обл.,
г. Пестово, ул. Производственная д. 11А
      </div>
     </div>
     <div className={z.phoneNumber}>
 <div className={z.name}>
     Почта
      </div>
      <div className={z.number}>
mail@prodoma.info
      </div>
     </div>
     <div className={z.socialMedia}>
 <div className={z.name}>
     Свидетельства о гос.регистрации
      </div>
      <div className={z.media}>
        <div className={z.prodoma}>
Свидетельство ООО "ПроДома"
        </div>
       <div className={z.ip}>
Свидетельство ИП Цветков А.И.
        </div>
      </div>
     </div>
     <div className={z.contacts}>
     
     </div>
    </div>
    </div>
  )
}

export default Footer