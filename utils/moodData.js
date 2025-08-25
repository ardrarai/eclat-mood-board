const MOOD_DATABASE = {
  retro: {
    name: 'Retro Vibes',
    description: 'nostalgic charm and vintage aesthetics',
    colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#1A535C', '#FF9F1C'],
    fonts: [
      { name: 'Bebas Neue', category: 'Display', fallback: 'sans-serif', usage: 'headlines and bold statements' },
      { name: 'Roboto Slab', category: 'Serif', fallback: 'serif', usage: 'body text with character' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1698254064268-1b9e4ec83c66?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Vintage neon signs and retro aesthetics' },
      { url: 'https://images.unsplash.com/photo-1721372261034-525a25737f5f?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Classic arcade and gaming vibes' }
    ]
  },
  cozy: {
    name: 'Cozy Comfort',
    description: 'warmth, comfort, and intimate spaces',
    colors: ['#D4A574', '#FFDAB9', '#8B7355', '#F5DEB3', '#DEB887'],
    fonts: [
      { name: 'Merriweather', category: 'Serif', fallback: 'serif', usage: 'readable and inviting text' },
      { name: 'Source Sans Pro', category: 'Sans-serif', fallback: 'sans-serif', usage: 'clean and friendly interface' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1729932989809-f473b1523a9b?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Warm coffee shop atmosphere' },
      { url: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Cozy reading nook with soft lighting' }
    ]
  },
  cyberpunk: {
    name: 'Cyberpunk Future',
    description: 'high-tech, neon-lit digital aesthetics',
    colors: ['#00D9FF', '#FF006E', '#8338EC', '#06FFA5', '#FFBE0B'],
    fonts: [
      { name: 'Orbitron', category: 'Display', fallback: 'monospace', usage: 'futuristic headings' },
      { name: 'Roboto Mono', category: 'Monospace', fallback: 'monospace', usage: 'code and tech interfaces' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1557515126-1bf9ada5cb93?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Neon cityscape and digital interfaces' },
      { url: 'https://images.unsplash.com/photo-1596949469909-5217f8b68f23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'High-tech programming environment' }
    ]
  },
  minimal: {
    name: 'Minimal Clean',
    description: 'simplicity, clarity, and focused design',
    colors: ['#2D3436', '#636E72', '#B2BEC3', '#DFE6E9', '#FFFFFF'],
    fonts: [
      { name: 'Inter', category: 'Sans-serif', fallback: 'sans-serif', usage: 'clean and modern interfaces' },
      { name: 'Playfair Display', category: 'Serif', fallback: 'serif', usage: 'elegant headings' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1598242930255-c25f98ff11e5?q=80&w=1225&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Clean architectural spaces' },
      { url: 'https://plus.unsplash.com/premium_photo-1670315264879-59cc6b15db5f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Minimalist workspace design' }
    ]
  },
  playful: {
    name: 'Playful Energy',
    description: 'fun, vibrant, and joyful interactions',
    colors: ['#FF6B9D', '#C44569', '#F8B500', '#4ECDC4', '#95E1D3'],
    fonts: [
      { name: 'Poppins', category: 'Sans-serif', fallback: 'sans-serif', usage: 'friendly and approachable text' },
      { name: 'Fredoka One', category: 'Display', fallback: 'cursive', usage: 'playful headings and highlights' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1639454025136-d785f1776c7c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Colorful and energetic activities' },
      { url: 'https://images.unsplash.com/photo-1473652502225-6b6af0664e32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0', description: 'Joyful celebration and creativity' }
    ]
  }
};

function getMoodData(mood) {
  if (MOOD_DATABASE[mood]) return MOOD_DATABASE[mood];
  const moodLower = mood.toLowerCase();

  if (moodLower.includes('vintage') || moodLower.includes('old') || moodLower.includes('classic')) return MOOD_DATABASE.retro;
  if (moodLower.includes('warm') || moodLower.includes('comfort') || moodLower.includes('home')) return MOOD_DATABASE.cozy;
  if (moodLower.includes('future') || moodLower.includes('neon') || moodLower.includes('tech') || moodLower.includes('digital')) return MOOD_DATABASE.cyberpunk;
  if (moodLower.includes('simple') || moodLower.includes('clean') || moodLower.includes('modern')) return MOOD_DATABASE.minimal;
  if (moodLower.includes('fun') || moodLower.includes('bright') || moodLower.includes('colorful') || moodLower.includes('happy')) return MOOD_DATABASE.playful;

  const moods = Object.keys(MOOD_DATABASE);
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  return { ...MOOD_DATABASE[randomMood], name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Style`, description: 'custom mood interpretation' };
}
