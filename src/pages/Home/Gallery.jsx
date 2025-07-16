import { useRef } from "react";

function Gallery() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300; // px to scroll per click
    if (direction === "left") {
      scrollRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

const images = [
  "https://images.unsplash.com/photo-1587614203976-365c74645e83?auto=format&fit=crop&w=600&q=80", // Working
  "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=600&q=80", // Replaced ✅
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", // Replaced ✅
  "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=600&q=80", // Working
  "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=600&q=80", // Working
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", // Working
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", // Replaced ✅
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80"      // Working
];



  return (
    <section style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>Gallery</h2>

      <div style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}>
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Gallery image ${index + 1}`}
              style={{
                flex: "0 0 auto",
                width: "300px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}
            />
          ))}
        </div>

        {/* Slide Buttons */}
        <button
          onClick={() => scroll("left")}
          style={{
            position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)",
            background: "#00000088", color: "#fff", border: "none", borderRadius: "50%",
            width: "40px", height: "40px", cursor: "pointer", zIndex: 1
          }}
        >
          ‹
        </button>
        <button
          onClick={() => scroll("right")}
          style={{
            position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)",
            background: "#00000088", color: "#fff", border: "none", borderRadius: "50%",
            width: "40px", height: "40px", cursor: "pointer", zIndex: 1
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default Gallery;
