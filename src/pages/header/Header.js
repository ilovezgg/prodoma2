'use client';
import React, { useState } from 'react';
import z from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ProjectModal from './ProjectModal';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={z.main}>
        <div className={z.logo}>
          <Link href="/">
            <Image src="/pics/logo.svg" alt="Логотип" width={200} height={50} />
          </Link>
        </div>

        <div className={z.navigation}>
          <Link className={z.navLink} href="/articles">Статьи</Link>
          <div className={z.navLink} onClick={() => setModalOpen(true)}>Подобрать проект</div>
          <div className={z.navLink}>Отзывы</div>
          <div className={z.navLink}>Контакты</div>
        </div>

        <button className={z.burger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        {menuOpen && (
          <div className={z.mobileMenu}>
            <Link className={z.mobileLink} href="/articles" onClick={() => setMenuOpen(false)}>Статьи</Link>
            <div className={z.mobileLink} onClick={() => { setMenuOpen(false); setModalOpen(true); }}>Подобрать проект</div>
            <div className={z.mobileLink} onClick={() => setMenuOpen(false)}>Отзывы</div>
            <div className={z.mobileLink} onClick={() => setMenuOpen(false)}>Контакты</div>
          </div>
        )}
      </div>

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;