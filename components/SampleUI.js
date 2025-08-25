function SampleUI({ moodData }) {
  try {
    const primaryColor = moodData.colors[0];
    const secondaryColor = moodData.colors[1];
    const accentColor = moodData.colors[2];

    return (
      <div className="stagger-fade" style={{animationDelay: '0.4s'}} data-name="sample-ui" data-file="components/SampleUI.js">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center">
          <div className="icon-layout text-2xl sm:text-3xl text-[var(--primary-color)] mr-3"></div>
          Live UI Preview
        </h2>
        
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Sample Card */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="icon-monitor text-lg text-[var(--primary-color)] mr-2"></div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Sample Component</h3>
            </div>
            <div 
              className="sample-card"
              style={{ 
                backgroundColor: secondaryColor,
                border: `3px solid ${primaryColor}30`
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="icon-star text-2xl text-white"></div>
              </div>
              <h4 
                className="text-2xl font-bold mb-3"
                style={{ 
                  color: primaryColor,
                  fontFamily: `'${moodData.fonts[0].name}', ${moodData.fonts[0].fallback}`
                }}
              >
                {moodData.name} Design
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience the perfect blend of {moodData.description} in this beautifully crafted design system.
              </p>
              <button 
                className="px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: primaryColor,
                  color: 'white'
                }}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Sample Button Set */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="icon-mouse-pointer text-lg text-[var(--primary-color)] mr-2"></div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Interactive Elements</h3>
            </div>
            <div className="space-y-4">
              <button 
                className="w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: primaryColor,
                  color: 'white'
                }}
              >
                Primary Action
              </button>
              <button 
                className="w-full py-4 px-6 rounded-2xl font-bold text-lg border-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ 
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: 'transparent'
                }}
              >
                Secondary Action
              </button>
              <button 
                className="w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: accentColor,
                  color: 'white'
                }}
              >
                Accent Button
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SampleUI component error:', error);
    return null;
  }
}
