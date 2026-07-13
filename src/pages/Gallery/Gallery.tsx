import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ZoomIn, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
  // { label: 'Hubs', value: 'hubs' },
  { label: 'Media & CSO', value: 'events' },
  { label: 'DSEF', value: 'campaigns' },
  { label: 'Afro Creatives 2025', value: 'training' },
  { label: 'AI for Kids', value: 'community' },
];

interface DriveFile {
  id: string;
  name: string;
}

interface GalleryCard {
  full: string;
  alt: string;
  cat: string;
  categories: string[];
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch images from all Google Drive folders in parallel
  useEffect(() => {
    const fetchAllImages = async () => {
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const folders = [
        { id: import.meta.env.VITE_CAMPAIGN_FOLDER, cat: 'Campaigns', tag: 'campaigns' },
        { id: import.meta.env.VITE_COMMUNITY_FOLDER, cat: 'Community', tag: 'community' },
        { id: import.meta.env.VITE_EVENTS_FOLDER, cat: 'Events', tag: 'events' },
        { id: import.meta.env.VITE_HUBS_FOLDER, cat: 'Hubs', tag: 'hubs' },
        { id: import.meta.env.VITE_TRAINING_FOLDER, cat: 'Training', tag: 'training' },
      ];

      try {
        const promises = folders.map(async (folder) => {
          if (!folder.id || !apiKey) return [];
          const query = encodeURIComponent(`'${folder.id}' in parents and mimeType starts with 'image/' and trashed = false`);
          const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)&key=${apiKey}`;
          const response = await fetch(url);
          if (!response.ok) {
            console.warn(`Failed to fetch images for folder ${folder.cat}: ${response.statusText}`);
            return [];
          }
          const data = await response.json();
          const files: DriveFile[] = data.files || [];

          return files.map((file) => ({
            full: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
            alt: file.name.split('.')[0] || file.name,
            cat: folder.cat,
            categories: [folder.tag],
          }));
        });

        const results = await Promise.all(promises);
        const combined = results.flat();
        setGalleryItems(combined);
      } catch (error) {
        console.error('Error fetching images from Google Drive:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  const displayCards = galleryItems.length > 0 ? galleryItems : galleryCards;

  const filteredCards = displayCards.filter((card) => {
    if (activeFilter === 'all') return true;
    return card.categories.includes(activeFilter);
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const paginatedCards = filteredCards.slice(activePage * ITEMS_PER_PAGE, (activePage + 1) * ITEMS_PER_PAGE);

  const openLightbox = (cardIndex: number) => {
    setLightboxIdx(cardIndex);
  };

  const handlePrev = () => {
    setLightboxIdx((prev) => (prev - 1 + paginatedCards.length) % paginatedCards.length);
  };

  const handleNext = () => {
    setLightboxIdx((prev) => (prev + 1) % paginatedCards.length);
  };

  return (
    <>
      <Lightbox
        images={paginatedCards}
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
      <section className={styles.galleryPage} id="gallery-section">
        <div className="container">
          <div className={`${styles.galleryFilters} reveal`}>
            {filters.map((f) => (
              <button
                key={f.value}
                className={`${styles.galleryFilter} ${activeFilter === f.value ? styles.galleryFilterActive : ''}`}
                onClick={() => {
                  setActiveFilter(f.value);
                  setLightboxIdx(-1);
                  setCurrentPage(0);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={`${styles.galleryGrid} reveal d1`}>
            {isLoading && galleryItems.length === 0 ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <div key={`skeleton-${idx}`} className={styles.skeletonCard}>
                  <div className={styles.skeletonImg} />
                  <div className={styles.skeletonInfo}>
                    <div className={styles.skeletonTag} />
                    <div className={styles.skeletonTitle} />
                  </div>
                </div>
              ))
            ) : (
              paginatedCards.map((card, i) => (
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
              ))
            )}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className={`${styles.pagination} reveal`}>
              <button
                className={`${styles.pageBtn} ${styles.pageNavBtn}`}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(0, prev - 1));
                  const gallerySection = document.getElementById('gallery-section');
                  if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                disabled={activePage === 0}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <button
                  key={pageIdx}
                  className={`${styles.pageBtn} ${activePage === pageIdx ? styles.pageBtnActive : ''}`}
                  onClick={() => {
                    setCurrentPage(pageIdx);
                    const gallerySection = document.getElementById('gallery-section');
                    if (gallerySection) {
                      gallerySection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  aria-label={`Go to page ${pageIdx + 1}`}
                >
                  {pageIdx + 1}
                </button>
              ))}

              <button
                className={`${styles.pageBtn} ${styles.pageNavBtn}`}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
                  const gallerySection = document.getElementById('gallery-section');
                  if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                disabled={activePage === totalPages - 1}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
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
