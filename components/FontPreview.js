function FontPreview({ fonts }) {
  try {
    React.useEffect(() => {
      // Load Google Fonts dynamically
      fonts.forEach(font => {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${font.name.replace(' ', '+')}:wght@300;400;600;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      });
    }, [fonts]);

    return (
      <div className="stagger-fade" style={{animationDelay: '0.2s'}} data-name="font-preview" data-file="components/FontPreview.js">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center">
          <div className="icon-type text-2xl sm:text-3xl text-[var(--primary-color)] mr-3"></div>
          Typography Suggestions
        </h2>
        
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {fonts.map((font, index) => (
            <div key={index} className="font-preview relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center">
                  <div className="icon-award text-lg text-[var(--primary-color)] mr-2"></div>
                  {font.name}
                </h3>
                <span className="text-sm text-[var(--text-secondary)] font-medium">
                  {font.category} • {font.usage}
                </span>
              </div>
              
              <div style={{ fontFamily: `'${font.name}', ${font.fallback}` }} className="space-y-4">
                <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-4xl sm:text-5xl font-light text-gray-700 mb-2">Aa Bb Cc</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Character Preview</p>
                </div>
                
                <div className="bg-white border-2 border-gray-100 rounded-xl p-4">
                  <p className="text-lg sm:text-xl mb-2 text-gray-800">The quick brown fox jumps over the lazy dog</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Perfect for {font.usage}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-lg">
                font-family: '{font.name}', {font.fallback};
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('FontPreview component error:', error);
    return null;
  }
}
