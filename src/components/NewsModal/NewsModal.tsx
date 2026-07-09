import React, { useEffect, useRef } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import styles from './NewsModal.module.css';

export interface NewsArticle {
  img: string;
  cat: string;
  title: string;
  excerpt?: string;
  desc?: string;
  date: string;
  author: string;
  readTime: string;
  content: string[];
  gallery?: string[];
}

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ article, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock page scrolling
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Focus the modal for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      ref={modalRef}
    >
      <div
        className={styles.modalInner}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close article modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable Container */}
        <div className={styles.modalScrollBody}>
          {/* Header Section */}
          <header className={styles.modalHeader}>
            <span className={styles.articleCat}>{article.cat}</span>
            <h2 id="modal-title" className={styles.articleTitle}>{article.title}</h2>
            
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <User size={14} />
                <span>By {article.author}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </header>

          {/* Featured/Hero Image */}
          <div className={styles.heroImgContainer}>
            <img src={article.img} alt={article.title} className={styles.heroImg} />
          </div>

          {/* Article Body */}
          <div className={styles.articleBody}>
            {article.content.map((paragraph, index) => {
              // Enhance the first paragraph as an intro/lead paragraph
              if (index === 0) {
                return (
                  <p key={index} className={styles.leadParagraph}>
                    {paragraph}
                  </p>
                );
              }
              // Render every 3rd paragraph (if multiple exist) as a custom blockquote for dynamic design
              if (index === 2 && article.content.length > 3) {
                return (
                  <blockquote key={index} className={styles.blockquote}>
                    <p>{paragraph}</p>
                  </blockquote>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Dynamic Gallery Section if additional images exist */}
          {article.gallery && article.gallery.length > 0 && (
            <div className={styles.gallerySection}>
              <h3 className={styles.galleryTitle}>Event Gallery</h3>
              <div className={styles.galleryGrid}>
                {article.gallery.map((imgUrl, i) => (
                  <div key={i} className={styles.galleryImgWrap}>
                    <img src={imgUrl} alt={`${article.title} gallery ${i + 1}`} className={styles.galleryImg} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
