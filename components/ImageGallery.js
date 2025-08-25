function ImageGallery({ images }) {
  try {
    return (
      <div className="stagger-fade" style={{animationDelay: '0.3s'}} data-name="image-gallery" data-file="components/ImageGallery.js">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center">
          <div className="icon-image text-2xl sm:text-3xl text-[var(--primary-color)] mr-3"></div>
          Visual Inspiration
        </h2>
        
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl group">
              <img 
                src={image.url} 
                alt={image.description}
                className="image-preview"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x300/6366f1/white?text=${encodeURIComponent(image.description)}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-start">
                    <div className="icon-camera text-lg text-[var(--primary-color)] mr-3 mt-0.5"></div>
                    <p className="text-gray-800 text-sm font-medium leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ImageGallery component error:', error);
    return null;
  }
}
