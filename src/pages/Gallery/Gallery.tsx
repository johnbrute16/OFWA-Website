import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ZoomIn, Heart } from 'lucide-react';
import { Lightbox } from '../../components/Lightbox/Lightbox';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Gallery.module.css';

const galleryCards = [
  {
    full: '/assets/images/hub-photo-1.png',
    alt: 'Accra Wiki Hub session',
    cat: 'Hubs',
    categories: ['hubs', 'community'],
  },
  {
    full: '/assets/images/blog-photo-1.png',
    alt: 'Digital skills training',
    cat: 'Training',
    categories: ['training'],
  },
  {
    full: '/assets/images/hub-photo-2.png',
    alt: 'Kumasi Hub community',
    cat: 'Hubs',
    categories: ['hubs', 'community'],
  },
  {
    full: '/assets/images/about-hero.png',
    alt: 'OFWA team gathering',
    cat: 'Events',
    categories: ['events', 'community'],
  },
  {
    full: '/assets/images/hub-photo-3.png',
    alt: 'Cape Coast Hub',
    cat: 'Hubs',
    categories: ['hubs'],
  },
  {
    full: '/assets/images/blog-photo-2.png',
    alt: 'Campaign event',
    cat: 'Campaigns',
    categories: ['campaigns', 'events'],
  },
  {
    full: '/assets/images/hub-photo-4.png',
    alt: 'UDS Hub KIWIX installation',
    cat: 'Training',
    categories: ['hubs', 'training'],
  },
  {
    full: '/assets/images/library-photo.png',
    alt: 'Library and open resources',
    cat: 'Training',
    categories: ['training'],
  },
  {
    full: '/assets/images/hub-photo-1.png',
    alt: 'Hub edit-a-thon',
    cat: 'Hubs',
    categories: ['hubs', 'training'],
  },
  {
    full: '/assets/images/blog-photo-1.png',
    alt: "Women's Wikipedia training",
    cat: 'Training',
    categories: ['training', 'campaigns'],
  },
  {
    full: '/assets/images/hub-photo-3.png',
    alt: 'Open knowledge collaboration',
    cat: 'Community',
    categories: ['community'],
  },
  {
    full: '/assets/images/hub-photo-2.png',
    alt: 'Community training day',
    cat: 'Training',
    categories: ['training', 'community'],
  },
];


const filters = [
  { label: 'All', value: 'all' },
  { label: 'Hubs', value: 'hubs' },
  { label: 'Events', value: 'events' },
  { label: 'Campaigns', value: 'campaigns' },
  { label: 'Training', value: 'training' },
  { label: 'Community', value: 'community' },
];

const Gallery: React.FC = () => {
  const [campaignGallery, setCampaignGallery] = useState([])
  // const [eventsGallery, setEventsGallery] = useState([])
  // const [hubsGallery, setHubsGallery] = useState([])
  // const [trainingGallery, setTrainingGallery] = useState([])
  // const [communityGallery, setCommunityGallery] = useState([])


  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  const filteredCards = galleryCards.filter((card) => {
    if (activeFilter === 'all') return true;
    return card.categories.includes(activeFilter);
  });

  const openLightbox = (cardIndex: number) => {
    // Find index in the filtered cards list to support slideshow sequencing
    setLightboxIdx(cardIndex);
  };

  const handlePrev = () => {
    setLightboxIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleNext = () => {
    setLightboxIdx((prev) => (prev + 1) % filteredCards.length);
  };



  //fetch images from google drive
  useEffect(() => {
    const fetchCampaignImages = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${import.meta.env.VITE_CAMPAIGN_FOLDER}'+in+parents&fields=files(id,name,mimeType)&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
        const data = await response.json();
        setCampaignGallery(data.files)
        // console.log(campaignGallery);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
      }
    };
    fetchCampaignImages();
  }, [])


  const newCampaignGallery = campaignGallery.map((image) => ({
    full: `https://drive.google.com/thumbnail?id=${image.id}&sz=w1000 `,
    alt: image.name,
    cat: 'Campaigns',
    categories: ['campaigns'],
  }))
  console.log(newCampaignGallery);

  return (
    <>
      <Lightbox
        images={filteredCards}
        currentIndex={lightboxIdx}
        onClose={() => setLightboxIdx(-1)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Visual Stories</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>Our Work in Pictures</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>Every photo tells the story of a community changed by open knowledge and women's leadership. Click any image to explore.</p>
        </div>
      </section>

      {/* GALLERY GRID SECTION */}
      <section className={styles.galleryPage}>
        <div className="container">
          <div className={`${styles.galleryFilters} reveal`}>
            {filters.map((f) => (
              <button
                key={f.value}
                className={`${styles.galleryFilter} ${activeFilter === f.value ? styles.galleryFilterActive : ''}`}
                onClick={() => {
                  setActiveFilter(f.value);
                  setLightboxIdx(-1);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={`${styles.galleryGrid} reveal d1`}>
            {/* {filteredCards.map((card, i) => (
              <div
                key={i}
                className={styles.galleryCard}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                aria-label={`Open lightbox for ${card.alt}`}
              >
                <div className={styles.galleryCardImgWrap}>
                  <img src={card.full} alt={card.alt} loading="lazy" />
                  <div className={styles.galleryCardOverlay}>
                    <span className={styles.galleryCardZoomIcon}>
                      <ZoomIn size={24} />
                    </span>
                  </div>
                </div>
                <div className={styles.galleryCardInfo}>
                  <span className={styles.galleryCardTag}>{card.cat}</span>
                  <h3 className={styles.galleryCardTitle}>{card.alt}</h3>
                </div>
              </div>
            ))} */}
            {newCampaignGallery.map((image, idx) => (
              <div
                key={idx}
                className={styles.galleryCard}
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
                aria-label={`Open lightbox for ${image.alt}`}
              >
                <div className={styles.galleryCardImgWrap}>
                  <img src={image.full} alt={image.alt} loading="lazy" />
                  <div className={styles.galleryCardOverlay}>
                    <span className={styles.galleryCardZoomIcon}>
                      <ZoomIn size={24} />
                    </span>
                  </div>
                </div>
                <div className={styles.galleryCardInfo}>
                  <span className={styles.galleryCardTag}>{image.cat}</span>
                  <h3 className={styles.galleryCardTitle}>{image.alt}</h3>
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

export default Gallery;
