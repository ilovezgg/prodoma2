'use client'
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Articles from './articles/Articles';

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <Articles />
      <Footer />
    </>
  );
}