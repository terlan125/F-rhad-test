'use client';

import React from 'react';

interface YouTubeBackgroundProps {
  videoId?: string;
  overlayGradient?: string;
}

export default function YouTubeBackground({ overlayGradient }: YouTubeBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 m-0 p-0 pointer-events-none select-none">
      <div className="relative w-full h-full min-h-full overflow-hidden bg-black">
        {/* Background Image Poster Fallback while video loads */}
        <img
          src="/images/hero-bg.png"
          alt="Background Poster"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />

        {/* Self-hosted background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <source src="https://www.image2url.com/r2/default/videos/1787210694782-39aa49c7-b035-4248-adc6-74f9bd0bef74.mp4" type="video/mp4" />
        </video>

        {/* Şəffaf qat: Edge media overlay-ni bloklayır */}
        <div className="absolute inset-0 z-[5] pointer-events-auto bg-transparent" />

        {/* Dark Gradient Overlay for high contrast text readability */}
        <div
          className={`absolute inset-0 pointer-events-none z-10 ${
            overlayGradient || 'bg-gradient-to-t from-black/90 via-black/45 to-black/20'
          }`}
        />
      </div>
    </div>
  );
}

