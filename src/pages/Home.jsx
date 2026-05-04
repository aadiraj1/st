import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import FilmAnatomy from '../components/FilmAnatomy';
import FilmVariants from '../components/FilmVariants';
import PerformanceMetrics from '../components/PerformanceMetrics';
import Industries from '../components/Industries';
import VehicleVisualizer from '../components/VehicleVisualizer';
import Comparison from '../components/Comparison';
import Bestsellers from '../components/Bestsellers';
import ReviewsMarquee from '../components/ReviewsMarquee';
import Articles from '../components/Articles';
import GlobalMap from '../components/GlobalMap';
import DealerNetwork from '../components/DealerNetwork';

const Home = () => {
  return (
    <main>
      <Hero />
      <Marquee />
      <FilmAnatomy />
      <FilmVariants />
      <PerformanceMetrics />
      <Industries />
      <VehicleVisualizer />
      <Comparison />
      <Bestsellers />
      <ReviewsMarquee />
      <Articles />
      <GlobalMap />
      <DealerNetwork />
    </main>
  );
};

export default Home;
