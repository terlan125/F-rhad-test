'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientWaves from './GradientWaves';
import { useLanguage } from '@/context/LanguageContext';

export default function CtaSection() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full py-6 sm:py-24 md:py-32 px-4 sm:px-6 bg-white text-[#171918] flex items-center justify-center">
      {/* Centered Minimal Luxury Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(2px)' }}
        className="relative w-full max-w-4xl text-white rounded-none p-5 sm:p-14 md:p-20 text-center shadow-2xl overflow-hidden min-h-[250px] sm:min-h-[380px] flex flex-col justify-center items-center"
      >
        {/* React Bits GradientWaves WebGL Background */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <GradientWaves
            horizonColor="#0a0a0a"
            waveColor="#ffffff"
            crestColor="#000000"
            speed={0.08}
            amplitude={2.3}
            waveScale={2.2}
            waveRatio={0.3}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1.4}
            opacity={0.65}
            mouseInteraction={true}
            parallaxStrength={0.5}
            grain={true}
            grainIntensity={0.05}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-8 w-full">
          
          {/* Title & Subtitle Container */}
          <div className="flex flex-col gap-1.5 items-center max-w-2xl">
            <h2
              className="text-xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md"
              style={{ fontFamily: '"Rethink Sans", sans-serif', fontWeight: 700 }}
            >
              {t.cta.title}
            </h2>
            <p className="text-white/80 font-rethink text-xs sm:text-lg font-light leading-relaxed drop-shadow">
              {t.cta.subtitle}
            </p>
          </div>

          {/* Input & Send Button Form */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="cta-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="relative w-full max-w-md sm:max-w-lg mt-1 sm:mt-2 z-20 flex items-center"
              >
                {/* Phone Icon on Left */}
                <div className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 text-white pointer-events-none z-10 scale-90 sm:scale-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>

                {/* Input Field */}
                <input
                  type="tel"
                  required
                  placeholder="+994 (50) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-12 sm:pr-16 py-2.5 sm:py-4 rounded-none bg-transparent border border-white/60 text-white placeholder-white/70 font-medium focus:outline-none focus:border-white transition-all text-xs sm:text-base font-rethink"
                />

                {/* Embedded Send Icon Button on Right */}
                <button
                  type="submit"
                  aria-label="Göndər"
                  className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2.5 text-white hover:text-white/80 transition-colors z-20 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="cta-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-8 py-4 rounded-none bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-rethink text-base font-medium shadow-2xl"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{t.cta.successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </section>
  );
}
