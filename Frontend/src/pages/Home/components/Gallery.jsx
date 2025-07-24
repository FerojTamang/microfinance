import { useRef, useEffect, useState } from "react";

function Gallery() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const autoScroll = () => {
    if (scrollRef.current && !isPaused) {
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      
      // If we've reached the end, reset to beginning
      if (scrollRef.current.scrollLeft >= maxScrollLeft) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 1; // Slow smooth scrolling
      }
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    intervalRef.current = setInterval(autoScroll, 30); // 30ms for smooth animation

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const images = [
    "https://picsum.photos/600/400?random=1",
    "https://picsum.photos/600/400?random=2",
    "https://picsum.photos/600/400?random=3",
    "https://picsum.photos/600/400?random=4",
    "https://picsum.photos/600/400?random=5",
    "https://picsum.photos/600/400?random=6",
    "https://picsum.photos/600/400?random=7",
    "https://picsum.photos/600/400?random=8"
  ];

  return (
    <section className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Gallery</h2>
          <p className="text-gray-600 mb-6">Discover our amazing collection</p>
        </div>

        <div 
          className="relative max-w-full overflow-hidden rounded-xl shadow-2xl bg-white p-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 p-4 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 group cursor-pointer transform transition-all duration-300 hover:scale-105 relative"
              >
              <img
  src={src}
  alt={`Gallery image ${index + 1}`}
  className="w-80 h-56 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-gray-200"
  loading="lazy"
  onError={(e) => {
    e.target.onerror = null; // Remove error handler to prevent infinite loop
    e.target.src = `https://via.placeholder.com/600x400/cccccc/666666?text=Image+${index + 1}`;
  }}
/>

            
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Slide Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 border-none rounded-full w-12 h-12 cursor-pointer z-10 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            aria-label="Scroll left"
          >
            <span className="text-2xl font-bold group-hover:scale-110 transition-transform duration-200">‹</span>
          </button>
          
          <button
            onClick={() => scroll("right")}

            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 border-none rounded-full w-12 h-12 cursor-pointer z-10 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            aria-label="Scroll right"
          >
            <span className="text-2xl font-bold group-hover:scale-110 transition-transform duration-200">›</span>
          </button>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-500 cursor-pointer transition-colors duration-200"
                />
              ))}
            </div>
          </div>

          {/* Pause indicator when hovering */}
          {isPaused && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span className="text-xs">⏸</span>
              Paused
            </div>
          )}
        </div>

        {/* Gallery info */}
        <div className="text-center mt-6 text-gray-600">
          <p className="text-sm">Hover over the gallery to pause auto-scrolling</p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default Gallery;