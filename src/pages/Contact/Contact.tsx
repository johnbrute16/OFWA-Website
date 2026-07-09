import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2, Send, Plus, Minus, Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

const faqs = [
  {
    q: 'How can I volunteer with OFWA?',
    a: 'Visit our Volunteer page to fill in an expression of interest form. We match volunteers with programs based on skills and availability.',
    link: '/volunteer',
    linkText: 'Volunteer page',
  },
  {
    q: 'Where are your hubs located?',
    a: 'We have active community hubs and Wiki clubs in Accra (×2), Kumasi, Cape Coast, Tamale (UDS), WaleWale, and Damango. See the interactive map on our About page.',
    link: '/about',
    linkText: 'About page',
  },
  {
    q: 'Can organisations partner with OFWA?',
    a: 'Absolutely. We welcome corporate, institutional, and civil society partnerships. Visit our Partner page to explore opportunities.',
    link: '/partner',
    linkText: 'Partner page',
  },
  {
    q: 'How are donations used?',
    a: 'Donations fund hub operations, training programs, equipment (especially offline KIWIX servers), community events, and our wiki-writing campaigns. See our Donate page for more.',
    link: '/donate',
    linkText: 'Donate page',
  },
];

const Contact: React.FC = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeId = import.meta.env.VITE_FORMSPREE_CONTACT_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
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
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Say Hello</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>Get in Touch</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>We'd love to hear from you — whether you're a potential partner, volunteer, donor, or just curious about what we do.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactLayout}>
            {/* FORM */}
            <div className={`${styles.contactFormWrap} reveal`}>
              <h2 className={styles.contactFormH}>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className={styles.successBanner}>
                    <h3>✓ Message Sent!</h3>
                    <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className={styles.errorBanner}>
                    <p>Something went wrong. Please try submitting again or email us directly at info@ofwafrica.org.</p>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input
                      className="form-input"
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      className="form-input"
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    className="form-input"
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    className="form-input form-textarea"
                    id="message"
                    rows={6}
                    placeholder="Tell us what's on your mind…"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                  />
                </div>

                <button
                  className="btn-orange"
                  type="submit"
                  style={{ width: '100%', justifyContent: 'center', cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* INFO */}
            <div className={`${styles.contactInfo} reveal d1`}>
              <h2 className={styles.contactInfoH}>Contact Information</h2>
              <div className={styles.contactInfoList}>
                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoIcon}>
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className={styles.contactInfoLabel}>Address</p>
                    <p className={styles.contactInfoVal}>132 52 Swaniker St, Achimota<br />Accra, Greater Accra, Ghana</p>
                  </div>
                </div>

                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoIcon}>
                    <Mail size={20} />
                  </span>
                  <div>
                    <p className={styles.contactInfoLabel}>Email</p>
                    <p className={styles.contactInfoVal}>
                      <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoIcon}>
                    <Phone size={20} />
                  </span>
                  <div>
                    <p className={styles.contactInfoLabel}>Phone</p>
                    <p className={styles.contactInfoVal}>
                      <a href="tel:+233559959694">+233 55 995 9694</a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactInfoItem}>
                  <span className={styles.contactInfoIcon}>
                    <Share2 size={20} />
                  </span>
                  <div>
                    <p className={styles.contactInfoLabel}>Follow Us</p>
                    <div className={styles.contactSocials}>
                      <a href="https://www.facebook.com/ofwafrica/" target="_blank" rel="noopener noreferrer">Facebook</a>
                      <a href="https://x.com/OFWAFRICA" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                      <a href="https://www.youtube.com/@ofwafrica/videos" target="_blank" rel="noopener noreferrer">YouTube</a>
                      <a href="https://gh.linkedin.com/company/ofwafrica" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contactQuick}>
                <h3 className={styles.contactQuickH}>Quick Links</h3>
                <div className={styles.contactQuickLinks}>
                  <Link className={styles.contactQuickBtn} to="/donate">♥ Donate</Link>
                  <Link className={`${styles.contactQuickBtn} ${styles.contactQuickBtnGhost}`} to="/volunteer">Volunteer</Link>
                  <Link className={`${styles.contactQuickBtn} ${styles.contactQuickBtnGhost}`} to="/partner">Partner With Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqHead}>
            <span className="section-tag reveal">Questions &amp; Answers</span>
            <h2 className={`${styles.faqTitle} reveal d1`}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} reveal ${i > 0 ? `d${i}` : ''}`}>
                <button
                  className={styles.faqBtn}
                  onClick={() => toggleFaq(i)}
                  aria-expanded={activeFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon}>
                    {activeFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <div className={`${styles.faqAnswer} ${activeFaq === i ? styles.faqAnswerOpen : ''}`}>
                  <p>
                    {faq.a.substring(0, faq.a.indexOf(faq.linkText))}
                    <Link to={faq.link}>{faq.linkText}</Link>
                    {faq.a.substring(faq.a.indexOf(faq.linkText) + faq.linkText.length)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Support the Mission</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Make a Donation Today</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Every cedi, dollar, or pound helps us reach more women with open knowledge training and community support.</p>
          <div className="reveal d3">
            <Link className={styles.btnDonateBig} to="/donate">
              <Heart size={16} fill="currentColor" /> Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
