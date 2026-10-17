export interface Product {
  id: string;
  name: string;
  price: number;
  collection: 'GA2100 Showcase' | 'Custom Collection' | 'GA2100 AP Band Collection' | 'Sweatsuits' | 'Socks and Beanies';
  description: string;
  status: 'available' | 'reserved' | 'sold' | 'coming-soon';
  isWatch: boolean;
  colorway: {
    bezel: string;
    dial: string;
    indices: string;
    accent: string;
    strap: string;
    style: string;
  };
  features: string[];
}

export const INITIAL_PRODUCTS: Product[] = [
  // ---------------------------------------------------------------------------
  // 1. GA2100 SHOWCASE ($85)
  // ---------------------------------------------------------------------------
  {
    id: 'gw-1',
    name: 'Black on Black GA2100',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'The legendary triple-black stealth CasiOak. Matte black bezel, charcoal dial markers, and pure murdered-out minimalism.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#121212',
      dial: '#1a1a1a',
      indices: '#2a2a2a',
      accent: '#444444',
      strap: '#151515',
      style: 'Stealth Triple Black'
    },
    features: ['Matte resin casing', 'Shock resistant structure', '200M water resistance', 'Hand-finished stealth indices']
  },
  {
    id: 'gw-2',
    name: 'White on Black GA2100',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'High-contrast monochrome classic. Pitch-black octagonal bezel punctuated with crisp arctic white hands and indices.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#111111',
      dial: '#181818',
      indices: '#f4f4f4',
      accent: '#ffffff',
      strap: '#111111',
      style: 'High-Contrast Monochrome'
    },
    features: ['High-contrast readability', 'Carbon Core Guard', 'Double LED illumination', 'Genuine Casio movement']
  },
  {
    id: 'gw-3',
    name: 'Rainbow on White GA2100 — Infinity Stones',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'Clean snow-white resin frame showcasing hand-painted vibrant rainbow hour indices inspired by cosmic power stones.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#f5f5f5',
      dial: '#ffffff',
      indices: 'rainbow',
      accent: '#f59e0b',
      strap: '#f5f5f5',
      style: 'Spectrum Multi-Hue'
    },
    features: ['Custom rainbow gradient hour markers', 'Clean white resin bezel & strap', 'Hand-applied enamel pigment', 'Scratch-resistant mineral glass']
  },
  {
    id: 'gw-4',
    name: 'Blue on Black GA2100 with Clear Strap — Blue Night',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'Midnight blue indices set inside a deep black dial, paired with Sean’s signature translucent iced crystal strap.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#0a0e17',
      dial: '#0f172a',
      indices: '#38bdf8',
      accent: '#0284c7',
      strap: 'rgba(255,255,255,0.4)',
      style: 'Midnight Frost'
    },
    features: ['Translucent frosted strap', 'Cobalt blue indices', 'Custom dial bezel ring', 'World time 31 time zones']
  },
  {
    id: 'gw-5',
    name: 'Rainbow on Black GA2100 — Night Sky',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'Deep matte black backdrop with a radiant neon spectrum burst across all 12 indices like city lights in the Chicago night.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#121212',
      dial: '#0d0d0d',
      indices: 'rainbow',
      accent: '#ec4899',
      strap: '#121212',
      style: 'Neon Nebula'
    },
    features: ['12 individual neon hand-painted indices', 'Stealth black resin case', '5 daily alarms', '1/100 sec stopwatch']
  },
  {
    id: 'gw-6',
    name: 'Rose Gold on Black GA2100 — Gold Cap',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'Understated luxury. Satin black resin housing with metallic rose gold dial markers and gold-dipped hands.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#18181b',
      dial: '#09090b',
      indices: '#fb7185',
      accent: '#f43f5e',
      strap: '#18181b',
      style: 'Rose Gold Luxe'
    },
    features: ['Metallic rose gold hour markers', 'Subtle metallic sheen', 'Hand shift function', 'Ultra-slim 11.8mm profile']
  },
  {
    id: 'gw-7',
    name: 'Rainbow on White GA2100 with Clear Strap — Art Board',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'Pure streetwear canvas. White dial with rainbow spectrum detailing and a full transparent skeleton jelly strap.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: 'rgba(240,240,240,0.8)',
      dial: '#ffffff',
      indices: 'rainbow',
      accent: '#10b981',
      strap: 'rgba(255,255,255,0.5)',
      style: 'Jelly Art Board'
    },
    features: ['Full skeleton clear strap', 'White inner dial with rainbow spectrum', 'Streetwear collector piece', 'Water-resistant seals inspected']
  },
  {
    id: 'gw-8',
    name: 'Red on Red GA2100 — Blood Shot',
    price: 85,
    collection: 'GA2100 Showcase',
    description: 'Unapologetic, head-turning crimson energy. Crimson red case, blood-red dial, and matching ruby strap.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#b91c1c',
      dial: '#991b1b',
      indices: '#ef4444',
      accent: '#f87171',
      strap: '#b91c1c',
      style: 'All Crimson Blood Shot'
    },
    features: ['Monochrome red finish', 'High-impact colorway', 'Shock resistance', 'Countdown timer']
  },

  // ---------------------------------------------------------------------------
  // 2. CUSTOM COLLECTION ($100)
  // ---------------------------------------------------------------------------
  {
    id: 'cc-1',
    name: 'White on White GA2100 — Who Cares, I’m Already Late',
    price: 100,
    collection: 'Custom Collection',
    description: 'The iconic anti-establishment quote hand-lettered across the pristine white dial in custom comic typography. Pure attitude.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#ffffff',
      dial: '#fafafa',
      indices: '#e5e7eb',
      accent: '#111827',
      strap: '#ffffff',
      style: 'Subversive White Dial'
    },
    features: ['Custom dial lettering', 'Triple white matte aesthetic', 'Individual serial build #', 'Custom comic packaging included']
  },
  {
    id: 'cc-2',
    name: 'Black on Black GA2100 — Who Cares, I’m Already Late',
    price: 100,
    collection: 'Custom Collection',
    description: 'Stealth black dial with bold glossy ink lettering: "WHO CARES, I’M ALREADY LATE". A Chicago streetwear staple.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#0a0a0a',
      dial: '#141414',
      indices: '#262626',
      accent: '#ffffff',
      strap: '#0a0a0a',
      style: 'Stealth Dial Typography'
    },
    features: ['Gloss ink lettering on matte dial', 'Hand-finished assembly', '1-year movement warranty', 'Limited batch build']
  },
  {
    id: 'cc-3',
    name: 'Multicolor GA2100 — Bob Marley',
    price: 100,
    collection: 'Custom Collection',
    description: 'Vibrant Rasta tribute featuring rich green, sunny yellow, and fiery red indices contrasted against an onyx black dial.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#171717',
      dial: '#0a0a0a',
      indices: 'rasta',
      accent: '#22c55e',
      strap: '#171717',
      style: 'Rasta Tribute'
    },
    features: ['Green, yellow & red custom indices', 'High-grade enamel ink', 'Authentic Casio CasiOak baseline', 'Numbered SeanDidMyWrist tag']
  },

  // ---------------------------------------------------------------------------
  // 3. GA2100 AP BAND COLLECTION ($110)
  // ---------------------------------------------------------------------------
  {
    id: 'ap-1',
    name: 'Black on Black Steel GA2100 — Black Out',
    price: 110,
    collection: 'GA2100 AP Band Collection',
    description: 'Heavyweight brushed black stainless steel AP-style bezel and integrated link bracelet with butterfly deployant clasp.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#1c1917',
      dial: '#09090b',
      indices: '#52525b',
      accent: '#d4d4d8',
      strap: '#27272a',
      style: 'Brushed Steel AP Mod'
    },
    features: ['316L Stainless Steel AP Bezel', 'Integrated steel link bracelet', 'Butterfly deployant clasp', 'Includes adjustment sizing tool']
  },
  {
    id: 'ap-2',
    name: 'Rainbow on Grey AP Band GA2100 — Infinity Gauntlet',
    price: 110,
    collection: 'GA2100 AP Band Collection',
    description: 'Silver gunmetal AP conversion case with rainbow spectrum hour indices and ergonomic textured rubber strap.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#71717a',
      dial: '#27272a',
      indices: 'rainbow',
      accent: '#eab308',
      strap: '#52525b',
      style: 'Gunmetal Steel & Rainbow'
    },
    features: ['Satin gunmetal steel case', 'Rainbow custom dial indices', 'Reinforced fluororubber AP strap', 'Engraved SeanDidMyWrist caseback']
  },
  {
    id: 'ap-3',
    name: 'Black and White AP Band GA2100 — Incognito',
    price: 110,
    collection: 'GA2100 AP Band Collection',
    description: 'Two-tone luxury conversion. Satin black steel octagonal bezel, high-contrast white dial markers, and premium silicone AP strap.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#18181b',
      dial: '#09090b',
      indices: '#ffffff',
      accent: '#ffffff',
      strap: '#ffffff',
      style: 'Two-Tone Monochrome AP'
    },
    features: ['Black steel bezel with white accents', 'Quick-release integrated strap', 'Sub-dial hand alignment verified', 'Water-pressure tested']
  },
  {
    id: 'ap-4',
    name: 'Grey Camo Steel AP Band GA2100 — Camo',
    price: 110,
    collection: 'GA2100 AP Band Collection',
    description: 'Laser-etched urban camouflage pattern on gunmetal steel casing, paired with a reinforced tactical grey band.',
    status: 'available',
    isWatch: true,
    colorway: {
      bezel: '#52525b',
      dial: '#3f3f46',
      indices: '#a1a1aa',
      accent: '#d4d4d8',
      strap: '#3f3f46',
      style: 'Urban Camo Steel'
    },
    features: ['Laser-etched camouflage casing', 'Heavyweight wrist feel', 'Includes screwdriver & spare pins', 'Custom SeanDidMyWrist lab certificate']
  },

  // ---------------------------------------------------------------------------
  // 4. SWEATSUITS (COMING SOON)
  // ---------------------------------------------------------------------------
  {
    id: 'sw-1',
    name: 'Nike Techs',
    price: 0,
    collection: 'Sweatsuits',
    description: 'Authentic Nike Tech Fleece sets curated to match your custom CasiOak wristwear. Drop date announcing soon on Instagram.',
    status: 'coming-soon',
    isWatch: false,
    colorway: {
      bezel: '#000000',
      dial: '#000000',
      indices: '#ffffff',
      accent: '#3b82f6',
      strap: '#000000',
      style: 'Streetwear Tech Fleece'
    },
    features: ['Standard streetwear cut', 'Zippered sleeve stash pocket', 'Thermal fleece comfort', 'Drops via Instagram @seandidmywrist']
  },
  {
    id: 'sw-2',
    name: 'Essentials Sets',
    price: 0,
    collection: 'Sweatsuits',
    description: 'Fear of God Essentials hoodies and sweatpants in neutral earthy tones. Pre-orders opening soon.',
    status: 'coming-soon',
    isWatch: false,
    colorway: {
      bezel: '#d6d3d1',
      dial: '#a8a29e',
      indices: '#44403c',
      accent: '#78716c',
      strap: '#d6d3d1',
      style: 'Neutral Luxury Loungewear'
    },
    features: ['Heavyweight cotton blend', 'Rubberized logo branding', 'Oversized streetwear drape', 'Verified authentic supply']
  },

  // ---------------------------------------------------------------------------
  // 5. SOCKS AND BEANIES (COMING SOON)
  // ---------------------------------------------------------------------------
  {
    id: 'ac-1',
    name: 'Supreme Socks, Black',
    price: 20,
    collection: 'Socks and Beanies',
    description: 'Supreme Hanes crew socks with iconic jacquard cuff logo. 4-pack bundle.',
    status: 'coming-soon',
    isWatch: false,
    colorway: {
      bezel: '#18181b',
      dial: '#000000',
      indices: '#ef4444',
      accent: '#ef4444',
      strap: '#18181b',
      style: 'Black Crew Box Logo'
    },
    features: ['100% combed cotton blend', 'Ribbed cuff with woven logo', 'Cushioned heel and toe', 'Deadstock authentic packaging']
  },
  {
    id: 'ac-2',
    name: 'Supreme Socks, White',
    price: 20,
    collection: 'Socks and Beanies',
    description: 'Supreme Hanes crew socks in crisp white with signature red box logo detailing. 4-pack bundle.',
    status: 'coming-soon',
    isWatch: false,
    colorway: {
      bezel: '#f4f4f5',
      dial: '#ffffff',
      indices: '#ef4444',
      accent: '#ef4444',
      strap: '#f4f4f5',
      style: 'White Crew Box Logo'
    },
    features: ['Clean white aesthetic', 'Red jacquard branding', 'Reinforced stitching', 'Deadstock authentic packaging']
  },
  {
    id: 'ac-3',
    name: 'Supreme Beanies',
    price: 75,
    collection: 'Socks and Beanies',
    description: 'Supreme New Era and Overdyed ribbed knit beanies for the Midwest winter rotation.',
    status: 'coming-soon',
    isWatch: false,
    colorway: {
      bezel: '#09090b',
      dial: '#18181b',
      indices: '#ffffff',
      accent: '#ef4444',
      strap: '#09090b',
      style: 'Ribbed Knit Box Logo'
    },
    features: ['Heavyweight acrylic knit', 'Embroidered box logo patch', 'Unisex one-size fit', 'Limited winter release']
  }
];
