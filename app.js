// ErrorBoundary unchanged
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button onClick={() => window.location.reload()} className="btn btn-black">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const QUICK_MOODS = [
  { value: "retro", emoji: "🕺" },
  { value: "cozy", emoji: "🏠" },
  { value: "cyberpunk", emoji: "🌆" },
  { value: "minimal", emoji: "⚪" },
  { value: "playful", emoji: "🎈" },
  { value: "calm", emoji: "😌" },
];

function useNonRepeatingRandom(values) {
  const poolRef = React.useRef([]);
  const indexRef = React.useRef(0);

  const reshuffle = React.useCallback(() => {
    poolRef.current = [...values];
    for (let i = poolRef.current.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [poolRef.current[i], poolRef.current[j]] = [poolRef.current[j], poolRef.current[i]];
    }
    indexRef.current = 0;
  }, [values]);

  React.useEffect(() => { reshuffle(); }, [reshuffle]);

  const next = React.useCallback(() => {
    if (indexRef.current >= poolRef.current.length) reshuffle();
    const v = poolRef.current[indexRef.current];
    indexRef.current += 1;
    return v;
  }, [reshuffle]);

  return next;
}

function MoodInput({ mood, setMood, onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(mood);
  const wrapRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return QUICK_MOODS;
    return QUICK_MOODS.filter(m => m.value.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  React.useEffect(() => {
    const handler = (e) => { if (!wrapRef.current) return; if (!wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler); 
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (filtered.length && open) {
        setMood(filtered[0].value); setQuery(filtered[0].value); setOpen(false); onSubmit?.(filtered[0].value);
      } else { setMood(query); onSubmit?.(query); }
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const selectOption = (val) => { setMood(val); setQuery(val); setOpen(false); inputRef.current?.focus(); };

  return (
    <div className="dropdown-wrap" ref={wrapRef}>
      <div
        className={`mood-input flex items-center justify-between ${open ? 'ring-2 ring-[var(--primary-color)] ring-opacity-20' : ''}`}
        onClick={() => { setOpen(o => !o); inputRef.current?.focus(); }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <input
          ref={inputRef} type="text"
          placeholder="Enter or choose a mood (retro, cozy, cyberpunk...)"
          className="outline-none flex-1 cursor-text"
          value={query} onChange={(e) => { setQuery(e.target.value); setMood(e.target.value); }}
          onFocus={() => setOpen(true)} onKeyDown={onKeyDown}
        />
        <span className={`dropdown-arrow ${open ? 'rotated' : ''}`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>

      <div className={`dropdown-panel ${open ? 'show' : ''}`} role="listbox">
        {filtered.length ? (
          filtered.map(opt => (
            <div key={opt.value} className="dropdown-item" onClick={() => selectOption(opt.value)} role="option" aria-selected={mood === opt.value}>
              <span className="flex items-center gap-3"><span className="text-xl">{opt.emoji}</span><span className="capitalize">{opt.value}</span></span>
              {mood === opt.value && (
                <span className="text-[var(--primary-color)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              )}
            </div>
          ))
        ) : (<div className="px-6 py-4 text-[var(--text-secondary)]">No matching moods</div>)}
      </div>
    </div>
  );
}

function App() {
  const [mood, setMood] = React.useState('');
  const [currentMoodData, setCurrentMoodData] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const nextRandom = useNonRepeatingRandom(QUICK_MOODS.map(m => m.value));

  const generateFromMood = (value) => {
    const key = (value || mood || '').toLowerCase().trim();
    if (!key) return;
    setIsGenerating(true); setShowResults(false);
    setTimeout(() => {
      const data = getMoodData(key);
      setCurrentMoodData(data); setIsGenerating(false);
      setTimeout(() => setShowResults(true), 100);
    }, 800);
  };

  const handleGenerate = () => generateFromMood(mood);
  const handleRandom = () => { const pick = nextRandom(); setMood(pick); generateFromMood(pick); };

  const handleExportImage = async () => {
    const exportElement = document.getElementById('mood-board-export');
    if (!exportElement || !currentMoodData) return;

    try {
      const canvas = await html2canvas(exportElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        width: exportElement.scrollWidth,
        height: exportElement.scrollHeight,
      });
      const link = document.createElement('a');
      link.download = `mood-board-${currentMoodData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) { console.error('Export failed:', error); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary-color)] to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="title-gradient">Eclat</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Create Instant Design Inspiration Based on Your Mood.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-lg mx-auto mb-12 px-4">
          <div className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <MoodInput mood={mood} setMood={setMood} onSubmit={generateFromMood} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={handleGenerate} disabled={!mood.trim() || isGenerating} className="generate-btn disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                {isGenerating ? <span className="flex items-center justify-center"><div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full mr-3"></div>Generating...</span> :
                  <span className="flex items-center justify-center"><div className="icon-sparkles text-xl mr-2"></div>Generate Mood Board</span>}
              </button>
              <button onClick={handleRandom} disabled={isGenerating} className="random-btn disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="flex items-center justify-center"><div className="icon-shuffle text-lg mr-2"></div>Random Mood</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {currentMoodData && (
          <div className={`${showResults ? 'fade-in fade-in-active' : 'fade-in'}`}>
            <div className="text-center mb-8">
              <button onClick={handleExportImage} className="export-btn flex items-center mx-auto">
                <div className="icon-download text-lg mr-2"></div>Export as Image
              </button>
            </div>
            <div id="mood-board-export" className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-8 sm:space-y-12">
              <ColorPalette colors={currentMoodData.colors} mood={currentMoodData.name} />
              <FontPreview fonts={currentMoodData.fonts} />
              <ImageGallery images={currentMoodData.images} />
              <SampleUI moodData={currentMoodData} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-[var(--text-secondary)]">© 2025 Eclat Mood Board</p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);
