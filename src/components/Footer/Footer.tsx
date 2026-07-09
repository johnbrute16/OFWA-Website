import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Send } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  formspreeId?: string; // e.g. "xpzoqarg"
}

export const Footer: React.FC<FooterProps> = ({ formspreeId = '' }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setStatus('submitting');

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          setStatus('success');
          setEmail('');
          setConsent(false);
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Mock API delay
      setTimeout(() => {
        setStatus('success');
        setEmail('');
        setConsent(false);
        setTimeout(() => setStatus('idle'), 3500);
      }, 1200);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <img className={styles.footerLogo} src="/assets/images/ofwa-logo-new.png" alt="OFWA" />
          <h3 className={styles.footerName}>Open Foundation West Africa</h3>
          
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <span>132 52 Swaniker St, Accra, Ghana</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <a href="tel:+233559959694">+233 55 995 9694</a>
            </div>
          </div>

          <Link className={styles.footerDonatePill} to="/donate">
            <Heart size={14} fill="currentColor" />
            <span>Donate Now</span>
          </Link>
        </div>

        <div className={styles.linksCol}>
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/blog">News</Link></li>
            <li><Link to="/volunteer">Volunteer</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Get Involved</h4>
          <ul>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/partner">Partner With Us</Link></li>
            <li><Link to="/volunteer">Volunteer</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.facebook.com/ofwafrica/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://x.com/OFWAFRICA" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
            <li><a href="https://gh.linkedin.com/company/ofwafrica" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.youtube.com/@ofwafrica/videos" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.newsletterBand}>
        <div className={`container ${styles.newsletterInner}`}>
          <div className={styles.newsletterText}>
            <h3>Stay in the Loop</h3>
            <p>Get the latest news, events, and impact stories from OFWA delivered to your inbox.</p>
          </div>

          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <input
                className={styles.newsletterInput}
                type="email"
                placeholder={status === 'success' ? 'Thanks for subscribing!' : 'Enter your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'submitting' || status === 'success'}
                required
              />
              <button 
                type="submit" 
                className={styles.newsletterBtn}
                disabled={status === 'submitting' || !consent}
              >
                {status === 'submitting' ? (
                  <span className={styles.spinner} />
                ) : status === 'success' ? (
                  'Subscribed!'
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </div>
            
            <label className={styles.consentLabel}>
              <input 
                type="checkbox" 
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={status === 'submitting' || status === 'success'}
                required 
              />
              <span>I agree to the Privacy Policy</span>
            </label>

            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <p>© {currentYear} Open Foundation West Africa. All rights reserved. · Built for open knowledge.</p>
      </div>
    </footer>
  );
};
