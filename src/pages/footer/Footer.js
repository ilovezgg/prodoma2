'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import z from './Footer.module.css';

const Footer = () => {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <footer className={z.footer}>
      <div className={z.inner}>
        <div className={z.top}>
          <div className={z.brand}>
            <div className={z.brandName}>ПроДома</div>
            <div className={z.brandSub}>Строим дома под ключ с 2012 года</div>
          </div>
          <nav className={z.nav}>
            <Link href="/articles" className={z.navLink}>Статьи</Link>
            <Link href="/pageReviews" className={z.navLink}>Отзывы</Link>
            <Link href="/contacts" className={z.navLink}>Контакты</Link>
          </nav>
        </div>

        <div className={z.divider} />

        <div className={z.cols}>
          <div className={z.col}>
            <div className={z.colLabel}>Офис</div>
            <div className={z.colText}>
              Новгородская обл., г. Пестово,<br />
              ул. Гайдара д. 8
            </div>
            <div className={z.colMuted}>пн–пт с 9:00 до 18:00</div>
          </div>
          <div className={z.col}>
            <div className={z.colLabel}>Юридический адрес</div>
            <div className={z.colText}>
              174510 Новгородская обл.,<br />
              г. Пестово, ул. Производственная д. 11А
            </div>
          </div>
          <div className={z.col}>
            <div className={z.colLabel}>Контакты</div>
            <a href="tel:+79218444448" className={z.colLink}>+7 (921) 844-44-48</a>
            <a href="mailto:mail@prodoma.info" className={z.colLink}>mail@prodoma.info</a>
          </div>
          <div className={z.col}>
            <div className={z.colLabel}>Мы в соцсетях</div>
            <a href="https://www.youtube.com/channel/UCgulLMGVPa6xQyVRGZwIUmQ" className={z.colLink} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://t.me/andrey_zwet" className={z.colLink} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://vk.com/ckprodoma" className={z.colLink} target="_blank" rel="noopener noreferrer">Вконтакте</a>
          </div>
        </div>

        <div className={z.divider} />

        <div className={z.bottom}>
          <div className={z.copyright}>© 2025 ООО «ПроДома». Все права защищены.</div>
          <div className={z.docs}>
            <button className={z.docLink} onClick={() => setActiveDoc('ooo')}>
              Свидетельство ООО «ПроДома»
            </button>
            <button className={z.docLink} onClick={() => setActiveDoc('ip')}>
              Свидетельство ИП Цветков А.И.
            </button>
          </div>
        </div>
      </div>

      {activeDoc && (
        <div className={z.overlay} onClick={() => setActiveDoc(null)}>
          <div className={z.lightbox} onClick={(e) => e.stopPropagation()}>
            <button className={z.closeBtn} onClick={() => setActiveDoc(null)}>✕</button>
            <img
              src={activeDoc === 'ooo' ? '/pics/prodoma.png' : '/pics/ip.jpg'}
              alt={activeDoc === 'ooo' ? 'Свидетельство ООО ПроДома' : 'Свидетельство ИП Цветков'}
              className={z.certImg}
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;