// ============================================================
// weddingData.js — All Wedding Content
// Edit this file to personalize your invitation!
// ============================================================

export const coupleNames = {
  groom: 'Pavan',
  bride: 'Thanuja',
  groomFull: 'Pavan Surya Prakash',
  brideFull: 'Thanuja',
  groomParents: 'S/O Sri Pitchika Raja Kumar Garu\n& Smt. Pitchika Bala Durga Maruthi',
  brideParents: 'D/O Sri Beeraka Satyanarayana Garu\n& Smt. Beeraka Satyavathi',
  displayName: 'Thanuja & Pavan',
  hashtag: '#ThanujaPavan2026',
};

// Muhurtam (Auspicious Wedding Time) — August 19, 2026 at 4:10 AM
export const weddingDate = new Date('2026-08-19T04:10:00');

export const events = [
  {
    id: 1,
    name: 'Evening Reception',
    icon: '✨',
    date: 'August 18, 2026',
    time: '',
    venue: 'B S Function Hall, Gandhi Nagar, Guntur',
    description: 'An elegant evening of celebration, fine dining, and dancing under the stars. Join us to toast the soon-to-be newlyweds!',
    color: 'from-amber-400 to-rose-400',
  },
  {
    id: 2,
    name: 'Wedding Dinner',
    icon: '🍽️',
    date: 'August 18, 2026',
    time: '7:30 PM',
    venue: 'B S Function Hall, Gandhi Nagar, Guntur',
    description: 'Join us for a delicious wedding feast to celebrate the joyous occasion.',
    color: 'from-orange-400 to-red-400',
  },
  {
    id: 3,
    name: 'Muhurtam — Wedding Ceremony',
    icon: '🪔',
    date: 'August 19, 2026',
    time: '4:10 AM (Auspicious Muhurtam)',
    venue: 'B S Function Hall, Gandhi Nagar, Guntur',
    description: 'The sacred union of Thanuja & Pavan at the divine auspicious hour. Witness their vows as two souls become one forever.',
    color: 'from-rose-400 to-pink-500',
  },
];


export const venue = {
  name: 'B S Function Hall',
  address: '1-2-48/3, I.P.D Colony, Gandhi Nagar, Guntur, Andhra Pradesh 522003',
  landmark: 'Gandhi Nagar, Guntur',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=B+S+Function+Hall+1-2-48%2F3+I.P.D+Colony+Gandhi+Nagar+Guntur+Andhra+Pradesh+522003',
  phone: '',
};

export const media = {
  // Local photos — your personal images
  couplePhoto: '/album3.jpg',
  scratchRevealPhoto: '/hands.jpg',
  heroBackground: null, // null = use gradient
  // Background music — Kalyanam track
  backgroundMusic: '/bg-music.mpeg',
};

export const albumPhotos = [
  {
    id: 1,
    url: '/album3.jpg',
    title: 'Sacred Garlands',
    subtitle: 'Engagement Vows',
  },
  {
    id: 2,
    url: '/album4.jpg',
    title: 'Sweet Smiles',
    subtitle: 'Pink Teddy Paradise',
  },
  {
    id: 3,
    url: '/album1.jpg',
    title: 'Sweet Memories',
    subtitle: 'Dinner & Celebrations',
  },
  {
    id: 4,
    url: '/album2.jpg',
    title: 'Moments of Joy',
    subtitle: 'Fun Times Together',
  },
  {
    id: 5,
    url: '/couple.jpg',
    title: 'Two Hearts, One Soul',
    subtitle: 'The Happy Couple',
  },
  {
    id: 6,
    url: '/hands.jpg',
    title: 'Bound by Love',
    subtitle: 'Sacred Vows',
  },
];

export const rsvpConfig = {
  deadline: 'August 12, 2026',
  maxGuestsPerRsvp: 10,
  contactEmail: 'pavan.thanuja.wedding@gmail.com',
};

export const giftRegistry = {
  show: true,
  message: 'Your presence is the greatest gift of all. We are truly blessed to have you celebrate this moment with us.',
  subMessage: 'If you wish to bless us further, a small envelope of wishes will warm our hearts forever.',
  registryUrl: null,
  registryLabel: 'View Gift Registry',
  upiId: '',
};

export const socialLinks = {
  instagram: 'https://instagram.com',
  hashtag: '#ThanujaPavan2026',
};
