'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import YouTubeBackground from '@/components/YouTubeBackground';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Parallax background movement
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['-60px', '0px']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  // 50% Footer Intersection Scroll Snap
  useEffect(() => {
    let lastSnapTime = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const now = Date.now();
        
        // If 50% or more of footer is visible, snap directly to bottom
        if (entry.isIntersecting && now - lastSnapTime > 1000) {
          lastSnapTime = now;
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      },
      { threshold: 0.5 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      ref={footerRef}
      id="elaqe"
      className="relative z-20 w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between items-center text-white m-0 p-0 bg-black"
    >
      {/* 
        =========================================================
        PARALLAX VIDEO BACKGROUND (100vh Full Screen)
        =========================================================
      */}
      <YouTubeBackground
        videoId="HxpsCBtbqv8"
        overlayGradient="bg-black/60"
      />

      {/* Spacer to allow Navbar's 754px unfolding frame to sit comfortably above arrow button */}
      <div className="flex-1 w-full" />

      {/* 
        =========================================================
        SCROLL-TO-TOP ARROW BUTTON FRAME
        =========================================================
      */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={scrollToTop}
        className="cursor-pointer transition-all duration-300 hover:bg-black/90 mb-4 z-20"
        style={{
          display: 'inline-flex',
          height: '47px',
          padding: '12px 24px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '2px',
          background: 'rgba(0, 0, 0, 0.60)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
        title={t.footer.upBtn}
      >
        {/* SVG Arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M19 12L12 5L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* 
        =========================================================
        BOTTOM GRADIENT BAR & FOOTER LINKS (60px Left/Right, 40px Bottom)
        =========================================================
      */}
      <div
        className="w-full z-20 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 85.1%, rgba(0, 0, 0, 0.80) 100%)',
          paddingLeft: '60px',
          paddingRight: '60px',
          paddingBottom: '40px',
        }}
      >
        {/* Left Side: Social Media Links (Side-by-side on mobile & tablet) */}
        <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-2 opacity-80">
          {[
            { name: 'Instagram', href: 'https://instagram.com' },
            { name: 'Youtube', href: 'https://youtube.com' },
            { name: 'Linkedin', href: 'https://linkedin.com' },
            { name: 'Tiktok', href: 'https://tiktok.com' },
          ].map((social, idx, arr) => (
            <React.Fragment key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:opacity-100 transition-all"
                style={{
                  color: '#FFF',
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  opacity: 0.8,
                }}
              >
                {social.name}
              </a>
              {idx < arr.length - 1 && <span className="opacity-60">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Right Side: Copyright & Credits */}
        <div className="flex items-center gap-1 text-center md:text-right opacity-80">
          <span
            style={{
              color: '#FFF',
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              opacity: 0.8,
            }}
          >
            ©2026, RealtorsCaspian, {t.footer.designerLabel}
            <a
              href="https://tarlanmovlamov.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
            >
              {t.footer.designerName}
            </a>
            {t.footer.designerSuffix}
          </span>
        </div>
      </div>
    </footer>
  );
}
