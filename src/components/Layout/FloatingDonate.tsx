import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './FloatingDonate.module.css';

export const FloatingDonate: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link 
      to="/donate" 
      className={`${styles.floatDonate} ${visible ? styles.visible : ''}`}
      aria-label="Donate now to Open Foundation West Africa"
    >
      <Heart size={16} fill="currentColor" className={styles.heartIcon} />
      <span>Donate Now</span>
    </Link>
  );
};
