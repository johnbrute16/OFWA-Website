import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { FloatingDonate } from './FloatingDonate';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: 'calc(100vh - 350px)' }}>
        {children}
      </main>
      <FloatingDonate />
      <Footer />
    </>
  );
};
