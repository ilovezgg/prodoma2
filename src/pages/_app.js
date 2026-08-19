// src/pages/_app.js
import React from 'react';
import Head from 'next/head';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../app/globals.css';

const SITE_URL = 'https://prodoma.info'; // ваш домен, не vercel.app

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ProDoma — загородные дома под ключ</title>
        <meta
          name="description"
          content="Строим дома под ключ с 2012 года: 142 сданных объекта. Деньги в банке до сдачи, цена в договоре финальная, независимый техконтроль."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ProDoma" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Загородные дома под ключ — от проекта до тапочек" />
        <meta property="og:description" content="142 дома сдано с 2019 года. Твёрдая смета, эскроу-счёт, независимый техконтроль." />
        <meta property="og:image" content={`${SITE_URL}/og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}