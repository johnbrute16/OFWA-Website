import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Lightbox.module.css';

interface ImageItem {
  full: string;
  alt: string;
}

interface LightboxProps {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const [fade, setFade] = useState(false);

  const triggerPrev = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      onPrev();
      setFade(false);
    }, 120);
  }, [onPrev]);

  const triggerNext = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      onNext();
      setFade(false);
    }, 120);
  }, [onNext]);

  useEffect(() => {
    if (currentIndex === -1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') triggerPrev();
      if (e.key === 'ArrowRight') triggerNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, onClose, triggerPrev, triggerNext]);

  if (currentIndex === -1 || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className={styles.lightboxOverlay} 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Photo viewer"
    >
      <div className={styles.imgWrap} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose} 
          aria-label="Close photo viewer"
        >
          <X size={20} />
        </button>

        <img 
          src={currentImage.full} 
          alt={currentImage.alt} 
          className={`${styles.lightboxImg} ${fade ? styles.fade : ''}`}
        />

        <div className={styles.captionBar}>
          <p className={styles.captionText}>{currentImage.alt || 'Open Foundation West Africa'}</p>
          <span className={styles.counter}>{currentIndex + 1} / {images.length}</span>
        </div>

        {images.length > 1 && (
          <>
            <button 
              className={`${styles.arrowBtn} ${styles.prevBtn}`} 
              onClick={triggerPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={`${styles.arrowBtn} ${styles.nextBtn}`} 
              onClick={triggerNext}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
