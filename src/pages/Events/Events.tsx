import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Events.module.css';

const upcomingEvents = [
  {
    month: 'Aug',
    day: '12',
    year: '2026',
    img: '/assets/images/hub-photo-1.png',
    cat: 'Edit-a-thon',
    title: 'Accra Wikipedia Edit-a-thon',
    meta: '📍 Achimota, Accra · 9:00 AM – 4:00 PM',
    desc: 'Join editors from across Accra for a full-day event creating and improving Wikipedia articles about Ghanaian culture, history, and science.',
    category: 'edit-a-thons',
  },
  {
    month: 'Sep',
    day: '05',
    year: '2026',
    img: '/assets/images/hub-photo-3.png',
    cat: 'Training',
    title: 'KIWIX4Schools Train-the-Trainer',
    meta: '📍 UDS, Tamale · 10:00 AM – 3:00 PM',
    desc: 'A hands-on workshop training educators to deploy offline Wikipedia servers in schools without internet access across the Northern Region.',
    category: 'training',
  },
  {
    month: 'Oct',
    day: '18',
    year: '2026',
    img: '/assets/images/blog-photo-1.png',
    cat: 'Summit',
    title: 'West Africa Open Knowledge Summit',
    meta: '📍 Accra, Ghana · All Day',
    desc: "Our flagship annual event bringing together open knowledge advocates, Wikipedia editors, educators, and policy makers from across West Africa.",
    category: 'summits',
  },
  {
    month: 'Nov',
    day: '22',
    year: '2026',
    img: '/assets/images/hub-photo-2.png',
    cat: 'Community',
    title: 'Women in Open Tech Conference',
    meta: '📍 Kumasi Hub · 9:00 AM – 5:00 PM',
    desc: 'Celebrating women who lead in open-source technology and digital rights — panel discussions, networking, and skill-building workshops.',
    category: 'training',
  },
];

const pastHighlights = [
  {
    year: '2022',
    img: '/assets/images/hub-photo-4.png',
    title: 'Africa Wiki Challenge',
    desc: 'Nationwide campaign that produced over 1,200 new Wikipedia articles on African topics.',
  },
  {
    year: '2023',
    img: '/assets/images/blog-photo-2.png',
    title: 'OFWA × National Film Authority',
    desc: "A landmark partnership digitising Ghana's film heritage into open-access Wikipedia entries.",
  },
  {
    year: '2024',
    img: '/assets/images/hub-photo-1.png',
    title: 'Accra Edit-a-thon Series',
    desc: 'Monthly edit-a-thons trained over 300 new Wikipedia editors in the Greater Accra Region.',
  },
  {
    year: '2024',
    img: '/assets/images/about-hero.png',
    title: 'KIWIX4Schools Launch',
    desc: 'Deployed offline Wikipedia servers in 12 schools across the Northern and Upper East Regions.',
  },
];

const filters = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Edit-a-thons', value: 'edit-a-thons' },
  { label: 'Training', value: 'training' },
  { label: 'Summits', value: 'summits' },
];

const Events: React.FC = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = upcomingEvents.filter((ev) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return true; // all are technically upcoming
    return ev.category === activeFilter;
  });

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>What's On</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>Events &amp; Programs</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>From edit-a-thons to national summits — every OFWA event is a chance to learn, contribute, and connect.</p>
        </div>
      </section>

      {/* FILTERS */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={`${styles.filterList} reveal`}>
            {filters.map((f) => (
              <button
                key={f.value}
                className={`${styles.filterBtn} ${activeFilter === f.value ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className={styles.upcomingSection}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="section-tag reveal">Upcoming</span>
            <h2 className={`${styles.sectionH} reveal d1`}>Don't Miss Out</h2>
          </div>

          {filteredEvents.length > 0 ? (
            <div className={styles.eventsGrid}>
              {filteredEvents.map((ev, i) => (
                <article key={i} className={`${styles.eventCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                  <div className={styles.eventCardDate}>
                    <span className={styles.evMonth}>{ev.month}</span>
                    <span className={styles.evDay}>{ev.day}</span>
                    <span className={styles.evYear}>{ev.year}</span>
                  </div>
                  <div className={styles.eventCardImg}>
                    <img src={ev.img} alt={ev.title} />
                  </div>
                  <div className={styles.eventCardBody}>
                    <span className={styles.eventTag}>{ev.cat}</span>
                    <h3 className={styles.eventTitle}>{ev.title}</h3>
                    <div className={styles.eventMeta}>
                      <MapPin size={14} className={styles.metaIcon} />
                      <span>{ev.meta.replace('📍 ', '')}</span>
                    </div>
                    <p className={styles.eventDesc}>{ev.desc}</p>
                    <Link className={`${styles.registerBtn} btn-orange`} to="/contact">
                      Register Interest <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.noEvents}>
              <p>No upcoming events found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* PAST HIGHLIGHTS */}
      <section className={styles.pastSection}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="section-tag reveal">What We've Done</span>
            <h2 className={`${styles.pastSectionH} reveal d1`}>Past Event <span>Highlights</span></h2>
          </div>

          <div className={styles.pastGrid}>
            {pastHighlights.map((ph, i) => (
              <div key={i} className={`${styles.pastCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.pastCardImg}>
                  <img src={ph.img} alt={ph.title} />
                </div>
                <div className={styles.pastCardBody}>
                  <span className={styles.pastYear}>{ph.year}</span>
                  <h3 className={styles.pastTitle}>{ph.title}</h3>
                  <p className={styles.pastDesc}>{ph.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.viewGalleryWrap} reveal`}>
            <Link className="btn-ghost-light" to="/gallery">See Full Gallery <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Fuel Future Events</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Support OFWA Programs</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Your donation makes these events possible — covering venue costs, training materials, and transport for community members.</p>
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

export default Events;
