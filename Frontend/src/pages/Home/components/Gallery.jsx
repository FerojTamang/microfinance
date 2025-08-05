import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // Your original data logic
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gallery");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setGalleryItems(parsed);
        } else {
          setGalleryItems([]);
        }
      } else {
        setGalleryItems([]);
      }
    } catch {
      setGalleryItems([]);
    }
  }, []);

  const scrollNext = () => {
    const container = document.getElementById('gallery-scroll');
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    const container = document.getElementById('gallery-scroll');
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  if (galleryItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">No gallery items available.</p>
        </div>
      </div>
    );
  }

  // Duplicate items for seamless loop
  const duplicatedItems = [...galleryItems, ...galleryItems];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of impactful moments and achievements
          </p>
        </div>

        {/* Gallery Container with CSS Animation */}
        <div className="relative group overflow-hidden">
          {/* Navigation Arrows - Only visible on hover */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>

          <div
            id="gallery-scroll"
            className={`flex gap-6 overflow-x-auto scrollbar-hide ${isPaused ? '' : 'animate-scroll'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`flex gap-6 ${isPaused ? '' : 'animate-scroll-infinite'}`}>
              {duplicatedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-contain bg-white transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                      {item.title || "Untitled"}
                    </h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {item.date || ""}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-200 hover:underline">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
        
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default Gallery;