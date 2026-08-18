'use client';

import React from 'react';

interface YouTubeBackgroundProps {
  videoId: string;
  overlayGradient?: string;
}

export default function YouTubeBackground({ videoId, overlayGradient }: YouTubeBackgroundProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1&disablekb=1&fs=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=none&vq=hd1440&hd=1`;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 m-0 p-0 pointer-events-none select-none">
      <div className="relative w-full h-full min-h-full overflow-hidden bg-black">
        {/* Background Image Poster Fallback while iframe loads */}
        <img
          src="/images/hero-bg.png"
          alt="Background Poster"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />
        {/* 
          =========================================================
          OPTIMAL YOUTUBE IFRAME (Balanced 160vw x 160vh Scale)
          =========================================================
        */}
        <iframe
          tabIndex={-1}
          aria-hidden="true"
          src={embedUrl}
          title="Background Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(300vw,534vh)] h-[max(300vh,169vw)] pointer-events-none select-none border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            border: 'none',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

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
