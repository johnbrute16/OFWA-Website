import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, ChevronLeft, ChevronRight, ArrowRight, MapPin } from 'lucide-react';
import { VideoModal } from '../../components/VideoModal/VideoModal';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Home.module.css';

/* ── Ghana Regions & Hubs Data ───────────────────── */
interface HubItem {
  name: string;
  type: string;
  location: string;
  detail: string;
}

interface GhanaRegion {
  id: string;
  name: string;
  shortName: string;
  capital: string;
  color: string;
  xPercent: number;
  yPercent: number;
  hubs: HubItem[];
}

const ghanaRegionsData: GhanaRegion[] = [
  {
    id: 'greater-accra',
    name: 'Greater Accra Region',
    shortName: 'GREATER ACCRA',
    capital: 'ACCRA',
    color: '#d60000',
    xPercent: 74,
    yPercent: 70,
    hubs: [
      { name: 'Accra Wiki Hub', type: 'Hub', location: 'Achimota & Abelemkpe, Accra', detail: 'Flagship Community Hub' },
      { name: 'UG Wiki Club', type: 'Club', location: 'University of Ghana, Legon', detail: 'University Club' },
      { name: 'GH Media Wiki Club', type: 'Club', location: 'GH Media School, Achimota', detail: 'Media & Communications Club' },
      { name: 'New Health Wiki Club', type: 'Club', location: 'Accra', detail: 'Health & Open Knowledge Initiative' },
    ],
  },
  {
    id: 'ashanti',
    name: 'Ashanti Region',
    shortName: 'ASHANTI',
    capital: 'KUMASI',
    color: '#f8c82a',
    xPercent: 38,
    yPercent: 58,
    hubs: [
      { name: 'Kumasi Wiki Hub', type: 'Hub', location: 'Adum, Kumasi', detail: 'Regional Training Centre' },
      { name: 'Wikitech Student Developers Club', type: 'Club', location: 'Kumasi', detail: 'Student Developer Community' },
    ],
  },
  {
    id: 'northern',
    name: 'Northern Region',
    shortName: 'NORTHERN',
    capital: 'TAMALE',
    color: '#96e072',
    xPercent: 63,
    yPercent: 24,
    hubs: [
      { name: 'Tamale Wiki Hub', type: 'Hub', location: 'Tamale', detail: 'Community & Regional Hub' },
      { name: 'UDS Wiki Tech', type: 'Club', location: 'University for Development Studies, Tamale', detail: 'University Tech Club' },
    ],
  },
  {
    id: 'upper-west',
    name: 'Upper West Region',
    shortName: 'UPPER WEST',
    capital: 'WA',
    color: '#d99b38',
    xPercent: 26,
    yPercent: 14,
    hubs: [
      { name: 'SDD UBIDS Wiki Club', type: 'Club', location: 'SD Dombo University, Wa', detail: 'University Club' },
      { name: 'Dr. Hilla Limann Wiki Club', type: 'Club', location: 'Dr. Hilla Limann Technical University, Wa', detail: 'Technical University Club' },
    ],
  },
  {
    id: 'north-east',
    name: 'North East Region',
    shortName: 'NORTH EAST',
    capital: 'NALERIGU',
    color: '#323e7e',
    xPercent: 63,
    yPercent: 14,
    hubs: [
      { name: 'Walewale Wiki Hub', type: 'Hub', location: 'Walewale', detail: 'Community Hub' },
    ],
  },
  {
    id: 'volta',
    name: 'Volta Region',
    shortName: 'VOLTA',
    capital: 'HO',
    color: '#73ccf4',
    xPercent: 82,
    yPercent: 60,
    hubs: [
      { name: 'Ho Wiki Hub', type: 'Hub', location: 'Ho', detail: 'Regional Community Hub' },
    ],
  },
  {
    id: 'central',
    name: 'Central Region',
    shortName: 'CENTRAL',
    capital: 'CAPE COAST',
    color: '#d80098',
    xPercent: 47,
    yPercent: 74,
    hubs: [
      { name: 'Central Wikitech Club', type: 'Club', location: 'Cape Coast / Central Region', detail: 'Regional Wikitech Club' },
    ],
  },
  {
    id: 'western-north',
    name: 'Western North Region',
    shortName: 'WESTERN NORTH',
    capital: 'SEFWI WIAWSO',
    color: '#784936',
    xPercent: 13,
    yPercent: 67,
    hubs: [
      { name: 'Enchi Wiki Club', type: 'Club', location: 'Enchi', detail: 'College Wiki Club' },
    ],
  },
  {
    id: 'upper-east',
    name: 'Upper East Region',
    shortName: 'UPPER EAST',
    capital: 'BOLGATANGA',
    color: '#e62655',
    xPercent: 56,
    yPercent: 8,
    hubs: [],
  },
  {
    id: 'savannah',
    name: 'Savannah Region',
    shortName: 'SAVANNAH REGION',
    capital: 'DAMANGO',
    color: '#2b7a18',
    xPercent: 34,
    yPercent: 26,
    hubs: [],
  },
  {
    id: 'bono-east',
    name: 'Bono East Region',
    shortName: 'BONO EAST',
    capital: 'TECHIMAN',
    color: '#e05316',
    xPercent: 48,
    yPercent: 44,
    hubs: [],
  },
  {
    id: 'bono',
    name: 'Bono Region',
    shortName: 'BONO',
    capital: 'SUNYANI',
    color: '#f87979',
    xPercent: 20,
    yPercent: 44,
    hubs: [],
  },
  {
    id: 'oti',
    name: 'Oti Region',
    shortName: 'OTI',
    capital: 'DAMBAI',
    color: '#6b3ba7',
    xPercent: 78,
    yPercent: 44,
    hubs: [],
  },
  {
    id: 'ahafo',
    name: 'Ahafo Region',
    shortName: 'AHAFO',
    capital: 'GOASO',
    color: '#4ebc45',
    xPercent: 15,
    yPercent: 55,
    hubs: [],
  },
  {
    id: 'eastern',
    name: 'Eastern Region',
    shortName: 'EASTERN',
    capital: 'KOFORIDUA',
    color: '#f28527',
    xPercent: 63,
    yPercent: 62,
    hubs: [],
  },
  {
    id: 'western',
    name: 'Western Region',
    shortName: 'WESTERN',
    capital: 'SEKONDI TAKORADI',
    color: '#00a4e4',
    xPercent: 25,
    yPercent: 78,
    hubs: [],
  },
];

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

  // Active region for Ghana map
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('greater-accra');

  const activeRegionId = hoveredRegionId || selectedRegionId;
  const activeRegion = ghanaRegionsData.find(r => r.id === activeRegionId) || ghanaRegionsData[0];
  const totalGhanaHubs = ghanaRegionsData.reduce((acc, r) => acc + r.hubs.length, 0);


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

      {/* ░░ GHANA HUBS & CLUBS MAP ░░ */}
      <section className={styles.cmsSection}>
        <div className="container">
          <div className={styles.cmsHeader}>
            <span className="section-tag reveal">Hubs & Clubs Network</span>
            <h2 className={`${styles.cmsTitle} reveal d1`}>Hubs & Clubs Around You</h2>
            <p className={`${styles.cmsSub} reveal d2`}>
              Explore our {totalGhanaHubs} active hubs and student clubs distributed across Ghana's regions. Hover over any region on the map below to view local communities and active hubs.
            </p>
          </div>

          <div className={`${styles.cmsCenterLayout} reveal d3`}>
            {/* Centered Map Card */}
            <div className={styles.mapCardOuter}>
              <div className={styles.mapCardHeader}>
                <span className={styles.mapSubtitle}>Ghana Regional Network Map</span>
                <span className={styles.activeRegionTitle}>{activeRegion.name}</span>
              </div>

              <div className={styles.mapImageContainer}>
                <img
                  src="/assets/images/Ghana_Regional_Map.jpg"
                  alt="Ghana Regional Map"
                  className={styles.ghanaMapImage}
                />

                {/* Hotspot Overlay Layer */}
                <div
                  className={styles.mapOverlayLayer}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  {ghanaRegionsData.map((reg) => {
                    const isHovered = reg.id === hoveredRegionId;
                    const isActive = reg.id === activeRegionId;
                    const hasHubs = reg.hubs.length > 0;
                    return (
                      <div
                        key={reg.id}
                        className={`${styles.regionHotspot} ${isActive ? styles.hotspotActive : ''} ${isHovered ? styles.hotspotHovered : ''} ${hasHubs ? styles.hotspotHasHubs : ''}`}
                        style={{ left: `${reg.xPercent}%`, top: `${reg.yPercent}%` }}
                        onMouseEnter={() => {
                          setHoveredRegionId(reg.id);
                          setSelectedRegionId(reg.id);
                        }}
                        onMouseLeave={() => setHoveredRegionId(null)}
                        onClick={() => setSelectedRegionId(reg.id)}
                      >
                        <div className={styles.hotspotPin}>
                          {hasHubs && <span className={styles.hotspotPulse} />}
                          <span className={styles.hotspotBadge}>
                            {hasHubs ? reg.hubs.length : ''}
                          </span>
                        </div>
                        <span className={styles.hotspotNameTag}>{reg.shortName}</span>

                        {/* Hover Popup Card - Only visible when actively hovered */}
                        {isHovered && (
                          <div className={styles.regionHoverPopup}>
                            <div className={styles.popupTop}>
                              <div>
                                <span className={styles.popupRegionTag}>{reg.shortName}</span>
                                <h4 className={styles.popupRegionName}>{reg.name}</h4>
                                <span className={styles.popupCapital}>Capital: {reg.capital}</span>
                              </div>
                              <span className={styles.popupCountBadge}>
                                {reg.hubs.length} {reg.hubs.length === 1 ? 'Community' : 'Communities'}
                              </span>
                            </div>

                            {reg.hubs.length > 0 ? (
                              <div className={styles.popupHubsList}>
                                {reg.hubs.map((hub, idx) => (
                                  <div key={idx} className={styles.popupHubItem}>
                                    <div className={styles.popupHubIcon}><MapPin size={16} /></div>
                                    <div className={styles.popupHubInfo}>
                                      <div className={styles.popupHubTitleRow}>
                                        <span className={styles.popupHubName}>{hub.name}</span>
                                        <span className={`${styles.hubTypePill} ${hub.type === 'Hub' ? styles.pillHub : styles.pillClub}`}>
                                          {hub.type}
                                        </span>
                                      </div>
                                      <p className={styles.popupHubLoc}>{hub.location}</p>
                                      <p className={styles.popupHubDetail}>{hub.detail}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className={styles.popupEmptyState}>
                                <p>No active hubs listed here yet. We are expanding into {reg.shortName}!</p>
                                <Link to="/contact" className={styles.popupStartBtn}>
                                  Start a Hub in {reg.shortName} <ArrowRight size={12} />
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Footer Legend */}
              <div className={styles.mapLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotActive} /> Regions with Active Hubs & Clubs
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotInactive} /> Expanding Regions
                </div>
              </div>
            </div>

            {/* Active Region Detailed Card Below Map */}
            {/* <div className={styles.cmsDetailsCard}>
              <div className={styles.cmsDetailsHeader}>
                <div>
                  <span className={styles.regionBadge}>{activeRegion.shortName}</span>
                  <h3 className={styles.regionTitle}>{activeRegion.name}</h3>
                  <p className={styles.regionCapitalSub}>Capital: {activeRegion.capital}</p>
                </div>
                <span className={styles.hubCountTag}>
                  {activeRegion.hubs.length} {activeRegion.hubs.length === 1 ? 'Community' : 'Communities'}
                </span>
              </div>

              {activeRegion.hubs.length > 0 ? (
                <div className={styles.hubsGrid}>
                  {activeRegion.hubs.map((hub, idx) => (
                    <div key={idx} className={styles.hubCardItem}>
                      <div className={styles.hubCardIcon}>
                        <MapPin size={18} />
                      </div>
                      <div className={styles.hubCardContent}>
                        <div className={styles.hubCardTop}>
                          <h4 className={styles.hubCardName}>{hub.name}</h4>
                          <span className={`${styles.hubTypePill} ${hub.type === 'Hub' ? styles.pillHub : styles.pillClub}`}>
                            {hub.type}
                          </span>
                        </div>
                        <p className={styles.hubCardLoc}>{hub.location}</p>
                        <p className={styles.hubCardDetail}>{hub.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyRegionState}>
                  <div className={styles.emptyIcon}>📍</div>
                  <h4>No active hubs listed in {activeRegion.name} yet</h4>
                  <p>We are actively expanding into {activeRegion.shortName}. Interested in starting or hosting a Wiki Club in this region?</p>
                  <Link to="/contact" className={styles.btnStartHub}>Start a Hub in {activeRegion.shortName} <ArrowRight size={14} /></Link>
                </div>
              )}
            </div> */}
          </div>

          {/* Quick Region Selector Pills */}
          {/* <div className={`${styles.regionPillsBar} reveal d4`}>
            <span className={styles.pillsLabel}>Select Region:</span>
            <div className={styles.pillsScroll}>
              {ghanaRegionsData.map((reg) => (
                <button
                  key={reg.id}
                  className={`${styles.regionPill} ${reg.id === activeRegionId ? styles.regionPillActive : ''} ${reg.hubs.length > 0 ? styles.regionPillHasHubs : ''}`}
                  onClick={() => setSelectedRegionId(reg.id)}
                  onMouseEnter={() => {
                    setHoveredRegionId(reg.id);
                    setSelectedRegionId(reg.id);
                  }}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  {reg.shortName}
                  {reg.hubs.length > 0 && <span className={styles.pillCount}>{reg.hubs.length}</span>}
                </button>
              ))}
            </div>
          </div> */}
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
