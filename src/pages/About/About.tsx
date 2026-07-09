import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

const values = [
  { icon: '🤝', title: 'Collaboration', body: 'We believe in the power of working together — with communities, institutions, and global partners.' },
  { icon: '⚖️', title: 'Equity & Inclusion', body: 'We center the voices and needs of women, youth, and underserved communities in everything we do.' },
  { icon: '💡', title: 'Innovation', body: 'We embrace creative approaches to solving the challenges of knowledge access and digital equity.' },
  { icon: '🔍', title: 'Transparency', body: 'We operate with integrity, openness, and accountability to our communities and supporters.' },
];

const goals = [
  'Train 100,000 women in open knowledge and digital skills across West Africa by 2030.',
  'Establish community hubs in all 16 regions of Ghana as open knowledge centres.',
  'Create 100,000 Wikipedia articles about African people, places, and culture.',
  'Advocate for open licensing and free access to educational resources across Africa.',
];

const boardMembers = [
  { name: 'Dickson Kojo Anane', role: 'Programs Officer' },
  { name: 'Abena Mensah', role: 'Executive Director' },
  { name: 'Kwame Asante', role: 'Finance Officer' },
];

const staffMembers = [
  { name: 'Ama Owusu', role: 'Community Manager' },
  { name: 'Kojo Frimpong', role: 'Communications Lead' },
  { name: 'Efua Darko', role: 'Training Coordinator' },
];

const About: React.FC = () => {
  useScrollReveal();

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Our Story</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>About Open Foundation<br />West Africa</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>A nonprofit building open knowledge ecosystems across Africa, one community at a time.</p>
        </div>
      </section>

      {/* MISSION SPLIT */}
      <section className={styles.aboutSplit}>
        <div className={styles.aboutSplitImg}>
          <img src="/assets/images/about-hero.png" alt="OFWA community work" />
        </div>
        <div className={styles.aboutSplitContent}>
          <span className="section-tag reveal">Our Mission</span>
          <h2 className={`${styles.sectionHDark} reveal d1`}>Contribution to the Open Movement</h2>
          <p className={`${styles.bodyText} reveal d2`}>Open Foundation West Africa (OFWA) is dedicated to growing women's participation in open knowledge through training, community hubs, and advocacy across Africa. We believe that when women lead in creating and curating knowledge, entire communities thrive.</p>
          <p className={`${styles.bodyText} reveal d3`}>Since our founding, we've trained thousands of women in Wikipedia editing, digital skills, and open-source tools — building Africa's representation in the global knowledge commons.</p>
          <Link className="btn-orange reveal d4" to="/contact">Get Involved <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* GOALS SPLIT (reversed) */}
      <section className={`${styles.aboutSplit} ${styles.aboutSplitReversed}`}>
        <div className={styles.aboutSplitImg}>
          <img src="/assets/images/hub-photo-1.png" alt="OFWA in action" />
        </div>
        <div className={`${styles.aboutSplitContent} ${styles.aboutSplitContentLight}`}>
          <span className="section-tag reveal">Our Goals</span>
          <h2 className={`${styles.sectionHDark} reveal d1`}>What We're Working Towards</h2>
          <div className={`${styles.goalsList} reveal d2`}>
            {goals.map((goal, i) => (
              <div key={i} className={styles.goalItem}>
                <span className={styles.goalNumber}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.goalText}>{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesSectionHead}>
            <span className="section-tag reveal">What Guides Us</span>
            <h2 className={`${styles.sectionHDark} reveal d1`}>Our Core Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={`${styles.valueCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.valueCardIcon}>{v.icon}</div>
                <h3 className={styles.valueCardTitle}>{v.title}</h3>
                <p className={styles.valueCardBody}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.teamSectionHead}>
            <span className="section-tag reveal">Leadership</span>
            <h2 className={`${styles.sectionHDark} reveal d1`}>Board Members</h2>
          </div>
          <div className={styles.teamGrid}>
            {boardMembers.map((m, i) => (
              <div key={i} className={`${styles.teamCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.teamCardImg}>
                  <img src="/assets/images/team-member.png" alt={m.name} />
                </div>
                <div className={styles.teamCardBody}>
                  <p className={styles.teamCardName}>{m.name}</p>
                  <p className={styles.teamCardRole}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAFF */}
      <section className={`${styles.teamSection} ${styles.teamSectionAlt}`}>
        <div className="container">
          <div className={styles.teamSectionHead}>
            <span className="section-tag reveal">The Team</span>
            <h2 className={`${styles.sectionHDark} reveal d1`}>Staff Members</h2>
          </div>
          <div className={styles.teamGrid}>
            {staffMembers.map((m, i) => (
              <div key={i} className={`${styles.teamCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.teamCardImg}>
                  <img src="/assets/images/team-member.png" alt={m.name} />
                </div>
                <div className={styles.teamCardBody}>
                  <p className={styles.teamCardName}>{m.name}</p>
                  <p className={styles.teamCardRole}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
