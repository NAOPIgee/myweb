'use client';

import { useState } from 'react';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-[400px] group rounded-xl overflow-hidden bg-gray-100">
      <div
        className="w-full h-full bg-center bg-cover duration-500 ease-in-out transition-all"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition" onClick={prevSlide}>
        ❮
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition" onClick={nextSlide}>
        ❯
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all ${currentIndex === slideIndex ? 'bg-white scale-110' : 'bg-white/50'
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}