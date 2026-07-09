import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Volunteer.module.css';

const roles = [
  {
    icon: '✏️',
    title: 'Wikipedia Editor',
    body: 'Create and improve Wikipedia articles about African people, places, and culture. Training provided — no prior experience needed.',
  },
  {
    icon: '👩‍🏫',
    title: 'Trainer & Facilitator',
    body: 'Lead workshops at community hubs, universities, or schools — teaching Wikipedia editing, digital literacy, and open-source tools.',
  },
  {
    icon: '🌐',
    title: 'Translator',
    body: 'Help translate content into Twi, Dagbani, Ewe, Ga, and other Ghanaian and West African languages to reach more communities.',
  },
  {
    icon: '📷',
    title: 'Photographer & Documenter',
    body: 'Capture our events and programs for Wikimedia Commons and OFWA archives — sharing images the world can use freely.',
  },
  {
    icon: '💻',
    title: 'Tech & Developer',
    body: 'Help us build tools, maintain systems, and support KIWIX4Schools server deployments in low-connectivity environments.',
  },
  {
    icon: '📣',
    title: 'Communications & Social',
    body: 'Help amplify OFWA\'s voice — writing stories, managing social media, and documenting the impact of our programs.',
  },
];

const Volunteer: React.FC = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Check for Formspree ID from Env Variables
    const formspreeId = import.meta.env.VITE_FORMSPREE_VOLUNTEER_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', location: '', role: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Mock delayed response
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', location: '', role: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Give Your Time</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>Volunteer With OFWA</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>Bring your passion and skills to a movement that's reshaping who gets to write history. We need you.</p>
        </div>
      </section>

      {/* WHY VOLUNTEER */}
      <section className={styles.whyVolunteerSection}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className="reveal">
              <span className="section-tag">Why It Matters</span>
              <h2 className={styles.splitTitle}>Your Skills Can Change the Story</h2>
              <p className={styles.splitBody}>Wikipedia has a massive representation gap when it comes to Africa — fewer than 20% of Wikipedia editors are women, and African topics are severely underrepresented. Volunteers are at the heart of closing that gap.</p>
              <p className={styles.splitBody}>Whether you write, teach, design, translate, or code — there's a role for you in our network.</p>
              <p className={styles.splitBody}>OFWA volunteers have collectively contributed thousands of hours, hundreds of articles, and priceless mentorship to communities across Ghana and beyond.</p>
            </div>
            <div className={`${styles.splitImgWrap} reveal d1`}>
              <img src="/assets/images/hub-photo-2.png" alt="OFWA volunteers at work" />
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className={styles.rolesSection}>
        <div className="container">
          <div className={styles.rolesHead}>
            <span className="section-tag reveal">Open Roles</span>
            <h2 className={`${styles.rolesTitle} reveal d1`}>How You Can Help</h2>
          </div>
          <div className={styles.rolesGrid}>
            {roles.map((r, i) => (
              <div key={i} className={`${styles.roleCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.roleIcon}>{r.icon}</div>
                <h3 className={styles.roleTitle}>{r.title}</h3>
                <p className={styles.roleBody}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className={styles.formSection}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className={styles.formHead}>
            <span className="section-tag reveal">Join Us</span>
            <h2 className={`${styles.formTitle} reveal d1`}>Volunteer Expression of Interest</h2>
            <p className={`${styles.formSub} reveal d2`}>Fill in the form below and our team will reach out to match you with the right program.</p>
          </div>

          <form className={`${styles.volunteerForm} contact-form reveal d3`} onSubmit={handleSubmit}>
            {status === 'success' && (
              <div className={styles.successBanner}>
                <h3>✓ Thank you for your interest!</h3>
                <p>We have received your expression of interest. Our team will review it and get in touch with you shortly.</p>
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
                <label className="form-label" htmlFor="email">Email</label>
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

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone (optional)</label>
                <input
                  className="form-input"
                  id="phone"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="location">City / Region</label>
                <input
                  className="form-input"
                  id="location"
                  type="text"
                  placeholder="Where are you based?"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="role">Area of Interest</label>
              <select
                className="form-input"
                id="role"
                value={formData.role}
                onChange={handleChange}
                disabled={status === 'submitting'}
                required
              >
                <option value="">Select a role…</option>
                <option value="Wikipedia Editor">Wikipedia Editor</option>
                <option value="Trainer & Facilitator">Trainer &amp; Facilitator</option>
                <option value="Translator">Translator</option>
                <option value="Photographer & Documenter">Photographer &amp; Documenter</option>
                <option value="Tech & Developer">Tech &amp; Developer</option>
                <option value="Communications & Social">Communications &amp; Social</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Tell us about yourself</label>
              <textarea
                className="form-input form-textarea"
                id="message"
                rows={5}
                placeholder="Share your background, skills, and why you'd like to volunteer…"
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
                  <span>Submit Expression of Interest</span>
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
          <p className={`${styles.donateCtaTag} reveal`}>Can't Volunteer?</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Donate to Support Our Volunteers</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Your financial contribution covers transport, materials, and training for the volunteers making a difference on the ground.</p>
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

export default Volunteer;
