"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  roomName: string;
};

export function RoomGallery({ images, roomName }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function openLightbox(index: number) {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }

  function goToPrevious() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goToNext() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  // Handle keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid aspect-[5/4] grid-cols-3 grid-rows-2 gap-3">
        {/* Main large image */}
        <button
          onClick={() => openLightbox(0)}
          className="group relative col-span-3 row-span-2 overflow-hidden sm:col-span-2"
        >
          <Image
            src={images[0]}
            alt={roomName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 35vw"
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="label rounded-sm bg-white/95 px-4 py-2 text-[10px] text-ink shadow-lg">
              View Gallery
            </span>
          </div>
        </button>

        {/* Smaller images */}
        {images.slice(1, 3).map((src, idx) => (
          <button
            key={src}
            onClick={() => openLightbox(idx + 1)}
            className="group relative hidden overflow-hidden sm:block"
          >
            <Image
              src={src}
              alt={`${roomName} - Image ${idx + 2}`}
              fill
              sizes="(max-width: 1024px) 30vw, 18vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </button>
        ))}

        {/* Show more indicator if there are more than 3 images */}
        {images.length > 3 && (
          <button
            onClick={() => openLightbox(3)}
            className="group relative hidden overflow-hidden sm:block"
          >
            <Image
              src={images[3] || images[2]}
              alt={`${roomName} - More images`}
              fill
              sizes="(max-width: 1024px) 30vw, 18vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 transition-colors duration-300 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="label text-[11px] text-white">
                +{images.length - 3} More
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Image counter */}
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm sm:top-6">
            <span className="label text-[10px] text-white">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </button>
          )}

          {/* Main image */}
          <div
            className="relative h-[80vh] w-[90vw] sm:h-[85vh] sm:w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${roomName} - Image ${currentIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 z-10 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-sm bg-white/10 p-2 backdrop-blur-sm">
              {images.map((src, idx) => (
                <button
                  key={src}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm transition-all ${
                    idx === currentIndex
                      ? "ring-2 ring-sand ring-offset-2 ring-offset-black/50"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
