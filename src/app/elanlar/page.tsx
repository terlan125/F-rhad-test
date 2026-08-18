'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingsSection from '@/components/ListingsSection';
import CtaSection from '@/components/CtaSection';

export default function ElanlarPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="min-h-screen w-full bg-white text-[#171918] relative pt-16 sm:pt-20">
      {/* Top Fixed Navbar */}
      <Navbar />

      {/* Full Listings Section with Filters & Interactive Cards */}
      <ListingsSection />

      {/* Interactive Call To Action Section */}
      <CtaSection />

      {/* Footer at Bottom */}
      <Footer />
    </main>
  );
}
