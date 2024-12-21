import React from 'react';
import ProductGrid from '../component/ProductGrid.jsx';
import Testimonials from '../component/Testimonials.jsx';
import Categories from '../component/Cateories.jsx';
import Hero from "../component/Hero.jsx"

export default function Home() {
  return (
    <div className="min-h-screen bg-rose-50">
      <Hero />
      <Categories />
      <ProductGrid />
      <Testimonials />
    </div>
  );
}