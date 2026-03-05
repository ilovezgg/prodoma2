// src/pages/_app.js
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import '../app/globals.css'; 

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}