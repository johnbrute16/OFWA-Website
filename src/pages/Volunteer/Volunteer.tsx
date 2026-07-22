import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send, CheckCircle2, Award, Users, BookOpen, MapPin, ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Volunteer.module.css';

/* ── Stat Item Component ─────────────────────────── */
const StatItem: React.FC<{ end: number; suffix?: string; label: string; delay?: string }> = ({ end, suffix = '', label, delay }) => {
  const { formattedCount, elementRef } = useCountUp({ end, suffix });
  return (
    <div className={`${styles.statItem} reveal ${delay || ''}`} ref={elementRef as React.Ref<HTMLDivElement>}>
      <strong className={styles.statNum}>{formattedCount}</strong>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

const roles = [
  {
    icon: <BookOpen size={24} />,
    title: 'Wikipedia Editor',
    tag: 'Content Creation',
    body: 'Create and improve Wikipedia articles about African history, culture, and notable figures. Full training provided — no prior experience needed.',
  },
  {
    icon: <Users size={24} />,
    title: 'Trainer & Facilitator',
    tag: 'Mentorship',
    body: 'Lead workshops and edit-a-thons at community hubs, universities, or high schools — teaching digital literacy and Wikipedia editing tools.',
  },
  {
    icon: <Compass size={24} />,
    title: 'Language Translator',
    tag: 'Local Knowledge',
    body: 'Help translate open content into Ghanaian languages (Twi, Dagbani, Ewe, Ga, etc.) to make knowledge accessible across all communities.',
  },
  {
    icon: <Award size={24} />,
    title: 'Photographer & Media Contributor',
    tag: 'Media Commons',
    body: 'Capture local monuments, cultural festivals, and community workshops to upload freely usable media to Wikimedia Commons.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Tech & Open Source Developer',
    tag: 'Engineering',
    body: 'Build open-source tools, maintain infrastructure, and deploy KIWIX offline educational servers in low-connectivity schools across Ghana.',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Hub Coordinator & Social Lead',
    tag: 'Community Growth',
    body: 'Help coordinate local Wiki Hub meetups, manage community stories, and advocate for open knowledge across regional campuses.',
  },
];

const perks = [
  'Gain globally recognized Wikimedia digital skills & certification',
  'Receive hands-on mentorship from experienced open knowledge leaders',
  'Network with tech, research, and open knowledge communities across Africa',
  'Access sponsored edit-a-thons, internet data stipends, & event passes',
  'Lead national projects like Africa Wiki Challenge & KIWIX4Schools',
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
        <div className={styles.heroGlowOverlay} />
        <div className="container">
          <span className={`${styles.heroKicker} reveal`}>
            <Sparkles size={14} /> Join The Movement
          </span>
          <h1 className={`${styles.heroTitle} reveal d1`}>
            Volunteer With <span>OFWA</span>
          </h1>
          <p className={`${styles.heroSub} reveal d2`}>
            Bring your passion, talent, and voice to a movement that's putting African stories, history, and knowledge on the global stage.
          </p>
          <div className={`${styles.heroCtas} reveal d3`}>
            <a href="#volunteer-form" className={styles.btnPrimary}>
              Apply Now <ArrowRight size={16} />
            </a>
            <a href="#open-roles" className={styles.btnSecondary}>
              Explore Open Roles
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className={styles.statsBand}>
        <div className="container">
          <div className={styles.statsGrid}>
            <StatItem end={500} suffix="+" label="Trained Volunteers" />
            <StatItem end={40} suffix="K+" label="Wikipedia Articles Created" delay="d1" />
            <StatItem end={16} label="Ghana Regions Reached" delay="d2" />
            <StatItem end={100} suffix="%" label="Free & Open Access" delay="d3" />
          </div>
        </div>
      </section>

      {/* WHY VOLUNTEER & PERKS */}
      <section className={styles.whyVolunteerSection}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className="reveal">
              <span className="section-tag">Why It Matters</span>
              <h2 className={styles.splitTitle}>Your Skills Can Reframe African History</h2>
              <p className={styles.splitBody}>
                Wikipedia is the world's primary source of free knowledge, yet less than 20% of contributors are women, and African topics remain severely underrepresented.
              </p>
              <p className={styles.splitBody}>
                At Open Foundation West Africa (OFWA), our volunteers are the driving engine closing this gap. Whether you write, teach, translate, capture photos, or code — there is a high-impact role for you.
              </p>

              <div className={styles.perksList}>
                {perks.map((perk, idx) => (
                  <div key={idx} className={styles.perkItem}>
                    <CheckCircle2 size={18} className={styles.perkIcon} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.splitImgColumn} reveal d2`}>
              <div className={styles.imgCardWrap}>
                <img src="/assets/images/hub-photo-2.png" alt="OFWA volunteers in training session" className={styles.splitImg} />
                <div className={styles.imgCardOverlay} />
                <div className={styles.imgCardBadge}>
                  <ShieldCheck size={20} />
                  <div>
                    <strong>Impact-Driven Community</strong>
                    <span>Ghana & West Africa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section id="open-roles" className={styles.rolesSection}>
        <div className="container">
          <div className={styles.rolesHead}>
            <span className="section-tag reveal">Opportunities</span>
            <h2 className={`${styles.rolesTitle} reveal d1`}>How You Can Contribute</h2>
            <p className={`${styles.rolesSub} reveal d2`}>
              Choose an area that aligns with your skills and passion. Training and mentorship are provided for all roles.
            </p>
          </div>

          <div className={styles.rolesGrid}>
            {roles.map((r, i) => (
              <div key={i} className={`${styles.roleCard} reveal ${i > 0 ? `d${i % 4}` : ''}`}>
                <div className={styles.roleCardTop}>
                  <div className={styles.roleIconBox}>{r.icon}</div>
                  <span className={styles.roleTag}>{r.tag}</span>
                </div>
                <h3 className={styles.roleTitle}>{r.title}</h3>
                <p className={styles.roleBody}>{r.body}</p>
                <a href="#volunteer-form" className={styles.roleApplyLink} onClick={() => {
                  setFormData(prev => ({ ...prev, role: r.title }));
                }}>
                  Apply for this role <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER TESTIMONIAL */}
      <section className={styles.quoteSection}>
        <div className="container">
          <div className={styles.quoteCard}>
            <span className={styles.quoteMark}>“</span>
            <p className={styles.quoteText}>
              Volunteering with OFWA gave me a platform to document the history of Ghanaian women who were invisible online. Now their contributions inspire thousands of readers around the world every single day.
            </p>
            <div className={styles.quoteAuthor}>
              <strong>Akosua Mensah</strong>
              <span>Lead Community Editor · Kumasi Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="volunteer-form" className={styles.formSection}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className={styles.formCard}>
            <div className={styles.formHead}>
              <span className="section-tag">Get Started</span>
              <h2 className={styles.formTitle}>Volunteer Expression of Interest</h2>
              <p className={styles.formSub}>
                Fill out the form below and our team will get in touch to match you with upcoming programs and hub sessions.
              </p>
            </div>

            <form className={styles.volunteerForm} onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className={styles.successBanner}>
                  <CheckCircle2 size={22} />
                  <div>
                    <h3>Thank you for joining us!</h3>
                    <p>We have received your expression of interest. Our team will review your application and reach out shortly.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorBanner}>
                  <p>Something went wrong submitting your application. Please try again or contact us directly at info@ofwafrica.org.</p>
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Full Name *</label>
                  <input
                    className={styles.formInput}
                    id="name"
                    type="text"
                    placeholder="e.g. Ama Serwaa"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Email Address *</label>
                  <input
                    className={styles.formInput}
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="phone">Phone Number (Optional)</label>
                  <input
                    className={styles.formInput}
                    id="phone"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="location">City / Region *</label>
                  <input
                    className={styles.formInput}
                    id="location"
                    type="text"
                    placeholder="e.g. Accra, Kumasi, Tamale, Cape Coast"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="role">Preferred Area of Interest *</label>
                <select
                  className={styles.formInput}
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                >
                  <option value="">Select a role…</option>
                  <option value="Wikipedia Editor">Wikipedia Editor</option>
                  <option value="Trainer & Facilitator">Trainer &amp; Facilitator</option>
                  <option value="Language Translator">Language Translator</option>
                  <option value="Photographer & Media Contributor">Photographer &amp; Media Contributor</option>
                  <option value="Tech & Open Source Developer">Tech &amp; Open Source Developer</option>
                  <option value="Hub Coordinator & Social Lead">Hub Coordinator &amp; Social Lead</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="message">Tell Us About Yourself & Motivation *</label>
                <textarea
                  className={`${styles.formInput} ${styles.formTextarea}`}
                  id="message"
                  rows={4}
                  placeholder="Share your background, skills, interests, and why you'd like to volunteer with OFWA…"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                />
              </div>

              <button
                className={styles.btnSubmit}
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    <span>Submit Expression of Interest</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Can't Volunteer Your Time?</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Support Our Volunteers</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>
            Your financial support helps us provide internet stipends, workshop materials, transport, and community hubs for volunteers on the ground.
          </p>
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

