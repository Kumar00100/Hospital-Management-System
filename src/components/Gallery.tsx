import { useEffect, useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  image_path: string;
  uploaded_at?: string;
};

const Gallery = () => {
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) throw new Error('Failed to load gallery');
        const data: GalleryItem[] = await res.json();
        setItems(data);
      } catch (e) {
        // Fallback to AI-generated hospital images if API fails
        const fallback = [
          {
            id: 1,
            title: "Modern Hospital Reception",
            image_path: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop"
          },
          {
            id: 2,
            title: "Advanced Operating Theater",
            image_path: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop"
          },
          {
            id: 3,
            title: "Emergency Department",
            image_path: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
          },
          {
            id: 4,
            title: "Patient Room",
            image_path: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop"
          },
          {
            id: 5,
            title: "Medical Laboratory",
            image_path: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
          },
          {
            id: 6,
            title: "Radiology Department",
            image_path: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop"
          },
          {
            id: 7,
            title: "Pediatric Ward",
            image_path: "https://images.unsplash.com/photo-1576765608535-5f04d336d7e2?w=400&h=300&fit=crop"
          },
          {
            id: 8,
            title: "Hospital Exterior",
            image_path: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=300&fit=crop"
          }
        ];
        setItems(fallback);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-16 bg-background" id="gallery">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-header">Hospital Gallery</h2>
          <p className="section-subtext">A glimpse of our facility and care</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <button
              key={item.id ?? idx}
              onClick={() => setActive(item.image_path)}
              className="group relative block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={item.image_path}
                alt={item.title || `Hospital image ${idx + 1}`}
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {active && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="max-w-4xl w-full">
              <img src={active} alt="Preview" className="w-full rounded-xl shadow-2xl" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;


