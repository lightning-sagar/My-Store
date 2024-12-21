import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "https://ambraee.com/cdn/shop/files/jpeg-optimizer_SUIT_SETS_copy_ccd5010b-717e-43f5-9584-b4c8beda856a.jpg?v=1732104607&width=1920",
  },
  {
    image: "https://ambraee.com/cdn/shop/files/jpeg-optimizer_SHAADI_KA_UTSAV_copy.jpg?v=1732104516&width=1920",
  },
  {
    image: "https://ambraee.com/cdn/shop/files/jpeg-optimizer_LEHENGAS_copy_6851d301-4329-4a04-bf23-f5e9271dfb0f.jpg?v=1732105244&width=1920",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[30vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-contain md:object-fit"
          />
        </div>
      ))}
    </div>
  );
}
