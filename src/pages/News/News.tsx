import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { NewsModal } from '../../components/NewsModal/NewsModal';
import type { NewsArticle } from '../../components/NewsModal/NewsModal';
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

const initialNewsCards: NewsArticle[] = [
  {
    img: '/assets/images/hub-photo-3.png',
    cat: 'Programs',
    title: 'Africa Wiki Challenge 2022 — Results & Impact',
    excerpt: 'Over 1,200 new Wikipedia articles were created during our flagship annual challenge — the largest in OFWA history.',
    date: 'May 2022',
    author: 'Felix Nartey',
    readTime: '4 min read',
    content: [
      'The Africa Wiki Challenge (AWC) is OFWA\'s landmark campaign aimed at projecting the African narrative on Wikipedia. The 2022 edition focused on documenting African landmarks, historical figures, and cultural heritage, rallying editors from over 15 African nations.',
      'The campaign concluded with record-breaking numbers: over 1,200 new articles created, 3,500 existing articles improved, and more than 8,000 photos uploaded to Wikimedia Commons. Participants wrote about everything from ancient shrines in Ghana to modern infrastructure projects in Kenya.',
      'Beyond the numbers, the challenge has fostered a vibrant, supportive network of editors. Through online workshops and physical edit-a-thons, veteran editors mentored newcomers, building local capacity that continues to grow long after the challenge ended.',
      'As we reflect on these achievements, we are already planning the next iteration, aiming to include more languages and reach even more remote communities across the continent.'
    ],
    gallery: [
      '/assets/images/hub-photo-4.png',
      '/assets/images/blog-photo-2.png'
    ]
  },
  {
    img: '/assets/images/blog-photo-2.png',
    cat: 'Partnerships',
    title: "OFWA × National Film Authority: Preserving Ghana's Cinema Heritage",
    excerpt: "A landmark collaboration that brought Ghana's film history to Wikipedia — making it freely accessible to the world.",
    date: 'March 2023',
    author: 'Olatunde Isaac',
    readTime: '3 min read',
    content: [
      'Ghana has a rich cinematic history, boasting pioneering filmmakers like Kwaw Ansah and King Ampaw. However, much of this history has remained undocumented online, making it difficult for the global public to discover and appreciate Ghanaian film achievements.',
      'In March 2023, Open Foundation West Africa partnered with the National Film Authority (NFA) of Ghana to change this. The collaboration kicked off with an intensive archive digitization project and a series of specialized edit-a-thons.',
      'Volunteers and film scholars came together to write biographies for film directors, document landmark movies, and upload historical film posters. This effort ensures that Ghana\'s cinematic heritage is preserved in the digital public square forever.',
      'This partnership is a model for how open-knowledge organizations can work alongside state cultural institutions to safeguard national history and make it accessible to all.'
    ],
    gallery: [
      '/assets/images/about-hero.png',
      '/assets/images/hub-photo-1.png'
    ]
  },
  {
    img: '/assets/images/hub-photo-1.png',
    cat: 'Impact',
    title: "Opening the Abelemkpe Hub — OFWA's Second Accra Location",
    excerpt: 'Our second Accra hub opens its doors, bringing digital skills training and Wikipedia editing to a new community.',
    date: 'Jan 2024',
    author: 'Sandister Tei',
    readTime: '3 min read',
    content: [
      'We are thrilled to announce the official opening of our new community hub in Abelemkpe, Accra. This is our second physical location in the capital, designed to serve as a collaborative space for editors, students, and open-knowledge advocates.',
      'The Abelemkpe Hub is equipped with high-speed internet, comfortable workstations, and a dedicated training room. It will host weekly edit-a-thons, digital literacy classes, and meetups for various wiki interest groups.',
      'During the opening ceremony, our Executive Director highlighted that physical spaces are vital for community building. "Online collaboration is powerful, but meeting in person, sharing a coffee, and editing together creates bonds that sustain our movement," she remarked.',
      'All wiki editors and curious minds are welcome to visit! Check out our events page for the hub\'s weekly schedule.'
    ],
    gallery: [
      '/assets/images/blog-photo-1.png',
      '/assets/images/hub-photo-3.png'
    ]
  },
  {
    img: '/assets/images/hub-photo-4.png',
    cat: 'Programs',
    title: 'KIWIX4Schools: 12 Deployments, Thousands of Students Reached',
    excerpt: "Our offline Wikipedia initiative has now reached 12 schools in Ghana's Northern Region, serving over 4,000 students.",
    date: 'Aug 2024',
    author: 'Joy Agyepong',
    readTime: '4 min read',
    content: [
      'Following the pilot phase of our offline educational program, the KIWIX4Schools initiative has scaled up significantly. As of August 2024, we have completed 12 full school deployments across remote districts in the Northern Region.',
      'Each school received a localized server pre-loaded with comprehensive copies of Wikipedia, Wiktionary, and specialized scientific databases. In addition, we conducted hands-on training sessions for teachers and library coordinators.',
      'The results speak for themselves: student research projects have improved, and library engagement has tripled. Teachers report that having instant, search-ready text and diagrams has revolutionized their science and social studies lessons.',
      'We are deeply grateful to our local partners and donors who made this expansion possible. We look forward to scaling this project to even more regions in the near future.'
    ],
    gallery: [
      '/assets/images/hub-photo-3.png',
      '/assets/images/hub-photo-2.png'
    ]
  },
  {
    img: '/assets/images/about-hero.png',
    cat: 'Programs',
    title: 'Women in Open Knowledge Summit 2024 — A Record Turnout',
    excerpt: 'Over 400 participants gathered for our annual summit, with sessions on AI, digital rights, and open licensing.',
    date: 'Oct 2024',
    author: 'Pamela Ofori',
    readTime: '5 min read',
    content: [
      'The annual Women in Open Knowledge Summit continues to be a driving force for gender equity in the digital sphere. The 2024 summit, held in Accra, saw our largest turnout yet, with over 400 women in attendance from across West Africa.',
      'The two-day summit featured interactive workshops, panel discussions, and keynotes focusing on how artificial intelligence affects women in technology, digital privacy, and how to increase female authorship on Wikipedia.',
      'A highlight of the event was a massive edit-a-thons targeting the gender gap. In just three hours, participants created over 80 biographies of notable African women scientists, artists, and leaders.',
      'We want to thank all our speakers, volunteers, and sponsors for making this event a historic success. The energy in the room showed that the future of open knowledge is diverse and female.'
    ],
    gallery: [
      '/assets/images/blog-photo-2.png',
      '/assets/images/hub-photo-1.png'
    ]
  },
  {
    img: '/assets/images/hub-photo-2.png',
    cat: 'Impact',
    title: 'UDS Wiki Club Trains 200 Students in One Semester',
    excerpt: 'The University for Development Studies hub ran its most productive semester yet, creating 340 Wikipedia articles.',
    date: 'Dec 2024',
    author: 'Mohammed Sadat',
    readTime: '3 min read',
    content: [
      'The UDS Wiki Club has set a new record for student engagement. Over the course of the fall semester, the club hosted bi-weekly editing clinics and workshops, training 200 new students in the art of Wikipedia contributing.',
      'Focusing on local geographic landmarks and history, the students successfully created 340 new articles and uploaded dozens of high-quality photos of campus landmarks and nearby historic sites.',
      'This level of enthusiasm is a testament to the dedication of our club leadership at UDS. By embedding open knowledge contributions into campus life, they are training the next generation of digital historians.',
      'We are excited to support the club\'s expansion in the next academic year and hope to replicate this model at other universities throughout West Africa.'
    ],
    gallery: [
      '/assets/images/hub-photo-1.png',
      '/assets/images/about-hero.png'
    ]
  },
];

const featuredPost: NewsArticle = {
  img: '/assets/images/blog-photo-1.png',
  cat: 'KIWIX4Schools',
  title: 'How Offline Wikipedia Is Transforming Classrooms in Northern Ghana',
  desc: "When internet connectivity isn't guaranteed, learning shouldn't stop. OFWA's KIWIX4Schools initiative has deployed offline Wikipedia servers in 12 schools across the Northern and Upper East Regions — giving students access to the world's largest free knowledge base without needing a single data byte.",
  date: 'June 2026',
  author: 'Joy Agyepong',
  readTime: '5 min read',
  content: [
    "In many rural schools across Ghana's Northern and Upper East Regions, students face a digital divide. While schools in urban centers benefit from internet connectivity, remote classrooms are often left without access to the vast educational resources available online.",
    "To bridge this gap, Open Foundation West Africa (OFWA) launched the KIWIX4Schools initiative. By deploying local offline servers pre-loaded with Wikipedia, Wiktionary, and thousands of educational books, we are bringing the digital revolution to classrooms without needing internet access or mobile data.",
    "To date, the program has successfully deployed KIWIX servers in 12 high schools, training both teachers and students on how to navigate and utilize this offline knowledge base. The impact has been immediate: students are now writing better research essays, teachers have richer lesson plans, and library periods have become hubs of active curiosity.",
    "We believe that knowledge is a fundamental right. Our goal is to expand this project to 50 more schools by the end of next year, ensuring that no student is left behind because of their geographical location."
  ],
  gallery: [
    '/assets/images/hub-photo-1.png',
    '/assets/images/hub-photo-3.png'
  ]
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
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

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
              <p className={styles.featuredMeta}>Published · {featuredPost.date} · {featuredPost.readTime}</p>
              <button 
                className={`${styles.featuredLink} btn-orange`} 
                onClick={() => setSelectedArticle(featuredPost)}
                style={{ border: 'none', cursor: 'pointer' }}
              >
                Read Full Story <ArrowRight size={15} />
              </button>
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
                      <button 
                        className={styles.newsLink} 
                        onClick={() => setSelectedArticle(card)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        Read More <ArrowRight size={14} className={styles.linkArrow} />
                      </button>
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

      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
};

export default News;
