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
        // Fallback to static folder if API fails
        const fallback = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          title: `Photo ${i + 1}`,
          image_path: `/uploads/gallery/${i + 1}.jpg`
        }));
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


