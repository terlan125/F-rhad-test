'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '@/context/LanguageContext';

interface NavbarProps {
  variant?: 'floating' | 'standard';
}

export default function Navbar({ variant }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Global Multi-Language Context (AZ, ENG, RUS)
  const { lang, setLang, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Map Language enum to label
  const langLabelMap: Record<Language, string> = {
    AZ: 'Az',
    ENG: 'Eng',
    RUS: 'Rus',
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Switch to dark glass style when over white section
      const threshold = windowHeight + 320;
      if (scrollY >= threshold) {
        setIsOverWhiteSection(true);
      } else {
        setIsOverWhiteSection(false);
      }

      // Detect when reaching Footer section (~350px threshold from page bottom on scrollable pages)
      if (fullHeight > windowHeight + 300 && scrollY + windowHeight >= fullHeight - 350) {
        setIsAtFooter(true);
      } else {
        setIsAtFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isOpen) setIsOpen(false);
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const scrollToTop = () => {
    handleLogoClick();
  };

  const showFrame = isAtFooter || isOpen;

  const navLinks = [
    { name: t.nav.links.home, href: '/' },
    { name: t.nav.links.about, href: '/haqqimizda' },
    { name: t.nav.links.listings, href: '/elanlar' },
    { name: t.nav.links.contact, href: '/elaqe' },
  ];

  const isStandardMode = variant === 'standard';

  // Standard Normal Navbar for Contact Page / standard mode
  if (isStandardMode) {
    return (
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 sm:px-12 py-6 bg-transparent text-white">
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover:bg-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="font-bold text-lg sm:text-xl font-rethink text-white tracking-tight">
            Realtors Caspian
          </span>
        </Link>

        {/* Center: Desktop Menu Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-rethink text-white/80">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-white ${
                pathname === link.href ? 'text-white font-semibold border-b-2 border-white pb-1' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Language Selector & Direct Call Button */}
        <div className="flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-rethink cursor-pointer hover:bg-black/60 transition-all"
            >
              <span>{langLabelMap[lang]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-black/90 backdrop-blur-xl border border-white/20 flex flex-col py-1 z-50">
                {(['AZ', 'ENG', 'RUS'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setIsLangOpen(false);
                    }}
                    className={`px-4 py-2 text-left text-xs font-rethink cursor-pointer hover:bg-white/10 ${
                      lang === l ? 'text-white font-bold' : 'text-white/70'
                    }`}
                  >
                    {langLabelMap[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="tel:+994518004404"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-[#171918] hover:bg-white/90 font-rethink text-xs font-medium transition-all shadow-md"
          >
            <span>+994(51)800-44-04</span>
          </a>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* 
        =========================================================
        40% WHITE GLASS BACKDROP OVERLAY
        Active ONLY when manually toggled open via click (NOT in Footer)
        =========================================================
      */}
      <AnimatePresence>
        {isOpen && !isAtFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={() => {
              setIsOpen(false);
              setIsLangOpen(false);
            }}
            className="fixed inset-0 z-40 cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.40)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Centered Navbar Header (z-40, below slide-over filter drawer z-[9999]) */}
      <header className="fixed top-[16px] sm:top-[40px] left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-40 flex flex-col items-center px-[16px] sm:px-0 pointer-events-auto w-full sm:w-auto">
        
        {/* 
          =========================================================
          NAVBAR CAPSULE: BACKGROUND SHRINKS / EXPANDS
          Inner Content remains completely stable and simply fades in/out
          =========================================================
        */}
        <motion.nav
          initial={false}
          animate={{
            width: isAtFooter ? '72px' : isMobile ? '100%' : '325px',
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={isAtFooter ? scrollToTop : undefined}
          className={`relative overflow-hidden transition-colors duration-700 w-full sm:w-auto flex items-center justify-center ${
            isAtFooter ? 'cursor-pointer' : ''
          }`}
          style={{
            height: '47px',
            borderRadius: '2px',
            background: 'rgba(0, 0, 0, 0.60)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            boxShadow: '0 4px 25px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* 1. Full Navbar Content (Stays 100% stable, only fades in / out) */}
          <motion.div
            initial={false}
            animate={{ opacity: isAtFooter ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-0 flex items-center justify-between px-5 sm:px-6 whitespace-nowrap ${
              isAtFooter ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
            style={{
              width: isAtFooter ? '325px' : isMobile ? '100%' : '325px',
              left: isMobile && !isAtFooter ? '0' : '50%',
              transform: isMobile && !isAtFooter ? 'none' : 'translateX(-50%)',
            }}
          >
            {/* Left: Logo */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollToTop();
                if (isOpen) setIsOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
              title={t.nav.links.home}
              aria-label={t.nav.links.home}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-500"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>

            {/* Center: Brand Text */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollToTop();
                if (isOpen) setIsOpen(false);
              }}
              className="cursor-pointer hover:opacity-75 transition-opacity"
            >
              <span
                className="transition-colors duration-500"
                style={{
                  color: '#FFF',
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                Realtors Caspian
              </span>
            </button>

            {/* Right: Menu Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
              aria-label="Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isOpen ? "M18 6L6 18M6 6l12 12" : "M9 12H21M3 8H21M3 16H21"}
                  stroke="#FFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-500"
                />
              </svg>
            </button>
          </motion.div>

          {/* 2. Collapsed RC Logo Badge */}
          <motion.div
            initial={false}
            animate={{ opacity: isAtFooter ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleLogoClick}
            className={`absolute inset-0 flex items-center justify-center whitespace-nowrap cursor-pointer ${
              isAtFooter ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: '"Rethink Sans", sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}
            >
              RC
            </span>
          </motion.div>
        </motion.nav>

        {/* 
          =========================================================
          NAVBAR'S OWN 754px GLASS FRAME (Unfolds smoothly on click or at Footer)
          =========================================================
        */}
        <AnimatePresence>
          {showFrame && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.05, y: -20 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.05, y: -20 }}
              transition={{ duration: 0.8, delay: isAtFooter ? 0.25 : 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="mt-6 w-full max-w-[754px] shadow-2xl z-50"
            >
              <div
                className="p-6 sm:p-[80px]"
                style={{
                  display: 'flex',
                  width: '754px',
                  maxWidth: '92vw',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '40px',
                  background: 'rgba(0, 0, 0, 0.60)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '0px',
                }}
              >
                {/* Top Content: Menu Links & Contact Info */}
                <div className="w-full flex flex-col gap-8">
                  
                  {/* Menu Header (Justify-between: Menu title left & Language selector right) */}
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="w-full flex items-center justify-between relative">
                      <span className="text-white/60 sm:text-white/80 font-rethink text-xs sm:text-base font-light sm:font-normal">
                        {t.nav.menuTitle}
                      </span>

                      {/* Language Selector Dropdown (Az, Eng, Rus) */}
                      <div className="relative">
                        <button
                          onClick={() => setIsLangOpen(!isLangOpen)}
                          className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity text-white text-base font-rethink select-none"
                        >
                          <span className="font-normal text-[16px] leading-none">{langLabelMap[lang]}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {isLangOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute right-0 mt-2 w-24 bg-black/85 backdrop-blur-md border border-white/20 rounded-md shadow-2xl z-50 py-1.5 flex flex-col gap-0.5"
                            >
                              {(['AZ', 'ENG', 'RUS'] as const).map((lKey) => (
                                <button
                                  key={lKey}
                                  onClick={() => {
                                    setLang(lKey);
                                    setIsLangOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-1.5 text-sm font-rethink cursor-pointer transition-colors ${
                                    lang === lKey ? 'text-white font-bold bg-white/20' : 'text-gray-300 hover:text-white hover:bg-white/10'
                                  }`}
                                >
                                  {langLabelMap[lKey]}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Navigation Links (Gap 4px, Font size 44px, Weight 700) */}
                    <div className="flex flex-col gap-[4px] w-full">
                      {navLinks.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="hover:opacity-75 transition-opacity text-[44px]"
                          style={{
                            flex: '1 0 0',
                            alignSelf: 'stretch',
                            color: '#FFF',
                            fontFamily: '"Rethink Sans", sans-serif',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '44px',
                            lineHeight: '1.25',
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info Section */}
                  <div className="w-full pt-2">
                    {/* Desktop View (>= sm) */}
                    <div className="hidden sm:flex justify-between items-start w-full">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-white/80 font-rethink text-sm sm:text-base font-normal">
                          {t.nav.phoneLabel}
                        </span>
                        <span className="text-white/80 font-rethink text-sm sm:text-base font-normal">
                          {t.nav.emailLabel}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 items-end">
                        <a href="tel:+994518004404" className="hover:underline text-white font-rethink text-sm sm:text-base font-normal">
                          +994(51)800-44-04
                        </a>
                        <a href="mailto:farhad@realtorscaspian.az" className="hover:underline text-white font-rethink text-sm sm:text-base font-normal">
                          farhad@realtorscaspian.az
                        </a>
                      </div>
                    </div>

                    {/* Mobile View (< sm) - Stacked Phone & Email */}
                    <div className="flex sm:hidden flex-col gap-3 items-start w-full">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-white/60 font-rethink text-xs font-light">
                          {t.nav.phoneLabel}
                        </span>
                        <a href="tel:+994518004404" className="hover:underline text-white font-rethink text-sm font-normal">
                          +994(51)800-44-04
                        </a>
                      </div>

                      <div className="flex flex-col items-start gap-1">
                        <span className="text-white/60 font-rethink text-xs font-light">
                          {t.nav.emailLabel}
                        </span>
                        <a href="mailto:farhad@realtorscaspian.az" className="hover:underline text-white font-rethink text-sm font-normal">
                          farhad@realtorscaspian.az
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Content: Full-Width Button Group (Stacked on mobile, side-by-side on desktop) */}
                <div className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-5 pt-1">
                  {/* Left Button: Ev axtarıram -> /elanlar */}
                  <Link
                    href="/elanlar"
                    onClick={() => {
                      if (isOpen) setIsOpen(false);
                      if (pathname === '/elanlar') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:flex-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full cursor-pointer border border-[#FFF] text-white transition-all hover:bg-white/15 rounded-none"
                      style={{
                        display: 'flex',
                        padding: '14px 24px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#FFF',
                        fontFamily: '"Rethink Sans", sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        border: '1px solid #FFF',
                        borderRadius: '0px',
                      }}
                    >
                      {t.nav.buyBtn}
                    </motion.button>
                  </Link>

                  {/* Right Button: Ev satıram -> /elaqe */}
                  <Link
                    href="/elaqe"
                    onClick={() => {
                      if (isOpen) setIsOpen(false);
                    }}
                    className="w-full sm:flex-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full cursor-pointer bg-white text-[#171918] transition-all hover:bg-white/90 rounded-none shadow-lg"
                      style={{
                        display: 'flex',
                        padding: '14px 24px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#171918',
                        fontFamily: '"Rethink Sans", sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        backgroundColor: '#FFF',
                        borderRadius: '0px',
                      }}
                    >
                      {t.nav.sellBtn}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  );
}
