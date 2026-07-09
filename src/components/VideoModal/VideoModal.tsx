import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  useEffect(() => {
    if (!videoId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Video player"
    >
      <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.modalClose} 
          onClick={onClose} 
          aria-label="Close video player"
        >
          <X size={20} />
        </button>
        <div className={styles.videoFrame}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="OFWA Video Player"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
