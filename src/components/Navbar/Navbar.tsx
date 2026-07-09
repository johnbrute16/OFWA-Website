import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.siteNav} ${scrolled ? styles.scrolled : ''}`} data-open={isOpen}>
      <div className={`container ${styles.navInner}`}>
        <NavLink to="/" className={styles.navLogo} onClick={closeMenu}>
          <img src="/assets/images/ofwa-logo-new.png" alt="OFWA Logo" />
          <span className={styles.navLogoText}>
            Open Foundation<br />West Africa
          </span>
        </NavLink>

        <ul className={`${styles.navMenu} ${isOpen ? styles.menuOpen : ''}`} role="list">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/events" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/volunteer" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Volunteer
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={styles.navActions}>
          <NavLink to="/donate" className={styles.navDonate} onClick={closeMenu}>
            <Heart size={15} fill="currentColor" />
            <span>Donate Now</span>
          </NavLink>
          <button 
            className={styles.navToggle} 
            onClick={toggleMenu} 
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
