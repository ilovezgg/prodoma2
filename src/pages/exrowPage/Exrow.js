import React from 'react'
import z from './Exrow.module.css'

const Exrow = () => {
  return (
    <div className={z.main}>
      
      {/* Блок заголовка */}
      <div className={z.headerSection}>
        <div className={z.bigCount}>
          3 шага к дому вашей мечты <br/> с помощью эскроу-счета
        </div>
        <div className={z.subTitle}>
          Полная прозрачность и безопасность ваших средств на каждом этапе
        </div>
      </div>

      {/* Сетка карточек */}
      <div className={z.containerForCards}>
        
        {/* Карточка 1 */}
        <div className={z.card}>
          <div className={z.numberBg}>01</div>
          <div className={z.title}>
            Вы кладёте деньги в банк
          </div>
          <div className={z.text}>
            Вы переводите средства не застройщику, а на специальный эскроу-счёт. Деньги замораживаются и недоступны никому до конца стройки. Это ваша гарантия.
          </div>
        </div>

        {/* Карточка 2 */}
        <div className={z.card}>
          <div className={z.numberBg}>02</div>
          <div className={z.title}>
            Мы строим за свой счёт
          </div>
          <div className={z.text}>
            Мы используем собственные и кредитные средства. Ваши деньги всё это время лежат в банке и работают на вас, сохраняя свою стоимость.
          </div>
        </div>

        {/* Карточка 3 */}
        <div className={z.card}>
          <div className={z.numberBg}>03</div>
          <div className={z.title}>
            Вы принимаете дом
          </div>
          <div className={z.text}>
            Только после вашей личной подписи и приёмки ключей банк переводит деньги нам. Если есть недочёты — мы их исправим до оплаты.
          </div>
        </div>

      </div>
    </div>
  )
}

export default Exrow