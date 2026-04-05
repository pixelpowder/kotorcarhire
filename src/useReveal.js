'use client';
import { useEffect } from 'react';

// Global scroll reveal - watches all .reveal-item and .reveal-up elements
export default function useGlobalReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all reveal elements
    function observe() {
      document.querySelectorAll('.reveal-item:not(.revealed), .reveal-up:not(.revealed)').forEach((el) => {
        observer.observe(el);
      });
    }

    // Initial observe + re-observe on DOM changes (for lazy-loaded content)
    observe();
    const mutObs = new MutationObserver(observe);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);
}
