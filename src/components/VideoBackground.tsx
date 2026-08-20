'use client';

import React from 'react';

interface VideoBackgroundProps {
  videoUrl?: string;
  overlayGradient?: string;
}

export default function VideoBackground({
  videoUrl = "https://www.image2url.com/r2/default/videos/1787210694782-39aa49c7-b035-4248-adc6-74f9bd0bef74.mp4",
  overlayGradient,
}: VideoBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 m-0 p-0 pointer-events-none select-none">
      <div className="relative w-full h-full min-h-full overflow-hidden bg-black">
        {/* HTML5 Native Local Video element (Zero YouTube UI, Zero Hover Controls, Instant Load) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src={videoUrl}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none border-0"
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
