import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { VideoModal } from '../../components/VideoModal/VideoModal';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Home.module.css';

/* ── Data ────────────────────────────────────────── */
const heroSlides = [
  { src: '/assets/images/hero-banner.png', alt: 'OFWA community at work' },
  { src: '/assets/images/hub-photo-1.png', alt: 'Accra Wiki Hub session' },
  { src: '/assets/images/hub-photo-2.png', alt: 'Kumasi community training' },
  { src: '/assets/images/about-hero.png', alt: 'OFWA team gathering' },
  { src: '/assets/images/hub-photo-3.png', alt: 'Cape Coast Hub' },
];

const marqueeItems = [
  '40,000+ Wikipedia Articles',
  '18 Communities Impacted',
  '24 Campaigns Launched',
  '12 Active Hubs & Clubs',
  '500+ Trained Women',
  'Open Knowledge for All',
];

const galleryThumbs = [
  { img: '/assets/images/hub-photo-1.png', cat: 'Hubs', title: 'Accra Wiki Hub — Community Editing Session', label: 'Accra Hub' },
  { img: '/assets/images/blog-photo-1.png', cat: 'Training', title: 'Digital Skills Workshop for Women', label: 'Skills Training' },
  { img: '/assets/images/hub-photo-2.png', cat: 'Hubs', title: 'Kumasi Hub — Monthly Meetup', label: 'Kumasi Hub' },
  { img: '/assets/images/blog-photo-2.png', cat: 'Campaigns', title: 'Africa Wiki Challenge 2025 Launch', label: 'Campaigns' },
  { img: '/assets/images/hub-photo-3.png', cat: 'Events', title: 'Open Knowledge Summit — Cape Coast', label: 'Cape Coast' },
  { img: '/assets/images/hub-photo-4.png', cat: 'Community', title: 'KIWIX4Schools Initiative — UDS Hub', label: 'UDS Hub' },
];

const videos = [
  { id: 'cXnO3a2_bLU', img: '/assets/images/hub-photo-3.png', title: 'Africa Wiki Challenge 2022', desc: "OFWA presents the 2nd edition of Africa's open knowledge writing contest" },
  { id: 'qmLD3DQB52c', img: '/assets/images/hub-photo-4.png', title: 'KIWIX4Schools Initiative', desc: 'Bringing offline Wikipedia and open educational resources to schools across Ghana' },
  { id: '_P-fbzWqNy8', img: '/assets/images/blog-photo-1.png', title: 'OFWA × National Film Authority', desc: "Creating Wikipedia visibility for Ghana's actors and film industry professionals" },
];

const hubTabs = [
  { name: 'Accra Wiki Hub I', detail: 'Achimota, Greater Accra Region', tag: 'Flagship Hub', icon: '📍', map: 'https://maps.google.com/maps?q=Achimota+Accra+Ghana&output=embed&z=14', regionShort: 'Achimota, Accra' },
  { name: 'Accra Wiki Hub II', detail: 'Abelemkpe, Greater Accra Region', tag: 'Active Hub', icon: '📍', map: 'https://maps.google.com/maps?q=Abelemkpe+Accra+Ghana&output=embed&z=14', regionShort: 'Abelemkpe, Accra' },
  { name: 'Kumasi Wiki Hub', detail: 'Adum, Ashanti Region', tag: 'Training Centre', icon: '📍', map: 'https://maps.google.com/maps?q=Adum+Kumasi+Ghana&output=embed&z=13', regionShort: 'Adum, Kumasi' },
  { name: 'Cape Coast Wiki Hub', detail: 'University of Cape Coast, Central Region', tag: 'University Club', icon: '🎓', map: 'https://maps.google.com/maps?q=University+of+Cape+Coast+Ghana&output=embed&z=14', regionShort: 'UCC, Cape Coast' },
  { name: 'UDS Wiki Hub', detail: 'University for Development Studies, Northern Region', tag: 'University Hub', icon: '🎓', map: 'https://maps.google.com/maps?q=University+for+Development+Studies+Tamale+Ghana&output=embed&z=14', regionShort: 'Tamale, Northern Region' },
  { name: 'WaleWale Wiki Hub', detail: 'WaleWale, North East Region', tag: 'Community Hub', icon: '🌿', map: 'https://maps.google.com/maps?q=Walewale+Ghana&output=embed&z=13', regionShort: 'North East Region' },
  { name: 'Damango Wiki Hub', detail: 'Damango, Savannah Region', tag: 'New Hub', icon: '✨', map: 'https://maps.google.com/maps?q=Damango+Ghana&output=embed&z=13', regionShort: 'Savannah Region' },
];

const events = [
  { img: '/assets/images/hub-photo-4.png', date: 'Oct 21, 2025', title: 'AWMT Grand Hackathon Launch 2025', meta: '📍 Accra Hub · Oct 21 – Nov 23, 2025' },
  { img: '/assets/images/hub-photo-3.png', date: 'Nov 15, 2025', title: 'Africa Wikipedia Challenge 2025', meta: '📍 Kumasi Hub · Nov 15 – Dec 5, 2025' },
  { img: '/assets/images/hub-photo-2.png', date: 'Dec 2, 2025', title: "Open Knowledge Women's Summit", meta: '📍 Cape Coast · Dec 2, 2025' },
  { img: '/assets/images/blog-photo-1.png', date: 'Jan 10, 2026', title: 'AWC Edit-A-Thon — Accra Edition', meta: '📍 Accra Hub · Jan 10, 2026' },
  { img: '/assets/images/hub-photo-1.png', date: 'Jan 20, 2026', title: 'Digital Skills for Women Bootcamp', meta: '📍 UDS Hub, Tamale · Jan 20–25, 2026' },
];

const newsCards = [
  { img: '/assets/images/blog-photo-1.png', cat: 'Edit-a-thon', title: 'AWC Edit-A-Thon: Growing African Voices on Wikipedia', meta: 'June 24, 2025 · 5 min read' },
  { img: '/assets/images/hub-photo-2.png', cat: 'Training', title: 'Digital Skills Training Reaches 500 Women in Kumasi', meta: 'June 18, 2025 · 4 min read' },
  { img: '/assets/images/library-photo.png', cat: 'Announcement', title: 'OFWA Opens New Community Hub in Northern Ghana', meta: 'June 10, 2025 · 3 min read' },
];

const countrySlides = [
  { label: 'Nigeria', img: '/assets/images/nigeria.png', badges: [{ top: '22%', left: '18%' }, { top: '24%', left: '43%' }, { top: '24%', left: '79%' }, { top: '39%', left: '27%' }, { top: '46%', left: '42%' }, { top: '71%', left: '11%' }, { top: '74%', left: '43%' }] },
  { label: 'Ghana', img: '/assets/images/ghana.png', badges: [{ top: '15%', left: '74%' }, { top: '25%', left: '52%' }, { top: '31%', left: '22%' }, { top: '41%', left: '57%' }, { top: '54%', left: '47%' }, { top: '72%', left: '67%' }, { top: '77%', left: '44%' }] },
  { label: 'Togo', img: '/assets/images/togo.png', badges: [{ top: '11%', left: '50%' }, { top: '31%', left: '50%' }, { top: '52%', left: '50%' }, { top: '70%', left: '50%' }, { top: '88%', left: '50%' }] },
];

const missionPhotos = [
  '/assets/images/blog-photo-1.png',
  '/assets/images/hub-photo-1.png',
  '/assets/images/hub-photo-4.png',
  '/assets/images/about-hero.png',
];

/* ── Stat Counter Component ──────────────────────── */
const StatItem: React.FC<{ end: number; suffix?: string; label: string; delay?: string }> = ({ end, suffix = '', label, delay }) => {
  const { formattedCount, elementRef } = useCountUp({ end, suffix });
  return (
    <div className={`${styles.statItem} reveal ${delay || ''}`} ref={elementRef as React.Ref<HTMLDivElement>}>
      <strong className={styles.statNum}>{formattedCount}</strong>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

/* ── Home Page ───────────────────────────────────── */
const Home: React.FC = () => {
  useScrollReveal();

  // Hero carousel
  const [heroIdx, setHeroIdx] = useState(0);
  const heroGoTo = useCallback((n: number) => {
    setHeroIdx((n + heroSlides.length) % heroSlides.length);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => heroGoTo(heroIdx + 1), 5500);
    return () => clearInterval(timer);
  }, [heroIdx, heroGoTo]);

  // Mission photo stack
  const [missionIdx, setMissionIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setMissionIdx(i => (i + 1) % missionPhotos.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Gallery carousel
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galGoTo = useCallback((n: number) => {
    setGalleryIdx((n + galleryThumbs.length) % galleryThumbs.length);
  }, []);

  // Video modal
  const [videoId, setVideoId] = useState<string | null>(null);

  // Country map switcher
  const [countryIdx, setCountryIdx] = useState(0);
  const countryGoTo = useCallback((n: number) => {
    setCountryIdx((n + countrySlides.length) % countrySlides.length);
  }, []);

  // Hub map tabs
  const [hubIdx, setHubIdx] = useState(0);
  const [loadedMaps, setLoadedMaps] = useState<Set<number>>(new Set([0]));
  const selectHub = (i: number) => {
    setHubIdx(i);
    setLoadedMaps(prev => new Set(prev).add(i));
  };

  // Events horizontal scroll ref
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const scrollEvents = (direction: 'left' | 'right') => {
    if (eventsScrollRef.current) {
      const scrollAmount = 320; // 300px card width + 20px gap
      eventsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <VideoModal videoId={videoId} onClose={() => setVideoId(null)} />

      {/* ░░ HERO ░░ */}
      <section className={styles.hero} aria-label="Hero">
        {heroSlides.map((s, i) => (
          <div key={i} className={`${styles.heroSlide} ${i === heroIdx ? styles.heroSlideActive : ''}`}>
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="container">
            <p className={`${styles.heroKicker} reveal`}>Open Knowledge · Women's Empowerment · West Africa</p>
            <h1 className={`${styles.heroTitle} reveal d1`}>
              Building Africa's<br />
              <span>Open Knowledge</span><br />
              Future, Together.
            </h1>
            <p className={`${styles.heroSub} reveal d2`}>Empowering women and communities to contribute to, access, and lead in the global open knowledge movement.</p>
            <div className={`${styles.heroCtas} reveal d3`}>
              <Link className={styles.btnDonateHero} to="/donate">
                <Heart size={16} fill="currentColor" /> Donate Now — Change a Life
              </Link>
              <button className={styles.btnPlayHero} onClick={() => setVideoId('cXnO3a2_bLU')}>
                <span className={styles.playCircle}><Play size={18} fill="currentColor" /></span>
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
        <button className={`${styles.heroArrow} ${styles.heroArrowPrev}`} onClick={() => heroGoTo(heroIdx - 1)} aria-label="Previous slide"><ChevronLeft size={28} /></button>
        <button className={`${styles.heroArrow} ${styles.heroArrowNext}`} onClick={() => heroGoTo(heroIdx + 1)} aria-label="Next slide"><ChevronRight size={28} /></button>
        <div className={styles.heroDots}>
          {heroSlides.map((_, i) => (
            <button key={i} className={`${styles.heroDot} ${i === heroIdx ? styles.heroDotActive : ''}`} onClick={() => setHeroIdx(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ░░ MARQUEE ░░ */}
      <div className={styles.marqueeBand} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item} <span className={styles.marqueeSep}>✦</span></span>
          ))}
        </div>
      </div>

      {/* ░░ STATS ░░ */}
      <section className={styles.statsBand}>
        <div className="container">
          <div className={styles.statsGrid}>
            <StatItem end={40} suffix="K+" label="Wikipedia Articles Created" />
            <StatItem end={18} label="Communities Impacted" delay="d1" />
            <StatItem end={24} label="Campaigns Launched" delay="d2" />
            <StatItem end={12} label="Active Clubs & Hubs" delay="d3" />
          </div>
        </div>
      </section>

      {/* ░░ MISSION ░░ */}
      <section className={styles.missionSection}>
        <div className={styles.missionInner}>
          <div className={styles.photoStackWrap}>
            <div className={styles.photoStack} onClick={() => setMissionIdx(i => (i + 1) % missionPhotos.length)}>
              {missionPhotos.map((src, i) => (
                <div key={i} className={`${styles.stackPhoto} ${i === missionIdx ? styles.stackPhotoActive : ''}`}>
                  <img src={src} alt={`OFWA photo ${i + 1}`} />
                </div>
              ))}
              <div className={styles.stackCounter}>
                {missionPhotos.map((_, i) => (
                  <span key={i} className={`${styles.stackDot} ${i === missionIdx ? styles.stackDotActive : ''}`} />
                ))}
              </div>
              <span className={styles.stackHint}>Click to explore →</span>
            </div>
          </div>
          <div className={styles.missionContent}>
            <span className="section-tag reveal">Who We Are</span>
            <h2 className="section-h reveal d1">Driving Open Knowledge Across West Africa</h2>
            <p className="section-body reveal d2">Open Foundation West Africa (OFWA) is a nonprofit that creates spaces where women participate, contribute, and lead in open knowledge ecosystems — from Wikipedia editing to open education and digital skills training.</p>
            <p className="section-body reveal d3" style={{ marginBottom: 32 }}>Our hubs across Ghana serve as living laboratories for open knowledge, where communities come together to put African stories on the global stage.</p>
            <Link className="btn-orange reveal d4" to="/about">Our Full Story <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ░░ GALLERY CAROUSEL ░░ */}
      <section className={styles.galleryCarouselSection}>
        <div className="container">
          <div className={styles.galleryCarouselHead}>
            <h2 className={`${styles.galleryCarouselH} reveal`}>Our Work in <em>Pictures</em></h2>
            <Link className={`${styles.linkOrange} reveal d1`} to="/gallery">View Full Gallery <ArrowRight size={14} /></Link>
          </div>
          <div className={`${styles.galleryCarousel} reveal`}>
            <div className={styles.galleryFeatured}>
              <img src={galleryThumbs[galleryIdx].img} alt={galleryThumbs[galleryIdx].title} className={styles.galleryFeaturedImg} />
              <div className={styles.galleryFeaturedOverlay} />
              <button className={`${styles.galleryArrow} ${styles.galleryArrowPrev}`} onClick={() => galGoTo(galleryIdx - 1)} aria-label="Previous photo">
                <ChevronLeft size={22} />
              </button>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowNext}`} onClick={() => galGoTo(galleryIdx + 1)} aria-label="Next photo">
                <ChevronRight size={22} />
              </button>
              <div className={styles.galleryFeaturedInfo}>
                <span className={styles.galleryFeaturedCat}>{galleryThumbs[galleryIdx].cat}</span>
                <p className={styles.galleryFeaturedTitle}>{galleryThumbs[galleryIdx].title}</p>
              </div>
              <span className={styles.galleryFeaturedCount}>{galleryIdx + 1} / {galleryThumbs.length}</span>
            </div>
            <div className={styles.galleryThumbs}>
              {galleryThumbs.map((t, i) => (
                <div key={i} className={`${styles.galleryThumb} ${i === galleryIdx ? styles.galleryThumbActive : ''}`} onClick={() => setGalleryIdx(i)}>
                  <img src={t.img} alt={t.label} />
                  <div className={styles.galleryThumbOverlay} />
                  <span className={styles.galleryThumbLabel}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ░░ VIDEOS ░░ */}
      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.videoSectionHead}>
            <p className="section-tag reveal">Projects in Action</p>
            <h2 className="section-h reveal d1">Watch Our Impact</h2>
            <p className={`${styles.videoSectionSub} reveal d2`}>Real stories, real communities, real change — straight from OFWA's YouTube channel.</p>
          </div>
          <div className={`${styles.videoGrid} reveal`}>
            {videos.map((v) => (
              <div key={v.id} className={styles.videoCard} onClick={() => setVideoId(v.id)} role="button" tabIndex={0} aria-label={`Play: ${v.title}`} onKeyDown={e => e.key === 'Enter' && setVideoId(v.id)}>
                <img src={v.img} alt={v.title} />
                <div className={styles.videoCardOverlay}>
                  <div className={styles.videoPlayBtn}><Play size={22} fill="currentColor" /></div>
                  <p className={styles.videoCardTitle}>{v.title}</p>
                  <p className={styles.videoCardMeta}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.viewMoreWrap}>
            <a className="btn-ghost-light reveal" href="https://www.youtube.com/@ofwafrica/videos" target="_blank" rel="noopener noreferrer">Watch All Videos on YouTube <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* ░░ DONATE CTA ░░ */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Make a Difference Today</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Your Donation Funds<br />Free Knowledge for All</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Every contribution — no matter the size — helps us train more women, open more hubs, and put African stories on Wikipedia for the world to read.</p>
          <div className="reveal d3"><Link className={styles.btnDonateBig} to="/donate"><Heart size={16} fill="currentColor" /> Donate Now</Link></div>
        </div>
      </section>

      {/* ░░ COUNTRY MAP SWITCHER ░░ */}
      <section className={styles.cmsSection}>
        <div className="container">
          <h2 className={`${styles.cmsTitle} reveal`}>Hubs and Clubs around you</h2>
          <p className={`${styles.cmsSub} reveal d1`}>We are growing across West Africa</p>
        </div>
        <div className={styles.cmsStage}>
          <button className={`${styles.cmsBtn} ${styles.cmsBtnPrev}`} onClick={() => countryGoTo(countryIdx - 1)} aria-label="Previous country"><ChevronLeft size={24} /></button>
          <div className={styles.cmsSlides}>
            {countrySlides.map((s, i) => (
              <div key={i} className={`${styles.cmsSlide} ${i === countryIdx ? styles.cmsSlideActive : ''}`}>
                <div className={styles.cmsMapBox}>
                  <img src={s.img} alt={s.label} className={styles.cmsMapImg} />
                  {s.badges.map((b, j) => (
                    <span key={j} className={styles.cmsBadge} style={{ top: b.top, left: b.left }}>5</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className={`${styles.cmsBtn} ${styles.cmsBtnNext}`} onClick={() => countryGoTo(countryIdx + 1)} aria-label="Next country"><ChevronRight size={24} /></button>
        </div>
        <div className={styles.cmsFooter}>
          <p className={styles.cmsCountryLabel}>{countrySlides[countryIdx].label}</p>
          <div className={styles.cmsDots}>
            {countrySlides.map((s, i) => (
              <button key={i} className={`${styles.cmsDot} ${i === countryIdx ? styles.cmsDotActive : ''}`} onClick={() => setCountryIdx(i)} aria-label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ░░ HUB MAP ░░ */}
      <section className={styles.hubMapSection}>
        <div className="container">
          <div className={styles.hubMapHead}>
            <p className="section-tag reveal">Our Network</p>
            <h2 className="section-h reveal d1">Hubs & Clubs <span>Across Ghana</span></h2>
          </div>
          <div className={`${styles.hubMapLayout} reveal d2`}>
            <div className={styles.hubTabs}>
              {hubTabs.map((tab, i) => (
                <button key={i} className={`${styles.hubTab} ${i === hubIdx ? styles.hubTabActive : ''}`} onClick={() => selectHub(i)}>
                  <span className={styles.hubTabIcon}>{tab.icon}</span>
                  <div>
                    <p className={styles.hubTabName}>{tab.name.replace('Wiki Hub', 'Hub').replace('Wiki ', '')}</p>
                    <p className={styles.hubTabRegion}>{tab.regionShort}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className={styles.hubMapStage}>
              {hubTabs.map((tab, i) => (
                <div key={i} className={`${styles.hubMapFrame} ${i === hubIdx ? styles.hubMapFrameActive : ''}`}>
                  {(loadedMaps.has(i)) && <iframe src={tab.map} title={tab.name} loading="lazy" />}
                </div>
              ))}
              <div className={styles.hubInfoBar}>
                <p className={styles.hubInfoName}>{hubTabs[hubIdx].name}</p>
                <p className={styles.hubInfoDetail}>{hubTabs[hubIdx].detail}</p>
                <span className={styles.hubInfoTag}>📍 {hubTabs[hubIdx].tag}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ EVENTS ░░ */}
      <section className={styles.eventsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="section-tag reveal">What's Coming</p>
              <h2 className="section-h reveal d1" style={{ color: 'var(--white)' }}>Upcoming Events</h2>
            </div>
            <Link className="btn-ghost reveal d2" to="/events">All Events <ArrowRight size={14} /></Link>
          </div>
          <div className={styles.eventsContainer}>
            <button className={`${styles.eventsArrow} ${styles.eventsArrowLeft}`} onClick={() => scrollEvents('left')} aria-label="Scroll left"><ChevronLeft size={24} /></button>
            <div ref={eventsScrollRef} className={styles.eventsScrollWrap}>
              <div className={`${styles.eventsRow} reveal`}>
                {events.map((ev, i) => (
                  <div key={i} className={styles.eventCardH}>
                    <div className={styles.eventCardHImg}>
                      <img src={ev.img} alt={ev.title} />
                      <span className={styles.eventDatePill}>{ev.date}</span>
                    </div>
                    <div className={styles.eventCardHBody}>
                      <h3 className={styles.eventCardHTitle}>{ev.title}</h3>
                      <p className={styles.eventCardHMeta}>{ev.meta}</p>
                    </div>
                    <Link className={styles.eventCardHCta} to="/events">Register Now</Link>
                  </div>
                ))}
              </div>
            </div>
            <button className={`${styles.eventsArrow} ${styles.eventsArrowRight}`} onClick={() => scrollEvents('right')} aria-label="Scroll right"><ChevronRight size={24} /></button>
          </div>
        </div>
      </section>

      {/* ░░ NEWS ░░ */}
      <section className={styles.newsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="section-tag reveal">Latest Stories</p>
              <h2 className="section-h reveal d1">News & Highlights</h2>
            </div>
            <Link className="btn-ghost reveal d2" to="/blog">All Stories <ArrowRight size={14} /></Link>
          </div>
          <div className={styles.newsGrid}>
            {newsCards.map((nc, i) => (
              <article key={i} className={`${styles.newsCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                <div className={styles.newsCardImg}>
                  <img src={nc.img} alt={nc.title} />
                  <div className={styles.newsCardOverlay} />
                </div>
                <div className={styles.newsCardBody}>
                  <span className={styles.newsCardCat}>{nc.cat}</span>
                  <h3 className={styles.newsCardTitle}>{nc.title}</h3>
                  <p className={styles.newsCardMeta}>{nc.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ TESTIMONIAL ░░ */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={styles.testimonialInner}>
            <span className={`${styles.testimonialMark} reveal`}>"</span>
            <p className={`${styles.testimonialText} reveal d1`}>Open Foundation West Africa is at the center of the world here in Washington — getting all knowledge across the world open and free to everyone.</p>
            <p className={`${styles.testimonialAuthor} reveal d2`}>Carlson Middleton</p>
            <p className={`${styles.testimonialPlace} reveal d2`}>Washington, DC</p>
          </div>
        </div>
      </section>

      {/* ░░ PARTNERS ░░ */}
      <section className={styles.partnersStrip}>
        <div className="container">
          <p className={styles.partnersLabel}>Trusted Partners & Supporters</p>
          <img className={styles.partnersImg} src="/assets/images/partners-new.png" alt="Our partner organisations" />
        </div>
      </section>
    </>
  );
};

export default Home;
