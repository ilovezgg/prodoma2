import React from 'react';
import Header from '../pages/header/Header';
import Main from '../pages/main/Main';
import Smeta from '../pages/freeSm/Smeta';
import HowWeWork from '../pages/howWeWork/HowWeWork';
import Review from '../pages/review/Review';
import Catalog from '../pages/catalog/Catalog';
import CallBack from '../pages/callback/CallBack';
import '../app/globals.css'
import Footer from './footer/Footer';
import Exrow from './exrowPage/Exrow';
import Escrow1 from './exsrow/Escrow1';
import Nalog from './nalog/Nalog';
export default function HomePage() {
  return (
    <div className="App">
     
      <Main />
      <Smeta />
      <Nalog/>
      <Escrow1/>
      <HowWeWork />
      <Review />
      <Catalog />
      <CallBack />
     
    </div>
  );
}