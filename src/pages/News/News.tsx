import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './News.module.css';

// Google Drive API provision structure:
/*
const API_KEY = "AIzaSyCGLp2lDgeNmYKa8MIZiYG60SeDcNgvvO0";
const NEWS_FOLDER_ID = "1K0-x0Ydb-ouI4QSk-CwEx3K1n954Fk-4"; // example folder ID

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

async function fetchDriveNews() {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${NEWS_FOLDER_ID}'+in+parents&fields=files(id,name,mimeType)&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("Failed to fetch news from Google Drive:", error);
    return [];
  }
}
*/

const initialNewsCards = [
  {
    img: '/assets/images/hub-photo-3.png',
    cat: 'Programs',
    title: 'Africa Wiki Challenge 2022 — Results & Impact',
    excerpt: 'Over 1,200 new Wikipedia articles were created during our flagship annual challenge — the largest in OFWA history.',
    date: 'May 2022',
  },
  {
    img: '/assets/images/blog-photo-2.png',
    cat: 'Partnerships',
    title: "OFWA × National Film Authority: Preserving Ghana's Cinema Heritage",
    excerpt: "A landmark collaboration that brought Ghana's film history to Wikipedia — making it freely accessible to the world.",
    date: 'March 2023',
  },
  {
    img: '/assets/images/hub-photo-1.png',
    cat: 'Impact',
    title: "Opening the Abelemkpe Hub — OFWA's Second Accra Location",
    excerpt: 'Our second Accra hub opens its doors, bringing digital skills training and Wikipedia editing to a new community.',
    date: 'Jan 2024',
  },
  {
    img: '/assets/images/hub-photo-4.png',
    cat: 'Programs',
    title: 'KIWIX4Schools: 12 Deployments, Thousands of Students Reached',
    excerpt: "Our offline Wikipedia initiative has now reached 12 schools in Ghana's Northern Region, serving over 4,000 students.",
    date: 'Aug 2024',
  },
  {
    img: '/assets/images/about-hero.png',
    cat: 'Programs',
    title: 'Women in Open Knowledge Summit 2024 — A Record Turnout',
    excerpt: 'Over 400 participants gathered for our annual summit, with sessions on AI, digital rights, and open licensing.',
    date: 'Oct 2024',
  },
  {
    img: '/assets/images/hub-photo-2.png',
    cat: 'Impact',
    title: 'UDS Wiki Club Trains 200 Students in One Semester',
    excerpt: 'The University for Development Studies hub ran its most productive semester yet, creating 340 Wikipedia articles.',
    date: 'Dec 2024',
  },
];

const featuredPost = {
  img: '/assets/images/blog-photo-1.png',
  cat: 'KIWIX4Schools',
  title: 'How Offline Wikipedia Is Transforming Classrooms in Northern Ghana',
  desc: "When internet connectivity isn't guaranteed, learning shouldn't stop. OFWA's KIWIX4Schools initiative has deployed offline Wikipedia servers in 12 schools across the Northern and Upper East Regions — giving students access to the world's largest free knowledge base without needing a single data byte.",
  meta: 'Published · June 2026 · 5 min read',
};

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Programs', value: 'Programs' },
  { label: 'Partnerships', value: 'Partnerships' },
  { label: 'Impact', value: 'Impact' },
];

const News: React.FC = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredCards = initialNewsCards.filter((card) => {
    if (activeFilter === 'all') return true;
    return card.cat === activeFilter;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredCards.length));
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className={`${styles.pageHeroKicker} reveal`}>Impact &amp; Updates</p>
          <h1 className={`${styles.pageHeroTitle} reveal d1`}>News &amp; Stories</h1>
          <p className={`${styles.pageHeroSub} reveal d2`}>Stories of change from OFWA's work across Ghana and West Africa — programs, partnerships, and the people behind them.</p>
        </div>
      </section>

      {/* FEATURED STORY */}
      <section className={styles.featuredSection}>
        <div className="container">
          <span className="section-tag reveal">Featured Story</span>
          <div className={`${styles.featuredLayout} reveal d1`}>
            <div className={styles.featuredImg}>
              <img src={featuredPost.img} alt={featuredPost.title} />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.featuredCat}>{featuredPost.cat}</span>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredDesc}>{featuredPost.desc}</p>
              <p className={styles.featuredMeta}>{featuredPost.meta}</p>
              <Link className={`${styles.featuredLink} btn-orange`} to="/contact">
                Read Full Story <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ALL POSTS */}
      <section className={styles.allPostsSection}>
        <div className="container">
          <div className={styles.postsHeader}>
            <div>
              <span className="section-tag reveal">Latest</span>
              <h2 className={`${styles.postsSectionH} reveal d1`}>All Stories</h2>
            </div>
            <div className={`${styles.filters} reveal d1`}>
              {categories.map((c) => (
                <button
                  key={c.value}
                  className={`${styles.filterBtn} ${activeFilter === c.value ? styles.filterBtnActive : ''}`}
                  onClick={() => {
                    setActiveFilter(c.value);
                    setVisibleCount(3); // Reset count on filter change
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {filteredCards.length > 0 ? (
            <div className={styles.postsGrid}>
              {filteredCards.slice(0, visibleCount).map((card, i) => (
                <article key={i} className={`${styles.newsCard} reveal ${i > 0 ? `d${i}` : ''}`}>
                  <div className={styles.newsCardImg}>
                    <img src={card.img} alt={card.title} />
                  </div>
                  <div className={styles.newsCardBody}>
                    <span className={styles.newsTag}>{card.cat}</span>
                    <h3 className={styles.newsCardTitle}>{card.title}</h3>
                    <p className={styles.newsCardExcerpt}>{card.excerpt}</p>
                    <div className={styles.newsCardFooter}>
                      <span className={styles.newsDate}>{card.date}</span>
                      <Link className={styles.newsLink} to="/contact">
                        Read More <ArrowRight size={14} className={styles.linkArrow} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.noPosts}>
              <p>No stories found for this category.</p>
            </div>
          )}

          {visibleCount < filteredCards.length && (
            <div className={`${styles.loadMoreWrap} reveal`}>
              <button className={`${styles.loadMoreBtn} btn-ghost`} onClick={handleLoadMore}>
                Load More Stories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* DONATE CTA */}
      <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Be Part of the Story</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Help Write the Next Chapter</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Every donation funds the programs, training sessions, and campaigns that become the stories we tell here.</p>
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

export default News;
