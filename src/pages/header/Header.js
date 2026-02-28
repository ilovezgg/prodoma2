'use client';
import React, { useState } from 'react';
import z from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={z.main}>
      <div className={z.logo}>
        <div className={z.logoPic} />
      </div>

      <div className={z.navigation}>
        <Link className={z.chooseProject} href="/articles">Статьи</Link>
        <div className={z.chooseProject}>Подобрать проект</div>
        <div className={z.reviews}>Отзывы</div>
        <div className={z.contacts}>Контакты</div>
      </div>

      <button className={z.burger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className={z.mobileMenu}>
          <Link className={z.mobileLink} href="/articles" onClick={() => setMenuOpen(false)}>Статьи</Link>
          <div className={z.mobileLink} onClick={() => setMenuOpen(false)}>Подобрать проект</div>
          <div className={z.mobileLink} onClick={() => setMenuOpen(false)}>Отзывы</div>
          <div className={z.mobileLink} onClick={() => setMenuOpen(false)}>Контакты</div>
        </div>
      )}
    </div>
  );
};

export default Header;