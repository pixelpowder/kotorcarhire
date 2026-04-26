'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const go = (dir) => {
    const next = (active + dir + images.length) % images.length;
    setActive(next);
  };

  // Keyboard arrows
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft')  go(-1);
      if (e.key === 'ArrowRight') go( 1);
    }
    const el = trackRef.current;
    if (el) el.addEventListener('keydown', onKey);
    return () => { if (el) el.removeEventListener('keydown', onKey); };
  }, [active, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="car-gallery"
      ref={trackRef}
      tabIndex={0}
      role="region"
      aria-label={`Photo gallery of ${alt}`}
    >
      <div className="car-gallery__stage">
        <div className="car-gallery__frame">
          {images.map((src, i) => (
            <img
            key={src}
            src={src}
            alt={`${alt}, photo ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`car-gallery__img${i === active ? ' car-gallery__img--active' : ''}`}
          />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="car-gallery__arrow car-gallery__arrow--prev"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="car-gallery__arrow car-gallery__arrow--next"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
            <div className="car-gallery__counter" aria-live="polite">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="car-gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={`thumb-${src}`}
              type="button"
              onClick={() => setActive(i)}
              className={`car-gallery__thumb${i === active ? ' car-gallery__thumb--active' : ''}`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
