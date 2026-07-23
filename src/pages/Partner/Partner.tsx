import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Send,
  Building2,
  GraduationCap,
  Globe2,
  Landmark,
  ShieldCheck,
  Award,
  Handshake,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Mail,
  Users
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Partner.module.css';

const stats = [
  { value: '50+', label: 'Global & Regional Partners' },
  { value: '10M+', label: 'Knowledge Readers Reached' },
  { value: '100+', label: 'University & Community Hubs' },
  { value: '15+', label: 'West African Countries Impacted' },
];

const benefits = [
  {
    icon: ShieldCheck,
    num: '01',
    title: 'Trusted Regional Reach',
    desc: 'Deeply rooted in West Africa’s academic, tech, and cultural institutions with established networks across 15+ countries.',
  },
  {
    icon: Award,
    num: '02',
    title: 'Measurable Proven Impact',
    desc: 'Transparent tracking and reporting on articles created, editors trained, and cultural heritage digitized with verifiable metrics.',
  },
  {
    icon: Globe2,
    num: '03',
    title: 'UN SDG Alignment',
    desc: 'Direct contribution to UN Sustainable Development Goals: SDG 4 (Quality Education), SDG 5 (Gender Equality), and SDG 10 (Reduced Inequalities).',
  },
  {
    icon: Handshake,
    num: '04',
    title: 'Flexible Collaboration Structures',
    desc: 'Customized partnership frameworks tailored to your goals — from CSR project sponsorships and research grants to institutional MOUs.',
  },
];

const models = [
  {
    id: 'Corporate Sponsorship',
    icon: Building2,
    tag: 'Corporate & CSR',
    title: 'Corporate Sponsorship',
    body: 'Sponsor our events, edit-a-thons, or hub operations. Ideal for tech firms and companies with CSR commitments to education, digital literacy, and equity.',
    highlights: ['Brand visibility across regional summits', ['Dedicated CSR impact reporting'], 'Co-branded hackathons & workshops'],
  },
  {
    id: 'Institutional MOU',
    icon: GraduationCap,
    tag: 'Academic Focus',
    title: 'Institutional MOU',
    body: 'Universities and colleges partner to establish open knowledge clubs, integrate Wikipedia research into curricula, and empower students.',
    highlights: ['Campus Wiki Club establishment', 'Faculty & student training workshops', 'Academic paper & research open access'],
  },
  {
    id: 'NGO / Civil Society',
    icon: Globe2,
    tag: 'Civil Society',
    title: 'NGO & Civil Society',
    body: 'Co-deliver regional open-data campaigns, share educational resources, and join advocacy for digital rights and open access across Africa.',
    highlights: ['Joint grant applications & delivery', 'Shared open educational resources', 'Co-hosted regional symposiums'],
  },
  {
    id: 'Government / Institutional',
    icon: Landmark,
    tag: 'Public Sector (GLAM)',
    title: 'Government & GLAM',
    body: 'Collaborate with galleries, libraries, archives, and government agencies to digitise national heritage and train civil servants in open tools.',
    highlights: ['Cultural heritage digitization', 'Public archive preservation', 'Civil servant open web training'],
  },
];

const steps = [
  { num: '1', title: 'Submit Inquiry', desc: 'Fill out the partnership portal form with your organizational goals.' },
  { num: '2', title: 'Discovery Session', desc: 'Our partnerships team schedules a 30-minute strategic alignment call.' },
  { num: '3', title: 'Customized MOU', desc: 'We co-design a tailored partnership proposal and action roadmap.' },
];

const Partner: React.FC = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    type: 'Corporate Sponsorship',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectType = (typeId: string) => {
    setFormData((prev) => ({ ...prev, type: typeId }));
    const formElement = document.getElementById('partner-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
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
          setFormData({ name: '', email: '', organisation: '', type: 'Corporate Sponsorship', message: '' });
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
        setFormData({ name: '', email: '', organisation: '', type: 'Corporate Sponsorship', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      }, 1200);
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={`${styles.heroBadge} reveal`}>
            <Sparkles size={14} />
            <span>Strategic Collaboration & Open Impact</span>
          </div>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>
            Partner With <span className={styles.heroHighlight}>OFWA</span>
          </h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>
            Together we close the digital & knowledge gap faster. We unite corporations, academic institutions, NGOs, and governments to build Africa’s open knowledge ecosystem.
          </p>

          <div className={`${styles.heroCtas} reveal d3`}>
            <button
              className={styles.btnHeroPrimary}
              onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Start a Partnership</span>
              <ArrowRight size={16} />
            </button>
            <button
              className={styles.btnHeroSecondary}
              onClick={() => document.getElementById('models-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Explore Models</span>
            </button>
          </div>

          {/* HERO STATS STRIP */}
          <div className={`${styles.heroStatsGrid} reveal d4`}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statBox}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER SECTION */}
      <section className={styles.whyPartnerSection}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div>
              <span className="section-tag reveal">Why Collaborate</span>
              <h2 className={`${styles.splitTitle} reveal d1`}>Why Partner With OFWA?</h2>
              <p className={`${styles.splitSub} reveal d1`}>
                Open Foundation West Africa provides a battle-tested infrastructure for community activation, open content creation, and institutional capacity building across West Africa.
              </p>

              <div className={styles.benefitsList}>
                {benefits.map((b, i) => {
                  const IconComp = b.icon;
                  return (
                    <div key={i} className={`${styles.benefitCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                      <div className={styles.benefitIconWrap}>
                        <IconComp size={20} className={styles.benefitIcon} />
                      </div>
                      <div>
                        <div className={styles.benefitHead}>
                          <strong className={styles.benefitTitle}>{b.title}</strong>
                          <span className={styles.benefitNum}>{b.num}</span>
                        </div>
                        <p className={styles.benefitDesc}>{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${styles.splitImgCol} reveal d2`}>
              <div className={styles.splitImgWrap}>
                <img src="/assets/images/image 1.jpg" alt="OFWA Partners & Collaborators" />
                <div className={styles.imgBadge}>
                  <div className={styles.imgBadgeIcon}>
                    <Users size={18} />
                  </div>
                  <div>
                    <strong>Empowering West Africa</strong>
                    <span>Building digital equality through open knowledge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP MODELS SECTION */}
      <section id="models-section" className={styles.modelsSection}>
        <div className="container">
          <div className={styles.modelsHead}>
            <span className="section-tag reveal">Partnership Frameworks</span>
            <h2 className={`${styles.modelsTitle} reveal d1`}>How We Can Work Together</h2>
            <p className={`${styles.modelsSub} reveal d2`}>
              We offer tailored collaboration structures to match your organizational goals, CSR metrics, and institutional focus.
            </p>
          </div>

          <div className={styles.modelsGrid}>
            {models.map((m, i) => {
              const IconComp = m.icon;
              return (
                <div key={i} className={`${styles.modelCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                  <div className={styles.modelTag}>{m.tag}</div>
                  <div className={styles.modelIconHeader}>
                    <div className={styles.modelIconWrap}>
                      <IconComp size={24} />
                    </div>
                    <h3 className={styles.modelTitle}>{m.title}</h3>
                  </div>
                  <p className={styles.modelBody}>{m.body}</p>

                  <div className={styles.highlightsList}>
                    {m.highlights.map((h, idx) => (
                      <div key={idx} className={styles.highlightItem}>
                        <CheckCircle2 size={14} className={styles.checkIcon} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={styles.modelSelectBtn}
                    onClick={() => handleSelectType(m.id)}
                  >
                    <span>Select Model</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / TRUSTED NETWORK STRIP */}
      <section className={styles.trustedSection}>
        <div className="container">
          <span className="section-tag reveal">Our Global Network</span>
          <h2 className={`${styles.trustedTitle} reveal d1`}>Trusted By Leading Organisations</h2>
          <p className={`${styles.trustedSub} reveal d2`}>
            We collaborate with global educational foundations, universities, media organizations, and technology leaders.
          </p>

          <div className={`${styles.partnersStripWrap} reveal d3`}>
            <div className={styles.partnersStrip}>
              <img src="/assets/images/partners-strip.png" alt="OFWA partner organisations" />
            </div>
          </div>

          {/* PARTNER QUOTE CARD */}
          <div className={`${styles.quoteCard} reveal d4`}>
            <div className={styles.quoteIcon}>“</div>
            <p className={styles.quoteText}>
              Partnering with Open Foundation West Africa has amplified our ability to empower students, digitize local history, and build sustainable academic open access programs across universities in Ghana.
            </p>
            <div className={styles.quoteAuthor}>
              <strong>Academic & Community Lead</strong>
              <span>West African Higher Education Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP PORTAL / INQUIRY FORM */}
      <section id="partner-form" className={styles.formSection}>
        <div className="container">
          <div className={styles.formSectionGrid}>
            {/* LEFT COLUMN: GUIDANCE & TIMELINE */}
            <div className={styles.formGuidanceCol}>
              <span className="section-tag reveal">Get in Touch</span>
              <h2 className={`${styles.formTitle} reveal d1`}>Start a Strategic Conversation</h2>
              <p className={`${styles.formSub} reveal d2`}>
                Whether you have a specific initiative in mind or want to explore collaborative ideas, our partnerships team is ready to assist.
              </p>

              {/* TIMELINE STEPS */}
              <div className={`${styles.stepsWrap} reveal d3`}>
                <h4 className={styles.stepsHead}>What Happens Next?</h4>
                <div className={styles.stepsList}>
                  {steps.map((s, i) => (
                    <div key={i} className={styles.stepItem}>
                      <span className={styles.stepBadge}>{s.num}</span>
                      <div>
                        <strong className={styles.stepTitle}>{s.title}</strong>
                        <p className={styles.stepDesc}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK DIRECT CONTACT CARD */}
              <div className={`${styles.directContactCard} reveal d4`}>
                <div className={styles.directContactHeader}>
                  <Mail size={18} className={styles.directIcon} />
                  <strong>Prefer Direct Email?</strong>
                </div>
                <p>Reach out directly to our partnerships team:</p>
                <a href="mailto:info@ofwafrica.org" className={styles.directEmailLink}>
                  info@ofwafrica.org
                </a>
                <div className={styles.responseTime}>
                  <Clock size={13} />
                  <span>Average response time: &lt; 24-48 hours</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PARTNER FORM */}
            <div className={`${styles.formCardWrap} reveal d2`}>
              <form className={`${styles.partnerForm} contact-form`} onSubmit={handleSubmit}>
                <h3 className={styles.formCardHeader}>Partnership Inquiry</h3>
                <p className={styles.formCardSub}>Fill out the details below and we will get back to you promptly.</p>

                {status === 'success' && (
                  <div className={styles.successBanner}>
                    <CheckCircle2 size={20} />
                    <div>
                      <h3>Partnership Enquiry Submitted!</h3>
                      <p>Thank you for reaching out. A member of our executive partnership team will contact you within 48 hours.</p>
                    </div>
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
                    <label className="form-label" htmlFor="email">Work Email</label>
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
                      placeholder="e.g. Acme Corp / Accra University"
                      value={formData.organisation}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="type">Partnership Model</label>
                    <select
                      className="form-input"
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required
                    >
                      <option value="Corporate Sponsorship">Corporate Sponsorship</option>
                      <option value="Institutional MOU">Institutional MOU</option>
                      <option value="NGO / Civil Society">NGO / Civil Society</option>
                      <option value="Government / Institutional">Government / Institutional</option>
                      <option value="Other">Other Collaboration</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Tell us about your goals</label>
                  <textarea
                    className="form-input form-textarea"
                    id="message"
                    rows={4}
                    placeholder="Describe your organization's mission and how you'd like to collaborate with OFWA..."
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
          </div>
        </div>
      </section>

      {/* DIRECT DONATE / ALTERNATE CTA */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Direct Support</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Looking for Direct Financial Support?</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>
            Not ready for an institutional partnership yet? Individual and corporate donations directly power our training programs and regional community hubs.
          </p>
          <div className={`${styles.ctaBtnsGroup} reveal d3`}>
            <Link className={styles.btnDonateBig} to="/donate">
              <Heart size={16} fill="currentColor" /> Donate Now
            </Link>
            <Link className={styles.btnVolunteerOutline} to="/volunteer">
              <span>Join as Volunteer</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partner;
