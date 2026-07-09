import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Donate.module.css';

const impactCards = [
  { amount: '$10', desc: 'Provides training materials and internet access for one Wikipedia editor for a month.' },
  { amount: '$25', desc: 'Covers transport costs for a community member to attend a hub training day.' },
  { amount: '$50', desc: 'Funds one full edit-a-thon session: venue, materials, and facilitator support.' },
  { amount: '$100', desc: 'Sets up a KIWIX offline server in one school, giving students Wikipedia access without internet.' },
  { amount: '$250', desc: 'Runs a 2-day training workshop for 30 women at a community hub.' },
  { amount: '$500', desc: 'Funds an entire month of operations at one OFWA community hub.' },
  { amount: '$1,000', desc: 'Sponsors a new wiki club launch including equipment, training, and first-year support.' },
  { amount: 'Any', desc: 'Choose your own amount. Every contribution, large or small, makes a real difference.' },
];

const faqs = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'OFWA is a registered non-profit in Ghana. Donation receipts are issued for all gifts. Please consult your local tax authority regarding deductibility in your jurisdiction.',
  },
  {
    q: 'How is my donation used?',
    a: '100% of your donation goes directly to OFWA programs: hub operations, training delivery, equipment, and community events. We publish annual impact reports.',
  },
  {
    q: 'Can I make a recurring donation?',
    a: 'Yes — select "Give Monthly" or "Give Annually" in the donation form above, or contact us at info@ofwafrica.org to set up a standing order.',
  },
  {
    q: 'Can my company make a donation or sponsorship?',
    a: 'Absolutely. Visit our Partner page for corporate sponsorship options, or contact us directly to discuss a bespoke arrangement.',
  },
];

const Donate: React.FC = () => {
  useScrollReveal();

  const [selectedPreset, setSelectedPreset] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('Give Once');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handlePresetSelect = (val: number) => {
    setSelectedPreset(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeId = import.meta.env.VITE_FORMSPREE_DONATE_ID;
    const finalAmount = selectedPreset ? `$${selectedPreset}` : `$${customAmount}`;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: finalAmount,
            frequency,
            ...formData,
          }),
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setCustomAmount('');
          setSelectedPreset(25);
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    } else {
      // Mock API trigger
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCustomAmount('');
        setSelectedPreset(25);
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.donateHero}>
        <div className="container">
          <p className={`${styles.donateHeroKicker} reveal`}>Your Impact Starts Here</p>
          <h1 className={`${styles.donateHeroH} reveal d1`}>Donate to <span>Open Knowledge</span><br />for Africa</h1>
          <p className={`${styles.donateHeroSub} reveal d2`}>Every contribution funds training programs, community hubs, and the campaigns that put African voices on the world's knowledge stage.</p>
        </div>
      </section>

      {/* IMPACT CARDS */}
      <section className={styles.donateImpact}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag reveal">What Your Gift Does</span>
            <h2 className={`${styles.sectionH} reveal d1`}>Every Cedi Counts</h2>
          </div>

          <div className={styles.impactGrid}>
            {impactCards.map((ic, i) => (
              <div key={i} className={`${styles.impactCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <p className={styles.impactCardAmount}>{ic.amount}</p>
                <p className={styles.impactCardDesc}>{ic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION WIDGET */}
      <section className={styles.donateFormSection}>
        <div className="container">
          <div className={`${styles.donateFormCard} reveal`}>
            <h2 className={styles.donateFormTitle}>Make a Donation</h2>
            <p className={styles.donateFormSub}>Secure and transparent — 100% of your donation funds OFWA programs.</p>

            <form onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className={styles.successBanner}>
                  <h3>✓ Thank you for your support!</h3>
                  <p>Your mock donation was successfully processed. In a production environment, this would hook up to standard payment processors like Paystack or Flutterwave.</p>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorBanner}>
                  <p>Something went wrong. Please check your credentials and try again.</p>
                </div>
              )}

              {/* Presets */}
              <div className={styles.donateAmountGrid}>
                {[10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`${styles.donateAmount} ${selectedPreset === preset ? styles.donateAmountActive : ''}`}
                    onClick={() => handlePresetSelect(preset)}
                    disabled={status === 'submitting'}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className={styles.donateCustomWrap}>
                <label className={styles.donateCustomLabel} htmlFor="customAmount">Or enter a custom amount</label>
                <input
                  className={styles.donateCustom}
                  id="customAmount"
                  type="number"
                  min="1"
                  placeholder="$ Enter amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  disabled={status === 'submitting'}
                />
              </div>

              {/* Frequency */}
              <div className={styles.donateFreq}>
                {['Give Once', 'Give Monthly', 'Give Annually'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`${styles.donateFreqBtn} ${frequency === f ? styles.donateFreqBtnActive : ''}`}
                    onClick={() => setFrequency(f)}
                    disabled={status === 'submitting'}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Personal Details */}
              <div className="form-row" style={{ marginBottom: 0 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name" style={{ color: 'rgba(255,255,255,0.5)' }}>Full Name</label>
                  <input
                    className="form-input"
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
                  <input
                    className="form-input"
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: 24, marginTop: 20 }}>
                <label className="form-label" htmlFor="message" style={{ color: 'rgba(255,255,255,0.5)' }}>Leave a message (optional)</label>
                <textarea
                  className="form-input form-textarea"
                  id="message"
                  rows={3}
                  placeholder="Tell us what inspired your gift…"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              <button
                className={styles.donateSubmit}
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    <Heart size={16} fill="currentColor" />
                    <span>Complete Donation</span>
                  </>
                )}
              </button>
              <p className={styles.donateSecure}>🔒 Secure payment · Receipts sent by email</p>
            </form>
          </div>
        </div>
      </section>

      {/* TRUST / WHY GIVE */}
      <section className={styles.trustSection}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag reveal">Donor Stories</span>
            <h2 className={`${styles.sectionH} reveal d1`}>Why People Give</h2>
          </div>
          <div className={styles.trustGrid}>
            <blockquote className={`${styles.testimonialCard} reveal`}>
              <p className={styles.testText}>"I donated because I believe African women deserve to tell their own stories on Wikipedia. OFWA is making that real."</p>
              <footer className={styles.testAuthor}>— Ama, diaspora donor · United Kingdom</footer>
            </blockquote>
            <blockquote className={`${styles.testimonialCard} reveal d1`}>
              <p className={styles.testText}>"As a tech company operating in Ghana, supporting OFWA's digital literacy work is exactly the kind of investment we believe in."</p>
              <footer className={styles.testAuthor}>— Corporate donor · Accra, Ghana</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* DONATION FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag reveal">Questions</span>
            <h2 className={`${styles.sectionH} reveal d1`}>Donation FAQs</h2>
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
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER WAYS TO HELP */}
      <section className={styles.otherHelp}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.otherHelpTag} reveal`}>Other Ways to Help</p>
          <h2 className={`${styles.otherHelpH} reveal d1`}>Can't Donate Right Now?</h2>
          <p className={`${styles.otherHelpSub} reveal d2`}>Volunteer your time, share our work on social media, or partner with us. Every form of support moves us forward.</p>
          <div className={`${styles.helpBtns} reveal d3`}>
            <Link className={`${styles.helpBtn} btn-ghost`} to="/volunteer">Volunteer →</Link>
            <Link className={`${styles.helpBtn} btn-ghost`} to="/partner">Partner With Us →</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
