'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ListingsSection from '@/components/ListingsSection';
import { useLanguage } from '@/context/LanguageContext';
import YouTubeBackground from '@/components/YouTubeBackground';
import CtaSection from '@/components/CtaSection';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Track scroll position for subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <div ref={containerRef} className="relative w-full m-0 p-0">
      {/* 
        =========================================================
        COMBINED HERO WRAPPER (Desktop: 100vh + 400px with justify-between, Mobile/Tablet: compact gap-4)
        =========================================================
      */}
      <div className="relative w-full flex flex-col justify-start gap-4 lg:gap-0 lg:min-h-[calc(100vh+400px)] lg:justify-between m-0 p-0">
        
        {/* Continuous Video Background with Dark Gradient Overlay */}
        <YouTubeBackground
          videoId="HxpsCBtbqv8"
          overlayGradient="bg-gradient-to-t from-black/90 via-black/45 to-black/20"
        />

        {/* 
          =========================================================
          SECTION 1 (Desktop: 100vh, Mobile/Tablet: compact natural height)
          =========================================================
        */}
        <section className="relative w-full min-h-screen flex flex-col justify-end px-4 sm:px-12 md:px-[60px] pt-28 sm:pt-36 lg:pt-0 pb-8 sm:pb-12 text-white z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full flex flex-col gap-6"
          >
            {/* 
              Top Part (Above Line):
              Left: Large Title
              Right: Description + Buttons underneath
            */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-[4px] lg:gap-8">
              
              {/* Left Column: Big Title */}
              <div className="max-w-[650px]">
                <h1
                  className="font-rethink text-white text-[38px] sm:text-[50px] md:text-[58px] lg:text-[66px] font-normal leading-[1.1] tracking-tight"
                  style={{
                    fontFamily: '"Rethink Sans", sans-serif',
                  }}
                >
                  {t.hero.title}
                </h1>
              </div>

              {/* Right Column: Description & Buttons */}
              <div className="w-full lg:max-w-[332px] flex flex-col items-stretch gap-[24px] lg:gap-[8px]">
                <p
                  className="font-rethink text-white/90 text-[15px] sm:text-[16px] font-light leading-relaxed"
                  style={{
                    fontFamily: '"Rethink Sans", sans-serif',
                  }}
                >
                  {t.hero.subtitle}
                </p>

                {/* Buttons underneath Description */}
                <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/elanlar"
                    onClick={() => {
                      if (window.location.pathname === '/elanlar') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-full flex-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full cursor-pointer bg-white text-[#171918] px-7 py-3 font-rethink text-[15px] font-medium transition-all hover:bg-white/90 shadow-lg rounded-none text-center"
                      style={{
                        fontFamily: '"Rethink Sans", sans-serif',
                      }}
                    >
                      {t.hero.searchBtn}
                    </motion.button>
                  </Link>

                  <Link
                    href="/elaqe"
                    className="w-full flex-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full cursor-pointer border border-white text-white px-7 py-3 font-rethink text-[15px] font-medium transition-all hover:bg-white/15 rounded-none text-center"
                      style={{
                        fontFamily: '"Rethink Sans", sans-serif',
                      }}
                    >
                      {t.hero.sellBtn}
                    </motion.button>
                  </Link>
                </div>
              </div>

            </div>

            {/* Horizontal Divider Line */}
            <div className="w-full border-t border-white/30 my-1" />

            {/* 
              Bottom Part (Below Line):
              Left: Location / Address
              Right: Phone & Email
            */}
            <div className="w-full flex flex-row justify-between items-center gap-3 text-white/80 text-[13px] sm:text-[15px] font-rethink font-light">
              {/* Left Column: Location */}
              <div className="shrink-0">
                <span>{t.hero.location}</span>
              </div>

              {/* Right Column: Contact Phone & Email */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-6 text-right">
                <a href="tel:+994518004404" className="hover:text-white transition-colors">
                  +994(51)800-44-04
                </a>
                <span className="hidden sm:inline opacity-40">|</span>
                <a href="mailto:farhad@realtorscaspian.az" className="hidden sm:flex hover:text-white transition-colors items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>farhad@realtorscaspian.az</span>
                </a>
              </div>
            </div>

          </motion.div>
        </section>

        {/* 
          =========================================================
          SECTION 2 (400px Height - Shifted right with description margin)
          =========================================================
        */}
        <section id="why-us" className="relative w-full h-auto lg:h-[400px] my-[40px] lg:my-0 pt-4 pb-16 sm:pb-24 lg:py-0 flex items-center justify-end px-4 sm:px-12 lg:pl-12 lg:pr-0 lg:mr-0 z-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-1/2 flex flex-col gap-6 mr-0 pr-0"
          >
            {/* Top Line */}
            <div
              className="w-full border-t border-white mr-0 pr-0"
              style={{
                borderTopWidth: '1px',
                borderTopColor: '#FFF',
              }}
            />

            {/* 2-Column Content: Title on Left, Description on Right */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-10 mr-0 pr-0">
              {/* Left Column - Title */}
              <h2
                className="font-bodoni text-white text-[22px] sm:text-[24px] font-normal leading-normal shrink-0"
                style={{
                  color: '#FFF',
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                {t.hero.whyUsTitle}
              </h2>

              {/* Right Column - Description */}
              <p
                className="font-rethink text-white text-[15px] sm:text-[16px] font-normal leading-normal text-left sm:text-right sm:mr-[40px] mt-1"
                style={{
                  color: '#FFF',
                  fontFamily: '"Rethink Sans", sans-serif',
                  lineHeight: '1.6',
                }}
              >
                {t.hero.whyUsDesc}
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      {/* 
        =========================================================
        SECTION 3 (#fff Background - Overlaps Hero from below)
        =========================================================
      */}
      <section
        className="relative z-20 w-full min-h-screen bg-white text-[#171918] rounded-none shadow-[0_-20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 pt-4 pb-0"
        style={{ backgroundColor: '#ffffff' }}
      >
        <ListingsSection />
        <CtaSection />
      </section>
    </div>
  );
}
