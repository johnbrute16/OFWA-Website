import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  formspreeId?: string; // e.g. "xpzoqarg"
}

export const Footer: React.FC<FooterProps> = () => {
  // const [email, setEmail] = useState('');
  // const [consent, setConsent] = useState(false);
  // const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!consent) return;

  //   setStatus('submitting');

  //   if (formspreeId) {
  //     try {
  //       const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email }),
  //       });
  //       if (response.ok) {
  //         setStatus('success');
  //         setEmail('');
  //         setConsent(false);
  //       } else {
  //         setStatus('error');
  //       }
  //     } catch {
  //       setStatus('error');
  //     }
  //   } else {
  //     // Mock API delay
  //     setTimeout(() => {
  //       setStatus('success');
  //       setEmail('');
  //       setConsent(false);
  //       setTimeout(() => setStatus('idle'), 3500);
  //     }, 1200);
  //   }
  // };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <div className={styles.brandHeader}>
            <img className={styles.footerLogo} src="/assets/images/ofwa-logo-new.png" alt="OFWA" />
            <h3 className={styles.footerName}>Open Foundation West Africa</h3>
          </div>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <MapPin size={15} className={styles.contactIcon} />
              <span>132 52 Swaniker St, Accra, Ghana</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={15} className={styles.contactIcon} />
              <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={15} className={styles.contactIcon} />
              <a href="tel:+233559959694">+233 55 995 9694</a>
            </div>
          </div>

          <Link className={styles.footerDonatePill} to="/donate">
            <Heart size={14} fill="currentColor" />
            <span>Donate Now</span>
          </Link>
        </div>

        <div className={styles.navGroup}>
          <div className={styles.linksRow}>
            <h4 className={styles.rowTitle}>Navigate</h4>
            <ul className={styles.rowLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blog">News</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.linksRow}>
            <h4 className={styles.rowTitle}>Get Involved</h4>
            <ul className={styles.rowLinks}>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/partner">Partner With Us</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
            </ul>
          </div>

          <div className={styles.linksRow}>
            <h4 className={styles.rowTitle}>Follow Us</h4>
            <ul className={styles.rowLinks}>
              <li><a href="https://www.facebook.com/ofwafrica/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://x.com/OFWAFRICA" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://gh.linkedin.com/company/ofwafrica" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.youtube.com/@ofwafrica/videos" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>© {currentYear} Open Foundation West Africa. All rights reserved. · Built for open knowledge.</p>
      </div>
    </footer>
  );
};
