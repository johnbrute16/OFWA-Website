import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Partner.module.css';

const benefits = [
  {
    num: '01',
    title: 'Trusted Community Reach',
    desc: 'We have established relationships with communities, universities, schools, and media across Ghana and West Africa.',
  },
  {
    num: '02',
    title: 'Proven Impact',
    desc: 'We can demonstrate measurable outcomes — articles written, editors trained, schools reached, and communities served.',
  },
  {
    num: '03',
    title: 'Aligned with Global Goals',
    desc: 'Our work aligns with the UN SDGs on quality education, gender equality, and reduced inequalities.',
  },
  {
    num: '04',
    title: 'Flexible Partnership Models',
    desc: 'From project sponsorship to institutional MOUs — we tailor collaboration structures to your organisation\'s goals.',
  },
];

const models = [
  {
    icon: '🏢',
    title: 'Corporate Sponsorship',
    body: 'Sponsor our events, training programs, or hub operations. Ideal for companies with CSR commitments to education and digital equity.',
  },
  {
    icon: '🎓',
    title: 'Institutional MOU',
    body: 'Universities and schools can partner to establish Wikipedia clubs, host edit-a-thons, and integrate open knowledge into curricula.',
  },
  {
    icon: '🌍',
    title: 'NGO & Civil Society',
    body: 'Joint program delivery, shared resources, and co-advocacy for open access and digital rights across Africa.',
  },
  {
    icon: '🏛️',
    title: 'Government & Institutional',
    body: 'We work with government agencies to digitise heritage, create public knowledge resources, and train civil servants in open tools.',
  },
];

const Partner: React.FC = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeId = import.meta.env.VITE_FORMSPREE_PARTNER_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', organisation: '', type: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Mock API trigger
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', organisation: '', type: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Collaborate With Us</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>Partner With OFWA</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>Together we can close the knowledge gap faster. We're looking for organisations that share our commitment to open access, equity, and Africa's digital future.</p>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className={styles.whyPartnerSection}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div>
              <span className="section-tag reveal">The Case for Partnership</span>
              <h2 className={`${styles.splitTitle} reveal d1`}>Why Partner With OFWA?</h2>
              <div className={styles.benefitsList}>
                {benefits.map((b, i) => (
                  <div key={i} className={`${styles.benefitItem} reveal ${i > 0 ? `d${i}` : ''}`}>
                    <span className={styles.benefitNum}>{b.num}</span>
                    <div>
                      <strong className={styles.benefitTitle}>{b.title}</strong>
                      <p className={styles.benefitDesc}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.splitImgWrap} reveal d2`}>
              <img src="/assets/images/partners-new.png" alt="OFWA Partners" />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP MODELS */}
      <section className={styles.modelsSection}>
        <div className="container">
          <div className={styles.modelsHead}>
            <span className="section-tag reveal">Partnership Models</span>
            <h2 className={`${styles.modelsTitle} reveal d1`}>How We Can Work Together</h2>
          </div>
          <div className={styles.modelsGrid}>
            {models.map((m, i) => (
              <div key={i} className={`${styles.modelCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.modelIcon}>{m.icon}</div>
                <h3 className={styles.modelTitle}>{m.title}</h3>
                <p className={styles.modelBody}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY STRIP */}
      <section className={styles.trustedSection}>
        <div className="container">
          <span className="section-tag reveal">Our Network</span>
          <h2 className={`${styles.trustedTitle} reveal d1`}>Trusted By Leading Organisations</h2>
          <div className={`${styles.partnersStrip} reveal d2`}>
            <img src="/assets/images/partners-strip.png" alt="OFWA partner organisations" />
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className={styles.formSection}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className={styles.formHead}>
            <span className="section-tag reveal">Get in Touch</span>
            <h2 className={`${styles.formTitle} reveal d1`}>Start a Conversation</h2>
            <p className={`${styles.formSub} reveal d2`}>Tell us about your organisation and how you'd like to collaborate. Our partnerships team will respond within 48 hours.</p>
          </div>

          <form className={`${styles.partnerForm} contact-form reveal d3`} onSubmit={handleSubmit}>
            {status === 'success' && (
              <div className={styles.successBanner}>
                <h3>✓ Partnership Enquiry Submitted!</h3>
                <p>Thank you for reaching out. We appreciate your interest in collaborating. A member of our team will contact you within 48 hours.</p>
              </div>
            )}

            {status === 'error' && (
              <div className={styles.errorBanner}>
                <p>Something went wrong. Please try submitting again or email us directly at info@ofwafrica.org.</p>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Contact Name</label>
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
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  className="form-input"
                  id="email"
                  type="email"
                  placeholder="work@organisation.org"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="organisation">Organisation Name</label>
                <input
                  className="form-input"
                  id="organisation"
                  type="text"
                  placeholder="Your organisation name"
                  value={formData.organisation}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="type">Partnership Type</label>
                <select
                  className="form-input"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                >
                  <option value="">Select type…</option>
                  <option value="Corporate Sponsorship">Corporate Sponsorship</option>
                  <option value="Institutional MOU">Institutional MOU</option>
                  <option value="NGO / Civil Society">NGO / Civil Society</option>
                  <option value="Government / Institutional">Government / Institutional</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Tell us about your goals</label>
              <textarea
                className="form-input form-textarea"
                id="message"
                rows={5}
                placeholder="What does your organisation do, and how do you see us working together?"
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
                  <span>Submit Partnership Enquiry</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Or Make a Direct Contribution</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Donate to Support Our Work</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Not ready to partner yet? A donation goes directly towards training, hubs, and community impact.</p>
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

export default Partner;
