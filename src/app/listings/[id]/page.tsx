'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getListingById, MOCK_LISTINGS } from '@/data/listings';
import { ListingCard } from '@/components/ListingsSection';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  AreaIcon,
  RenovatedIcon,
  SotIcon,
  RoomIcon,
  MortgageIcon,
  LocationIcon,
  ManatBlackIcon,
  ManatWhiteIcon,
} from '@/components/Icons';

export default function ListingDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(paramsPromise);
  const { t } = useLanguage();
  const listing = getListingById(params.id);

  // Always scroll to top on listing detail page mount or ID change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [params.id]);

  // Gallery & Lightbox States
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const galleryImages = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image];

  // Similar listings filter (matching residenceType or propertyType, excluding current item)
  const similarListings = MOCK_LISTINGS.filter(
    (item) =>
      item.id !== listing.id &&
      (item.residenceType === listing.residenceType || item.propertyType === listing.propertyType)
  );

  const finalSimilarListings =
    similarListings.length >= 3
      ? similarListings.slice(0, 3)
      : MOCK_LISTINGS.filter((item) => item.id !== listing.id).slice(0, 3);

  // Open Lightbox with specified index
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, galleryImages.length]);

  const getLocalizedPropertyType = (type: string) => {
    switch (type) {
      case 'Mənzil':
        return t.listings.propertyTypes.flat;
      case 'Həyət evi/Bağ evi':
        return t.listings.propertyTypes.house;
      case 'Ofis':
        return t.listings.propertyTypes.office;
      case 'Qaraj':
        return t.listings.propertyTypes.garage;
      case 'Obyekt':
        return t.listings.propertyTypes.commercial;
      default:
        return type;
    }
  };

  const getLocalizedResidenceType = (residence: string) => {
    switch (residence) {
      case 'Flats':
        return t.listings.tabs.flats;
      case 'Townhouses':
        return t.listings.tabs.townhouses;
      case 'Penthouses':
        return t.listings.tabs.penthouses;
      default:
        return residence;
    }
  };

  const localizedPropertyType = getLocalizedPropertyType(listing.propertyType);
  const localizedResidenceType = getLocalizedResidenceType(listing.residenceType);

  const categoryLabel =
    listing.residenceType === 'Flats' && listing.propertyType === 'Mənzil'
      ? localizedPropertyType
      : `${localizedResidenceType} • ${localizedPropertyType}`;

  return (
    <main className="min-h-screen w-full bg-white text-[#171918] relative">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* 
        =========================================================
        SECTION 1: 50/50 VERTICAL SPLIT HERO (100vh on Desktop)
        =========================================================
      */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row items-stretch border-b border-gray-100">
        
        {/* 
          LEFT COLUMN: 100vh HERO IMAGE SLIDER (50% Width on Desktop, Flush Slider on Mobile)
        */}
        <div
          onClick={() => openLightbox(activePhotoIndex)}
          className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-screen relative lg:sticky lg:top-0 overflow-hidden bg-gray-900 group cursor-pointer select-none"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activePhotoIndex}
              src={galleryImages[activePhotoIndex]}
              alt={`${listing.title} - Şəkil ${activePhotoIndex + 1}`}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.6, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/images/hero-bg.png';
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Mobile & Desktop Slider Left Arrow Button (Shown when galleryImages > 1) */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-xl"
              aria-label="Əvvəlki şəkil"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Mobile & Desktop Slider Right Arrow Button (Shown when galleryImages > 1) */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev + 1) % galleryImages.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-xl"
              aria-label="Növbəti şəkil"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Bottom bar: Centered Dots + Right-aligned Counter */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center px-4 sm:px-6">
              {/* Centered Slide Indicator Dots */}
              <div className="flex items-center gap-1.5 pointer-events-none">
                {galleryImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activePhotoIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Right-aligned Image Counter (1/6) */}
              <span className="absolute right-4 sm:right-6 bg-black/60 backdrop-blur-md text-white text-xs font-rethink px-3 py-1.5 rounded-full border border-white/20">
                {activePhotoIndex + 1} / {galleryImages.length}
              </span>
            </div>
          )}
        </div>

        {/* 
          RIGHT COLUMN: VERTICALLY CENTERED PROPERTY DETAILS (50% Width)
        */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-16 lg:py-24 bg-white">
          <div className="max-w-xl w-full flex flex-col gap-8">
            
            {/* Title & Price Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Link
                  href="/#elanlar"
                  className="flex items-center justify-center text-gray-400 hover:text-[#171918] transition-colors shrink-0 cursor-pointer"
                  title="Geri qayıt"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </Link>
                <span className="text-xs font-rethink uppercase tracking-widest text-gray-400 font-medium">
                  {categoryLabel}
                </span>
              </div>
              <h1
                className="text-[32px] sm:text-[40px] font-bold leading-[1.15] text-[#171918] mt-[8px] sm:mt-0"
                style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
              >
                {listing.title}
              </h1>

              {/* Price & Location */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[32px] font-medium font-rethink text-[#171918]">
                  <span>{listing.price.toLocaleString()}</span>
                  <ManatBlackIcon />
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 text-[15px] font-rethink">
                  <LocationIcon color="#171918" className="w-4 h-4" />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-gray-100" />

            {/* 
              CHARACTERISTICS GRID (2 COLUMNS: ICON + TEXT)
            */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-rethink text-gray-400 font-medium">
                {t.listings.detail.characteristicsTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                
                {/* 1. Ünvan / Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <LocationIcon color="#171918" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.location}</span>
                    <span className="text-[15px] font-medium font-rethink text-[#171918]">{listing.location}</span>
                  </div>
                </div>

                {/* 2. Sahə / Area */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <AreaIcon color="#171918" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.area}</span>
                    <span className="text-[15px] font-medium font-rethink text-[#171918]">{listing.areaSize} m²</span>
                  </div>
                </div>

                {/* 3. Otaq sayı / Rooms */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <RoomIcon color="#171918" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.rooms}</span>
                    <span className="text-[15px] font-medium font-rethink text-[#171918]">{listing.rooms} otaq</span>
                  </div>
                </div>

                {/* 4. Mərtəbə / Floor */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <HomeIcon color="#171918" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.floor}</span>
                    <span className="text-[15px] font-medium font-rethink text-[#171918]">
                      {listing.floor} / {listing.totalFloors}
                    </span>
                  </div>
                </div>

                {/* 5. Təmir vəziyyəti / Renovation */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <RenovatedIcon color="#171918" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.renovation}</span>
                    <span className="text-[15px] font-medium font-rethink text-[#171918]">
                      {listing.isRenovated ? t.listings.detail.labels.renovatedYes : t.listings.detail.labels.renovatedNo}
                    </span>
                  </div>
                </div>

                {/* 6. İpoteka / Mortgage */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <MortgageIcon color="#171918" className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.mortgage}</span>
                    <span className="text-[15px] font-medium font-rethink text-[#171918]">
                      {listing.hasMortgage ? t.listings.detail.labels.yes : t.listings.detail.labels.no}
                    </span>
                  </div>
                </div>

                {/* 7. Torpaq sahəsi (sot) if present */}
                {listing.landArea && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                      <SotIcon color="#171918" className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-rethink">{t.listings.detail.labels.landArea}</span>
                      <span className="text-[15px] font-medium font-rethink text-[#171918]">{listing.landArea}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* CONTACT BUTTON */}
            <div className="pt-2">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full cursor-pointer bg-[#171918] text-white hover:bg-black py-4 px-8 font-rethink text-[16px] font-medium transition-all shadow-lg hover:shadow-xl rounded-none text-center flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{t.listings.detail.contactBtn}</span>
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* 
        =========================================================
        SECTION 2: DETAILED DESCRIPTION & PHOTO GALLERY
        =========================================================
      */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-12 flex flex-col gap-10">
        
        {/* DETAILED DESCRIPTION BLOCK */}
        <div className="flex flex-col gap-4 max-w-4xl border-b border-gray-100 pb-12">
          <h2
            className="text-[28px] sm:text-[34px] font-bold text-[#171918]"
            style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
          >
            {t.listings.detail.descriptionTitle}
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-relaxed text-gray-700 font-rethink font-light">
            {listing.description}
          </p>
        </div>

        {/* PHOTO GALLERY CAROUSEL */}
        <div className="flex flex-col gap-4 sm:gap-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-gray-100 pb-3 sm:pb-6">
            <h2
              className="text-[32px] sm:text-[38px] font-bold text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              {t.listings.detail.galleryTitle}
            </h2>

            <div className="text-xs font-rethink text-gray-400">
              {galleryImages.length} photo items
            </div>
          </div>

        {/* Carousel & Main Photo Grid View */}
        <div className="flex flex-col gap-2 sm:gap-6">
          {/* Main Large Carousel Photo */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 overflow-hidden group cursor-pointer">
            <img
              src={galleryImages[activePhotoIndex]}
              alt={`${listing.title} gallery photo ${activePhotoIndex + 1}`}
              referrerPolicy="no-referrer"
              onClick={() => openLightbox(activePhotoIndex)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Left & Right Slide Controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer z-10"
                >
                  ❮
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex((prev) => (prev + 1) % galleryImages.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer z-10"
                >
                  ❯
                </button>
              </>
            )}

            {/* Expand / Lightbox overlay trigger icon */}
            <div
              onClick={() => openLightbox(activePhotoIndex)}
              className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
            >
              <div className="bg-white/90 backdrop-blur-md text-[#171918] px-5 py-3 font-rethink text-sm font-medium shadow-2xl flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Full screen</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-4">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePhotoIndex(idx);
                  openLightbox(idx);
                }}
                className={`relative aspect-[4/3] overflow-hidden cursor-pointer transition-all ${
                  activePhotoIndex === idx
                    ? 'ring-2 ring-[#171918] opacity-100 scale-[1.02]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* 
        =========================================================
        SECTION 3: OXŞAR ELANLAR (SIMILAR LISTINGS SECTION)
        =========================================================
      */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-8 sm:py-16 border-t border-gray-100 flex flex-col gap-5 sm:gap-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-gray-100 pb-3 sm:pb-6">
          <div>
            <h2
              className="text-[28px] sm:text-[36px] font-bold text-[#171918]"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              {t.listings.detail.similarTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
          {finalSimilarListings.map((item) => (
            <ListingCard key={item.id} listing={item} t={t} />
          ))}
        </div>
      </section>

      {/* 
        =========================================================
        FULLSCREEN LIGHTBOX MODAL PREVIEW
        =========================================================
      */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar: Counter & Close Button */}
            <div className="w-full flex items-center justify-between z-20 text-white font-rethink">
              <div className="text-sm font-light text-white/80">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>

              <div className="text-sm font-medium text-white/90 max-w-md truncate hidden sm:block">
                {listing.title}
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="cursor-pointer text-white/80 hover:text-white p-2 text-2xl transition-colors"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Main Centered Photo in Lightbox */}
            <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={galleryImages[lightboxIndex]}
                  alt={`${listing.title} full photo ${lightboxIndex + 1}`}
                  className="max-h-[82vh] max-w-[92vw] object-contain select-none shadow-2xl"
                />
              </AnimatePresence>

              {/* Prev / Next Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition-all cursor-pointer z-30"
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition-all cursor-pointer z-30"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            {/* Bottom Lightbox Thumbnail Strip */}
            <div className="w-full flex items-center justify-center gap-3 overflow-x-auto py-2 z-20">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-16 h-12 shrink-0 overflow-hidden transition-all cursor-pointer ${
                    lightboxIndex === idx ? 'ring-2 ring-white scale-105 opacity-100' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        QUICK CONTACT MODAL / DRAWER
        =========================================================
      */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsContactModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-md w-full p-8 shadow-2xl flex flex-col gap-6 font-rethink text-[#171918]"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-medium font-rethink" style={{ fontFamily: '"Rethink Sans", sans-serif' }}>Realtors Caspian</h3>
                <button onClick={() => setIsContactModalOpen(false)} className="text-gray-400 hover:text-black">
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-600">
                  Bu əmlak haqqında ətraflı məlumat almaq və ya baxış təyin etmək üçün bizimlə birbaşa əlaqə saxlayın:
                </p>

                <a
                  href="tel:+994518004404"
                  className="w-full py-3.5 px-6 bg-[#171918] text-white hover:bg-black font-medium text-center flex items-center justify-center gap-3 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+994(51)800-44-04</span>
                </a>

                <a
                  href="mailto:farhad@realtorscaspian.az"
                  className="w-full py-3.5 px-6 border border-[#171918] text-[#171918] hover:bg-gray-50 font-medium text-center flex items-center justify-center gap-3 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>farhad@realtorscaspian.az</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        FOOTER AT BOTTOM
        =========================================================
      */}
      <Footer />
    </main>
  );
}
