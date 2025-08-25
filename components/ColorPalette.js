function ColorPalette({ colors, mood }) {
  try {
    const copyThemeCSS = () => {
      const cssVars = colors.map((color, index) => {
        const varNames = ['--primary-color', '--secondary-color', '--accent-color', '--highlight-color', '--background-color'];
        return `  ${varNames[index] || `--color-${index + 1}`}: ${color};`;
      }).join('\n');
      
      const fullCSS = `:root {\n${cssVars}\n}`;
      
      navigator.clipboard.writeText(fullCSS).then(() => {
        const element = document.createElement('div');
        element.innerHTML = '<div class="flex items-center"><div class="icon-check text-lg mr-2"></div>CSS Variables Copied!</div>';
        element.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl z-50 shadow-xl';
        document.body.appendChild(element);
        setTimeout(() => document.body.removeChild(element), 3000);
      });
    };

    return (
      <div className="stagger-fade" style={{animationDelay: '0.1s'}} data-name="color-palette" data-file="components/ColorPalette.js">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] flex items-center">
            <div className="icon-palette text-2xl sm:text-3xl text-[var(--primary-color)] mr-3"></div>
            Color Palette - {mood}
          </h2>
          <button onClick={copyThemeCSS} className="copy-css-btn flex items-center">
            <div className="icon-copy text-sm mr-2"></div>
            Copy Theme CSS
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {colors.map((color, index) => (
            <div key={index} className="text-center">
              <div 
                className="color-swatch mx-auto mb-3 relative group" 
                style={{ backgroundColor: color }}
                title={`Click to copy ${color}`}
                onClick={() => {
                  navigator.clipboard.writeText(color);
                  const element = document.createElement('div');
                  element.innerHTML = '<div class="flex items-center"><div class="icon-check text-lg mr-2"></div>Color Copied!</div>';
                  element.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl z-50 shadow-xl';
                  document.body.appendChild(element);
                  setTimeout(() => document.body.removeChild(element), 2000);
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="icon-copy text-white text-lg"></div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-2">
                <p className="text-sm font-mono text-[var(--text-secondary)] font-semibold">{color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ColorPalette component error:', error);
    return null;
  }
}
