'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YouTubeBackground from '@/components/YouTubeBackground';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    title: 'Realtors Caspian Baş Ofisi',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1560516963-9a5784982803?auto=format&fit=crop&w=1400&q=80',
    title: 'Müştəri Konsultasiyası',
    aspect: 'aspect-square',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    title: 'Uğurlu Əqd & Müqavilə',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80',
    title: 'Müasir İş Mühitimiz',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    title: 'Peşəkar Broker Komandamız',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1542744836-565782678195?auto=format&fit=crop&w=1400&q=80',
    title: 'Strateji Planlaşdırma',
    aspect: 'aspect-[3/4]',
  },
];

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Fərhad Abbasov',
    role: 'Təsisçi & Baş Direktor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    experience: '12+ İl Təcrübə',
  },
  {
    id: 2,
    name: 'Leyla Hüseynova',
    role: 'Lüks Rezidensiyalar üzrə Ekspert',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    experience: 'Port Baku & Xəzər Sahili',
  },
  {
    id: 3,
    name: 'Rəşad Məmmədov',
    role: 'İnvestisiya Direktoru',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    experience: 'Kommersiya & Əqdlər',
  },
  {
    id: 4,
    name: 'Nərmin Qasımova',
    role: 'VIP Müştəri Əlaqələri',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    experience: 'Fərdi Konsultasiya',
  },
];

export default function HaqqimizdaPage() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);

  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsVideoLightboxOpen(false);
      }
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0));
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <main className="min-h-screen w-full bg-white text-[#171918] relative pt-28 overflow-x-hidden">
      {/* Floating Navbar */}
      <Navbar />

      {/* 
        =========================================================
        1. TOP TEXT HERO HEADER (Under Navbar)
        =========================================================
      */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-16 sm:pt-28 pb-24 sm:pb-36 text-center flex flex-col items-center gap-6">
        <h1
          className="text-[38px] sm:text-[56px] font-bold text-[#171918]"
          style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
        >
          Bakının və Xəzər sahilinin lüks daşınmaz əmlak brendi
        </h1>

        <p className="text-gray-600 font-rethink text-base sm:text-lg font-light max-w-2xl leading-relaxed">
          2014-cü ildən bəri müştərilərimizə premium mənzillər, villalar və eksklüziv rezidensiyaların alqı-satqısında peşəkar vasitəçilik xidməti təklif edirik.
        </p>

        {/* 
          =========================================================
          METRICS / STATS STRIP (Under Text)
          =========================================================
        */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 mt-8 border-t border-gray-100">
          <div className="flex flex-col gap-1 items-center">
            <span
              className="text-3xl sm:text-4xl font-bold font-rethink text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              10+ İl
            </span>
            <span className="text-xs font-rethink text-gray-400 uppercase tracking-wider">Təcrübə (2014-dən)</span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <span
              className="text-3xl sm:text-4xl font-bold font-rethink text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              200+
            </span>
            <span className="text-xs font-rethink text-gray-400 uppercase tracking-wider">Eksklüziv Obyekt</span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <span
              className="text-3xl sm:text-4xl font-bold font-rethink text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              99%
            </span>
            <span className="text-xs font-rethink text-gray-400 uppercase tracking-wider">Müştəri Məmnuniyyəti</span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <span
              className="text-3xl sm:text-4xl font-bold font-rethink text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              100%
            </span>
            <span className="text-xs font-rethink text-gray-400 uppercase tracking-wider">Hüquqi Zəmanət</span>
          </div>
        </div>
      </section>

      {/* 
        =========================================================
        2. EXPANDING VIDEO SECTION ON SCROLL (Very Wide Container)
        =========================================================
      */}
      <section ref={videoRef} className="w-full py-12 px-6 sm:px-[40px] overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          onClick={() => setIsVideoLightboxOpen(true)}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black overflow-hidden shadow-2xl group origin-center cursor-pointer"
        >
          <YouTubeBackground videoId="HxpsCBtbqv8" overlayGradient="bg-black/40" />
          
          {/* Centered Glassmorphism Play Button Overlay */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoLightboxOpen(true);
              }}
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/20 hover:bg-white backdrop-blur-xl border border-white/50 flex items-center justify-center text-white hover:text-black transition-all duration-500 shadow-2xl hover:scale-110 cursor-pointer"
              aria-label="Play Video Lightbox"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-14 bg-gradient-to-t from-black/85 via-transparent to-transparent text-white pointer-events-none z-20">
            <span className="text-xs font-rethink uppercase tracking-widest text-white/70">Realtors Caspian Film</span>
            <h3 className="text-2xl sm:text-4xl font-bold font-rethink text-white">Lüks Həyat Tərzinizin Ünvanı</h3>
          </div>
        </motion.div>
      </section>

      {/* 
        =========================================================
        FULLSCREEN VIDEO LIGHTBOX MODAL
        =========================================================
      */}
      <AnimatePresence>
        {isVideoLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
          >
            {/* Lightbox Header Bar */}
            <div className="w-full flex items-center justify-between z-10 pt-2 px-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-rethink uppercase tracking-widest text-white/70 font-medium">
                  Realtors Caspian Film • Video Lightbox
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsVideoLightboxOpen(false)}
                className="w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all cursor-pointer text-lg font-bold"
                aria-label="Close Video Lightbox"
              >
                ✕
              </button>
            </div>

            {/* Video Player Embed Display */}
            <div className="relative w-full max-w-5xl aspect-[16/9] mx-auto my-auto border border-white/20 shadow-2xl overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/HxpsCBtbqv8?autoplay=1&rel=0"
                title="Realtors Caspian Film"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        3. TEAM SECTION (Between Video and Photo Gallery)
        =========================================================
      */}
      <section className="w-full py-20 px-6 sm:px-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col text-center items-center">
            <h3
              className="text-[32px] sm:text-[42px] font-bold text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              Peşəkar Komandamız
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="flex flex-col gap-2.5 sm:gap-4 group cursor-pointer">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-200 shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] sm:text-xs font-rethink text-white/90 bg-black/40 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                      {member.experience}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <h4
                    className="text-base sm:text-xl font-bold text-[#171918] group-hover:text-black transition-colors"
                    style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
                  >
                    {member.name}
                  </h4>
                  <span className="text-xs sm:text-sm font-rethink text-gray-500 font-normal">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 
        =========================================================
        3. ULTRA-AESTHETIC ASYMMETRIC GALLERY (Below Video)
        =========================================================
      */}
      <section className="w-full py-20 px-6 sm:px-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex flex-col">
              <h3
                className="text-[32px] sm:text-[42px] font-bold text-[#171918]"
                style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
              >
                Foto Qalereya
              </h3>
            </div>
            <span className="text-xs font-rethink text-gray-400">
              * Tam ölçüdə baxmaq üçün şəkillərə klikləyin
            </span>
          </div>

          {/* Authentic 2-Column Masonry Layout (Pinterest / Editorial Style) */}
          <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className={`break-inside-avoid relative w-full ${img.aspect} overflow-hidden cursor-pointer group bg-gray-900 shadow-md mb-3 sm:mb-6`}
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
                
                {/* Hover Glass Maximize/Expand Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 
        =========================================================
        FULLSCREEN LIGHTBOX MODAL
        =========================================================
      */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-6 select-none"
          >
            <div className="w-full flex items-center justify-between text-white text-sm font-rethink">
              <span>{lightboxIndex + 1} / {GALLERY_IMAGES.length}</span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="text-white text-xl cursor-pointer hover:opacity-75"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-[70vh] flex items-center justify-center my-auto">
              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0
                  )
                }
                className="absolute left-4 z-20 text-white text-3xl p-2 cursor-pointer hover:opacity-75"
              >
                ‹
              </button>

              <div className="relative w-full h-full max-w-4xl">
                <Image
                  src={GALLERY_IMAGES[lightboxIndex].url}
                  alt={GALLERY_IMAGES[lightboxIndex].title}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0
                  )
                }
                className="absolute right-4 z-20 text-white text-3xl p-2 cursor-pointer hover:opacity-75"
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer at Bottom */}
      <Footer />
    </main>
  );
}
