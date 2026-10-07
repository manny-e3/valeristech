import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Process from '../components/Process';
import BottomCta from '../components/BottomCta';
import Pricing from '../components/Pricing';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <BottomCta />

      {/* <Pricing />
      <Stats /> */}
      {/* <Testimonials /> */}
      {/* <Blog /> */}
    </main>
  );
}
