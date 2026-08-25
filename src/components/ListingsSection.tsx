'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Listing, MOCK_LISTINGS } from '@/data/listings';
import { useLanguage } from '@/context/LanguageContext';
import {
  HomeIcon,
  AreaIcon,
  RenovatedIcon,
  SotIcon,
  RoomIcon,
  MortgageIcon,
  LocationIcon,
  ManatWhiteIcon,
  ManatBlackIcon,
} from '@/components/Icons';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}

function DualRangeSlider({ min, max, step, minVal, maxVal, onChange }: DualRangeSliderProps) {
  const minPercent = Math.min(100, Math.max(0, ((minVal - min) / (max - min)) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((maxVal - min) / (max - min)) * 100));

  return (
    <div className="relative w-full h-5 flex items-center select-none">
      {/* Background Track Bar */}
      <div className="relative w-full h-1 bg-gray-200 rounded-full">
        {/* Active Range Bar */}
        <div
          className="absolute h-full bg-[#171918] rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
      </div>

      {/* Left Circle Thumb Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const val = Math.min(Number(e.target.value), maxVal - step);
          onChange(val, maxVal);
        }}
        className="thumb thumb--left absolute inset-x-0 w-full h-1 appearance-none bg-transparent pointer-events-none z-20 cursor-pointer"
      />

      {/* Right Circle Thumb Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const val = Math.max(Number(e.target.value), minVal + step);
          onChange(minVal, val);
        }}
        className="thumb thumb--right absolute inset-x-0 w-full h-1 appearance-none bg-transparent pointer-events-none z-30 cursor-pointer"
      />
    </div>
  );
}

function CollapsibleToggleGroup({
  items,
  selectedId,
  selectedIds,
  onSelect,
  limit = 3,
  viewMoreLabel,
  viewLessLabel,
}: {
  items: { id: string; label: string }[];
  selectedId?: string | null;
  selectedIds?: string[];
  onSelect: (id: string) => void;
  limit?: number;
  viewMoreLabel: string;
  viewLessLabel: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = items.length > limit;

  return (
    <div className="relative w-full overflow-visible min-h-[44px]">
      {/* Scrollable / Clipped / Wrapped Toggle Container */}
      <div
        className={`flex items-center gap-2 py-0.5 transition-all duration-300 ${
          isExpanded 
            ? 'flex-wrap w-full' 
            : 'flex-nowrap overflow-x-hidden w-[calc(100%-85px)] pr-8'
        }`}
        style={!isExpanded ? {
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)',
        } : undefined}
      >
        {items.map((item, idx) => {
          const isActive = selectedIds 
            ? (item.id === 'All' ? selectedIds.length === 0 : selectedIds.includes(item.id))
            : selectedId === item.id;

          // When collapsed, hide items past the limit
          if (!isExpanded && idx >= limit) return null;
          
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`cursor-pointer transition-all duration-200 px-5 py-2.5 rounded-full text-[14px] shrink-0 ${
                isActive
                  ? 'border border-[#171918] bg-white text-[#171918] font-medium shadow-sm'
                  : 'border border-transparent text-gray-600 hover:text-black hover:border-gray-200'
              }`}
              style={{
                fontFamily: '"Rethink Sans", sans-serif',
                height: '40px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          );
        })}

        {/* When Expanded, "Gizlət" flows inline so it wraps down to a new line if content fills the row */}
        {hasMore && isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="cursor-pointer text-[13px] font-rethink font-medium text-gray-700 hover:text-black bg-transparent px-3 py-2 shrink-0 whitespace-nowrap ml-auto sm:ml-0"
            style={{
              height: '40px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {`- ${viewLessLabel}`}
          </button>
        )}
      </div>

      {/* When Collapsed, "+ Daha çox" stays pinned at far right */}
      {hasMore && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-[13px] font-rethink font-medium text-gray-800 hover:text-black bg-transparent px-2 py-1.5 z-10 whitespace-nowrap"
          style={{
            height: '36px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {`+ ${viewMoreLabel}`}
        </button>
      )}
    </div>
  );
}

export default function ListingsSection() {
  const { t } = useLanguage();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedResidence, setSelectedResidence] = useState<'All' | 'Flats' | 'Townhouses' | 'Penthouses'>('All');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'lowest' | 'highest' | 'newest'>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Range Slider States
  const [minPrice, setMinPrice] = useState<number>(30000);
  const [maxPrice, setMaxPrice] = useState<number>(2000000);

  const [minArea, setMinArea] = useState<number>(45);
  const [maxArea, setMaxArea] = useState<number>(300);

  const [minFloor, setMinFloor] = useState<number>(1);
  const [maxFloor, setMaxFloor] = useState<number>(50);

  // Tablet / Mobile Right-to-Left Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Multi-select Property Type Toggle Handler
  const handlePropertyTypeSelect = (typeId: string) => {
    if (typeId === 'All') {
      setSelectedPropertyTypes([]);
    } else {
      setSelectedPropertyTypes((prev) =>
        prev.includes(typeId)
          ? prev.filter((id) => id !== typeId)
          : [...prev, typeId]
      );
    }
    scrollToListings();
  };

  // Multi-select Feature Toggle Handler
  const handleFeatureSelect = (featureId: string) => {
    if (featureId === 'All') {
      setSelectedFeatures([]);
    } else {
      setSelectedFeatures((prev) =>
        prev.includes(featureId)
          ? prev.filter((id) => id !== featureId)
          : [...prev, featureId]
      );
    }
    scrollToListings();
  };

  // Check if any filter is currently applied
  const isAnyFilterActive = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedResidence !== 'All' ||
      selectedRoom !== null ||
      selectedPropertyTypes.length > 0 ||
      selectedFeatures.length > 0 ||
      minPrice !== 30000 ||
      maxPrice !== 2000000 ||
      minArea !== 45 ||
      maxArea !== 300 ||
      minFloor !== 1 ||
      maxFloor !== 50
    );
  }, [
    searchQuery,
    selectedResidence,
    selectedRoom,
    selectedPropertyTypes,
    selectedFeatures,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    minFloor,
    maxFloor,
  ]);

  const sectionRef = useRef<HTMLElement>(null);

  const scrollToListings = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const el = document.getElementById('elanlar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Reset All Filters function
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedResidence('All');
    setSelectedRoom(null);
    setSelectedPropertyTypes([]);
    setSelectedFeatures([]);
    setMinPrice(30000);
    setMaxPrice(2000000);
    setMinArea(45);
    setMaxArea(300);
    setMinFloor(1);
    setMaxFloor(50);
    scrollToListings();
  };

  // Pagination & Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const gridBottomRef = useRef<HTMLDivElement>(null);

  // Helper function to match a single feature
  const matchSingleFeature = (item: Listing, featureId: string) => {
    const fLower = featureId.toLowerCase();
    
    return item.title.toLowerCase().includes(fLower) || 
           item.features.some(f => f.toLowerCase().includes(fLower)) ||
           (fLower === 'dəniz mənzərəsi' && (
             item.title.toLowerCase().includes('dəniz') || 
             item.features.some(f => f.toLowerCase().includes('dəniz') || f.toLowerCase().includes('bulvar') || f.toLowerCase().includes('panorama'))
           )) ||
           (fLower === 'terras' && (
             item.title.toLowerCase().includes('terrace') || 
             item.features.some(f => f.toLowerCase().includes('terrace') || f.toLowerCase().includes('terassa') || f.toLowerCase().includes('terrace'))
           ));
  };

  // Helper function to match all selected features
  const matchFeatures = (item: Listing, features: string[]) => {
    if (features.length === 0) return true;
    return features.every((fId) => matchSingleFeature(item, fId));
  };

  const getNumericId = (id: string) => {
    const match = id.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Filter listings dynamically
  const filteredListings = MOCK_LISTINGS.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.title.toLowerCase().includes(q);
      const locMatch = item.location.toLowerCase().includes(q);
      const propMatch = item.propertyType.toLowerCase().includes(q);
      const resMatch = item.residenceType.toLowerCase().includes(q);
      if (!titleMatch && !locMatch && !propMatch && !resMatch) return false;
    }
    if (selectedResidence !== 'All' && item.residenceType !== selectedResidence) return false;
    if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes(item.propertyType)) return false;
    if (selectedRoom !== null && item.rooms !== selectedRoom) return false;
    if (!matchFeatures(item, selectedFeatures)) return false;
    if (item.price < minPrice || item.price > maxPrice) return false;
    if (item.areaSize < minArea || item.areaSize > maxArea) return false;
    if (item.floor < minFloor || item.floor > maxFloor) return false;
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'lowest') return a.price - b.price;
    if (sortOrder === 'highest') return b.price - a.price;
    if (sortOrder === 'newest') return getNumericId(b.id) - getNumericId(a.id);
    return 0;
  });

  // Reset visible count to 6 whenever filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [
    searchQuery,
    selectedResidence,
    selectedPropertyTypes,
    selectedRoom,
    selectedFeatures,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    minFloor,
    maxFloor,
    sortOrder,
  ]);

  const displayedListings = filteredListings.slice(0, visibleCount);

  const residenceTabs = [
    { id: 'All', label: t.listings.tabs.all },
    { id: 'Flats', label: t.listings.tabs.flats },
    { id: 'Townhouses', label: t.listings.tabs.townhouses },
    { id: 'Penthouses', label: t.listings.tabs.penthouses },
  ];

  const propertyTypes = [
    { id: 'All', label: t.listings.propertyTypes.all },
    { id: 'Mənzil', label: t.listings.propertyTypes.flat },
    { id: 'Həyət evi/Bağ evi', label: t.listings.propertyTypes.house },
    { id: 'Ofis', label: t.listings.propertyTypes.office },
    { id: 'Qaraj', label: t.listings.propertyTypes.garage },
    { id: 'Obyekt', label: t.listings.propertyTypes.commercial },
  ];

  const featuresList = [
    { id: 'All', label: t.listings.tabs.all },
    { id: 'Balkon', label: t.listings.featuresFilter.balcony },
    { id: 'Hovuz', label: t.listings.featuresFilter.pool },
    { id: 'Terras', label: t.listings.featuresFilter.terrace },
    { id: 'Dəniz mənzərəsi', label: t.listings.featuresFilter.seaView },
    { id: 'Kombi', label: t.listings.featuresFilter.combi },
    { id: 'Qaraj', label: t.listings.featuresFilter.garage },
  ];

  const renderFilterControls = () => (
    <>
      {/* Search Input Filter */}
      <div className="flex flex-col gap-2 w-full max-w-[428px]">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              scrollToListings();
            }}
            placeholder={t.listings.searchPlaceholder}
            className="w-full bg-transparent border-b border-gray-200 text-[#171918] placeholder:text-gray-400 placeholder:font-light text-[15px] font-rethink py-2.5 pr-9 outline-none focus:border-[#171918] transition-all rounded-none"
            style={{
              fontFamily: '"Rethink Sans", sans-serif',
            }}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer text-xs p-1 transition-colors"
            >
              ✕
            </button>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#171918"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-70"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </div>
      </div>

      {/* Rooms Multitoggle Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-rethink text-gray-500 font-medium uppercase tracking-wider">
          {t.listings.roomsLabel}
        </label>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((roomNum) => {
            const isActive = selectedRoom === roomNum;
            return (
              <button
                key={roomNum}
                onClick={() => {
                  setSelectedRoom(isActive ? null : roomNum);
                  scrollToListings();
                }}
                className={`w-11 h-11 flex items-center justify-center cursor-pointer transition-all rounded-full ${
                  isActive
                    ? 'border border-[#171918] bg-white text-[#171918] font-medium shadow-sm'
                    : 'text-gray-600 hover:text-black border border-transparent'
                }`}
              >
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
                  {roomNum === 5 ? '5+' : roomNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RANGE SLIDERS */}
      <div className="flex flex-col gap-5 w-full max-w-[428px]">
        {/* 1. Price Range Capsule Slider */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full border border-[#171918] rounded-full flex items-center justify-between" style={{ padding: '13px 22px', backgroundColor: '#FFF' }}>
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
                {minPrice.toLocaleString()}
              </span>
              <ManatBlackIcon />
            </div>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
                {maxPrice.toLocaleString()}
              </span>
              <ManatBlackIcon />
            </div>
          </div>
          <div className="px-3">
            <DualRangeSlider
              min={50000}
              max={2000000}
              step={10000}
              minVal={minPrice}
              maxVal={maxPrice}
              onChange={(minVal, maxVal) => {
                setMinPrice(minVal);
                setMaxPrice(maxVal);
              }}
            />
          </div>
        </div>

        {/* 2. Area Range Capsule Slider */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full border border-[#171918] rounded-full flex items-center justify-between" style={{ padding: '13px 22px', backgroundColor: '#FFF' }}>
            <span style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
              {minArea} m²
            </span>
            <span className="text-gray-400">|</span>
            <span style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
              {maxArea} m²
            </span>
          </div>
          <div className="px-3">
            <DualRangeSlider
              min={30}
              max={500}
              step={5}
              minVal={minArea}
              maxVal={maxArea}
              onChange={(minVal, maxVal) => {
                setMinArea(minVal);
                setMaxArea(maxVal);
              }}
            />
          </div>
        </div>

        {/* 3. Floor Range Capsule Slider */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full border border-[#171918] rounded-full flex items-center justify-between" style={{ padding: '13px 22px', backgroundColor: '#FFF' }}>
            <span style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
              {minFloor} {t.listings.floorLabel}
            </span>
            <span className="text-gray-400">|</span>
            <span style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px' }}>
              {maxFloor} {t.listings.floorLabel}
            </span>
          </div>
          <div className="px-3">
            <DualRangeSlider
              min={1}
              max={50}
              step={1}
              minVal={minFloor}
              maxVal={maxFloor}
              onChange={(minVal, maxVal) => {
                setMinFloor(minVal);
                setMaxFloor(maxVal);
              }}
            />
          </div>
        </div>
      </div>

      {/* Property Type Multitoggle */}
      <div className="flex flex-col gap-3 mt-2">
        <h3 style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px', fontWeight: 600 }}>
          {t.listings.propertyTypeTitle}
        </h3>
        <CollapsibleToggleGroup
          items={propertyTypes}
          selectedIds={selectedPropertyTypes}
          onSelect={handlePropertyTypeSelect}
          limit={3}
          viewMoreLabel={t.listings.viewMore}
          viewLessLabel={t.listings.viewLess}
        />
      </div>

      {/* Features Multitoggle Filter */}
      <div className="flex flex-col gap-3">
        <h3 style={{ color: '#171918', fontFamily: '"Rethink Sans", sans-serif', fontSize: '16px', fontWeight: 600 }}>
          {t.listings.featuresFilter.title}
        </h3>
        <CollapsibleToggleGroup
          items={featuresList}
          selectedIds={selectedFeatures}
          onSelect={handleFeatureSelect}
          limit={3}
          viewMoreLabel={t.listings.viewMore}
          viewLessLabel={t.listings.viewLess}
        />
      </div>
    </>
  );

  return (
    <section id="elanlar" ref={sectionRef} className="w-full pt-[60px] pb-0 px-4 lg:px-[60px] text-[#171918]">
      {/* 
        MOBILE & TABLET TOP HEADER WITH FILTRLƏR BUTTON
      */}
      <div className="lg:hidden w-full flex flex-col gap-4 border-b border-gray-100 pb-4 mb-6">
        <h2
          className="font-rethink text-[#444] text-[28px] sm:text-[34px] font-normal leading-normal"
          style={{ fontFamily: '"Rethink Sans", sans-serif' }}
        >
          {t.listings.title}
        </h2>

        <div className="flex items-center justify-between gap-4">
          {/* Sort Dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span style={{ color: '#444', fontFamily: '"Rethink Sans", sans-serif', fontSize: '14px', fontWeight: 400 }}>
                {sortOrder === 'lowest' ? t.listings.sortLowest : sortOrder === 'highest' ? t.listings.sortHighest : t.listings.sortNewest}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
              >
                <path d="M12 6L8 10L4 6" stroke="#444444" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-2"
                >
                  <button onClick={() => { setSortOrder('lowest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-rethink">
                    {t.listings.sortLowest}
                  </button>
                  <button onClick={() => { setSortOrder('highest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-rethink">
                    {t.listings.sortHighest}
                  </button>
                  <button onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-rethink">
                    {t.listings.sortNewest}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right-to-Left Slide Drawer Open Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#171918] text-white text-xs font-rethink font-medium rounded-none shadow-md cursor-pointer hover:bg-black transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <span>Filtrlər</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start min-h-[500px] sm:min-h-[650px] lg:min-h-[850px]">
        
        {/* 
          =========================================================
          DESKTOP LEFT COLUMN: STICKY FILTERS SIDEBAR (hidden on mobile/tablet)
          =========================================================
        */}
        <div className="hidden lg:flex w-[420px] shrink-0 sticky top-[40px] self-start flex-col gap-6 py-2">
          
          {/* Header & Sort Dropdown Div */}
          <div className="flex flex-col gap-[16px] border-b border-gray-100 pb-[12px]">
            <h2
              className="font-rethink text-[#444] text-[36px] font-normal leading-normal"
              style={{
                color: '#444',
                fontFamily: '"Rethink Sans", sans-serif',
                fontSize: '36px',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {t.listings.title}
            </h2>

            {/* Dropdown (Lowest price) */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span style={{ color: '#444', fontFamily: '"Rethink Sans", sans-serif', fontSize: '14px', fontWeight: 400 }}>
                  {sortOrder === 'lowest' ? t.listings.sortLowest : sortOrder === 'highest' ? t.listings.sortHighest : t.listings.sortNewest}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M12 6L8 10L4 6" stroke="#444444" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-2"
                  >
                    <button onClick={() => { setSortOrder('lowest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-rethink">
                      {t.listings.sortLowest}
                    </button>
                    <button onClick={() => { setSortOrder('highest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-rethink">
                      {t.listings.sortHighest}
                    </button>
                    <button onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-rethink">
                      {t.listings.sortNewest}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lower Filters Container Div */}
          <div className="flex flex-col gap-6 pt-2">
            {renderFilterControls()}
          </div>
        </div>

        {/* 
          =========================================================
          RIGHT-TO-LEFT SLIDE-OVER DRAWER (PORTAL TO DOCUMENT.BODY)
          =========================================================
        */}
        {isMounted && createPortal(
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                {/* Dark Backdrop Overlay (Higher than Navbar via document.body Portal) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999999] lg:hidden cursor-pointer"
                />

                {/* Slide-over Drawer Panel (Higher than Navbar via document.body Portal) */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white text-[#171918] z-[999999] lg:hidden shadow-2xl flex flex-col justify-between overflow-hidden rounded-none"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                      </svg>
                      <h3 className="font-rethink font-bold text-lg text-[#171918]">Filtrlər</h3>
                    </div>

                    <div className="flex items-center gap-4">
                      {isAnyFilterActive && (
                        <button
                          onClick={resetFilters}
                          className="text-xs font-rethink font-medium text-gray-500 hover:text-black transition-colors underline cursor-pointer"
                        >
                          Sıfırla
                        </button>
                      )}
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        aria-label="Bağla"
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer rounded-none"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Drawer Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                    {renderFilterControls()}
                  </div>

                  {/* Drawer Footer Action Buttons */}
                  <div className="p-5 border-t border-gray-100 bg-white flex items-center gap-3">
                    {isAnyFilterActive && (
                      <button
                        onClick={resetFilters}
                        className="w-1/3 py-3.5 border border-gray-300 text-[#171918] font-rethink font-medium text-sm text-center rounded-none hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        Sıfırla
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileFilterOpen(false);
                        scrollToListings();
                      }}
                      className={`${isAnyFilterActive ? 'w-2/3' : 'w-full'} py-3.5 bg-[#171918] text-white font-rethink font-bold text-sm text-center rounded-none shadow-lg cursor-pointer hover:bg-black transition-all`}
                    >
                      Tətbiq Et
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* 
          =========================================================
          RIGHT COLUMN: PROPERTY CARDS GRID (2 Columns)
          =========================================================
        */}
        <div className="flex-1 w-full flex flex-col gap-8 min-h-[450px] sm:min-h-[600px] lg:min-h-[750px]">
          
          {/* Listings Grid (2 columns on mobile, tablet & desktop) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 w-full">
            {displayedListings.length > 0 ? (
              displayedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} t={t} />
              ))
            ) : (
              <div className="col-span-2 py-16 flex flex-col items-center justify-center text-center gap-3 bg-gray-50 border border-dashed border-gray-200 rounded-2xl my-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="font-rethink text-gray-600 text-sm sm:text-base font-medium">
                  Axtarışınıza uyğun elan tapılmadı
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-1 px-5 py-2 bg-[#171918] text-white text-xs sm:text-sm font-rethink font-medium rounded-full hover:bg-black transition-all cursor-pointer"
                >
                  Filtrləri Sıfırla
                </button>
              </div>
            )}
          </div>

          {/* "Daha çox göstər" (Load More) Button / Infinite Scroll Trigger */}
          {visibleCount < filteredListings.length && (
            <div ref={gridBottomRef} className="w-full flex items-center justify-center pt-2 pb-2">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredListings.length))}
                className="px-8 py-3 bg-[#171918] text-white text-xs sm:text-sm font-rethink font-medium rounded-full hover:bg-black transition-all cursor-pointer shadow-md active:scale-95"
              >
                {t.listings.viewMore}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

{/* Individual Property Card Component with Frame 60 Mouse-Following Badge */}
export function ListingCard({ listing, t }: { listing: Listing; t: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // High-performance hardware-accelerated motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, slightly delayed/lagged spring animation settings (stiffness: 120, damping: 20)
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Positioned at the bottom-right of the mouse cursor with a 15px gap
    x.set(e.clientX - rect.left + 15);
    y.set(e.clientY - rect.top + 15);
  };

  return (
    <Link href={`/listings/${listing.id}`} className="block text-inherit no-underline">
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col gap-3 cursor-pointer overflow-visible"
      >
        {/* Frame 60 Mouse-Following Badge */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                x: springX,
                y: springY,
                width: '100px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '0px',
                border: 'none',
                pointerEvents: 'none',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.listings.card.badge}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Image Container (1:1 Aspect Ratio) */}
        <div className="relative w-full aspect-square rounded-none overflow-hidden bg-gray-100">
          <img
            src={listing.image}
            alt={listing.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Sağ-aşağı qaranlıq gradient (qiymət oxunaqlılığı üçün) */}
          <div
            className="absolute bottom-0 right-0 w-2/3 h-1/3 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,0.55) 0%, transparent 70%)',
            }}
          />

          {/* Default Price Tag (Visible when NOT hovered - Scaled for 2-column mobile/tablet grid) */}
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 flex items-center gap-0 sm:gap-1.5 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
            <span
              className="text-[14px] sm:text-[20px] lg:text-[24px]"
              style={{
                color: '#FFF',
                fontFamily: '"Rethink Sans", sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              {listing.price.toLocaleString()}
            </span>
            <div className="scale-75 sm:scale-90 lg:scale-100 origin-right drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              <ManatWhiteIcon />
            </div>
          </div>

          {/* Glassmorphism Dark Overlay (Fades in on Hover) */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-between"
            style={{
              background: 'rgba(0, 0, 0, 0.40)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            {/* Top Characteristics List */}
            <div className="flex flex-col gap-2.5">
              
              {/* 1. Property Type */}
              <div className="flex items-center gap-3">
                <HomeIcon color="white" className="w-5 h-5 shrink-0" />
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  {listing.propertyType}
                </span>
              </div>

              {/* 2. Area Size */}
              <div className="flex items-center gap-3">
                <AreaIcon color="white" className="w-5 h-5 shrink-0" />
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  {listing.areaSize} m²
                </span>
              </div>

              {/* 3. Renovation status */}
              <div className="flex items-center gap-3">
                <RenovatedIcon color="white" className="w-5 h-5 shrink-0" />
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  {listing.isRenovated ? t.listings.card.features.renovated : t.listings.card.features.renovation}
                </span>
              </div>

              {/* 4. Land area (sot) if present */}
              {listing.landArea && (
                <div className="flex items-center gap-3">
                  <SotIcon color="white" className="w-5 h-5 shrink-0" />
                  <span
                    style={{
                      color: '#FFF',
                      fontFamily: '"Rethink Sans", sans-serif',
                      fontSize: '17px',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    {listing.landArea} {t.listings.card.features.sot}
                  </span>
                </div>
              )}

              {/* 5. Room count */}
              <div className="flex items-center gap-3">
                <RoomIcon color="white" className="w-5 h-5 shrink-0" />
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  {listing.rooms} {t.listings.card.features.rooms}
                </span>
              </div>

              {/* 6. Mortgage Status */}
              <div className="flex items-center gap-3">
                <MortgageIcon color="white" className="w-5 h-5 shrink-0" />
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  {listing.hasMortgage ? t.listings.card.features.mortgage : t.listings.card.features.noMortgage}
                </span>
              </div>

              {/* 7. Location */}
              <div className="flex items-center gap-3">
                <LocationIcon color="white" className="w-5 h-5 shrink-0" />
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: '"Rethink Sans", sans-serif',
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                >
                  {listing.location}
                </span>
              </div>

            </div>

            {/* Bottom Price inside Glass Hover view */}
            <div className="flex items-center justify-end gap-1 sm:gap-1.5 pt-2 sm:pt-4">
              <span
                className="text-[14px] sm:text-[20px] lg:text-[24px]"
                style={{
                  color: '#FFF',
                  fontFamily: '"Rethink Sans", sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                {listing.price.toLocaleString()}
              </span>
              <div className="scale-75 sm:scale-90 lg:scale-100 origin-right">
                <ManatWhiteIcon />
              </div>
            </div>

          </div>

        </div>

        {/* Title and Specs Wrapper (exact gap-[2px]) */}
        <div className="flex flex-col gap-[2px] mt-1">
          <h3
            className="text-[#171918] font-normal text-[14px] sm:text-[18px] tracking-tight line-clamp-2"
            style={{
              color: '#171918',
              fontFamily: '"Rethink Sans", sans-serif',
              fontWeight: 400,
              lineHeight: '1.3',
            }}
          >
            {listing.title}
          </h3>

          {/* Single-line Specs: Rooms, Area m², Floor/TotalFloors */}
          <div className="flex items-center gap-1.5 text-[12px] sm:text-[14px] text-gray-500 font-rethink font-light truncate">
            <span>{listing.rooms} otaq</span>
            <span>•</span>
            <span>{listing.areaSize} m²</span>
            {listing.floor > 0 && listing.totalFloors > 0 ? (
              <>
                <span>•</span>
                <span>{listing.floor}/{listing.totalFloors} mərtəbə</span>
              </>
            ) : listing.landArea ? (
              <>
                <span>•</span>
                <span>{listing.landArea}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
