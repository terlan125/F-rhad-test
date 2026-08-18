'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import YouTubeBackground from '@/components/YouTubeBackground';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ElaqePage() {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen w-full bg-white text-[#171918] relative overflow-hidden">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* 
        =========================================================
        EDITORIAL 50/50 SPLIT CREATIVE CONTACT SECTION
        =========================================================
      */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row items-stretch border-b border-gray-100">
        
        {/* 
          LEFT COLUMN: CINEMATIC VIDEO & EDITORIAL BRAND STATEMENT (50% Width on Desktop, 2nd on Mobile)
        */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 relative bg-black flex flex-col justify-end p-8 sm:p-16 text-white overflow-hidden group order-2 lg:order-1">
          {/* Ambient Video Background */}
          <YouTubeBackground videoId="HxpsCBtbqv8" overlayGradient="bg-black/65" />

          {/* Bottom Direct Contact Chips */}
          <div className="z-10 flex flex-wrap items-center gap-3 pt-6 border-t border-white/15">
            <a
              href="tel:+994518004404"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-rethink transition-all border border-white/15 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+994(51)800-44-04</span>
            </a>

            <a
              href="mailto:farhad@realtorscaspian.az"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-rethink transition-all border border-white/15 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>farhad@realtorscaspian.az</span>
            </a>

            <span className="text-xs font-rethink text-white/50 py-1 ml-auto">
              Bakı, Azərbaycan
            </span>
          </div>
        </div>

        {/* 
          RIGHT COLUMN: MINIMALIST CREATIVE SINGLE-INPUT FORM (50% Width on Desktop, 1st on Mobile)
        */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-[16px] py-8 sm:p-14 lg:p-20 bg-white order-1 lg:order-2 mt-[44px] lg:mt-0 pt-[96px] sm:pt-36 lg:pt-20">
          <div className="max-w-xl w-full flex flex-col gap-8">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8"
                >
                  {/* Header Title */}
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
                    <h1
                      className="text-[34px] sm:text-[42px] font-bold text-[#171918] leading-[1.15]"
                      style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
                    >
                      Nömrənizi qeyd edin, biz sizinlə əlaqəyə keçək
                    </h1>
                    
                    <p className="text-gray-500 font-rethink text-[15px] font-light leading-relaxed max-w-lg">
                      Ehtiyacınıza ən uyğun mənzili seçmək və ya məsləhətləşmə almaq üçün telefon nömrənizi qeyd edin. Menecerimiz qısa zamanda zəng edəcək.
                    </p>
                  </div>

                  {/* SINGLE PHONE INPUT & SUBMIT FORM */}
                  <form onSubmit={handleSubmit} className="w-full flex flex-col items-center lg:items-start gap-5 pt-2">
                    <div className="flex flex-col items-center lg:items-start gap-2 w-full">
                      <label className="text-xs font-rethink text-gray-500 font-medium text-center lg:text-left">
                        Əlaqə Nömrəsi
                      </label>
                      
                      <div className="relative w-full">
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+994 (51) 800-44-04"
                          className="w-full bg-gray-50 border border-gray-200 text-[#171918] placeholder-gray-400 px-5 py-4 text-[16px] font-rethink outline-none focus:border-[#171918] focus:bg-white transition-all rounded-none text-center lg:text-left"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cursor-pointer bg-[#171918] hover:bg-black text-white py-4 px-8 font-rethink text-[16px] font-medium transition-all shadow-lg hover:shadow-xl rounded-none text-center flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Zəng sifariş et</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Direct Phone Support Footer Hint */}
                  <div className="w-full pt-2 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-between gap-3 text-xs text-gray-400 font-rethink">
                    <span>Müştəri dəstəyi 24/7</span>
                    <a href="tel:+994518004404" className="text-[#171918] hover:underline font-medium">
                      +994(51)800-44-04
                    </a>
                  </div>

                </motion.div>
              ) : (
                /* SUCCESS STATE CARD */
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center gap-6 py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 text-3xl font-bold">
                    ✓
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3
                      className="text-[28px] font-bold text-[#171918]"
                      style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
                    >
                      Müraciətiniz qəbul olundu!
                    </h3>
                    <p className="text-gray-600 font-rethink font-light text-[15px] leading-relaxed max-w-sm">
                      Təşəkkür edirik. Menecerimiz dərhal <span className="font-semibold text-[#171918]">{phoneNumber}</span> nömrəniz ilə əlaqə saxlayacaq.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setPhoneNumber('');
                    }}
                    className="mt-4 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#171918] text-xs font-rethink font-medium transition-colors rounded-none"
                  >
                    Yenidən nömrə göndər
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </section>
    </main>
  );
}
