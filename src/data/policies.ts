export interface DepositPolicy {
  minimumDeposit: number;
  reservationDurationBusinessDays: number;
  cancellationRefundPercentage: number;
  sundayCutoffHour: number; // 17 = 5:00 PM
  timeZone: string;
  notes: string[];
}

export const DEPOSIT_POLICY: DepositPolicy = {
  minimumDeposit: 20,
  reservationDurationBusinessDays: 7,
  cancellationRefundPercentage: 50,
  sundayCutoffHour: 17, // 5:00 PM CT
  timeZone: 'America/Chicago',
  notes: [
    'A verified minimum deposit of $20 locks your chosen custom watch exclusively.',
    'Eligible watches are held for exactly seven (7) business days from confirmed deposit timestamp.',
    'SUNDAY CUTOFF: No new deposits are accepted on Sundays after 5:00 PM Central Time (maintenance & dispatch cutoff).',
    'Cancellation & Expiration: If canceled or expired, a 50% refund of the deposit is issued, and the watch returns to active shop inventory.',
    'Payment must be verified via Stripe, Cash App, or Zelle before reservation status is confirmed.'
  ]
};

export const WARRANTY_POLICY = {
  title: 'All watches come with a warranty.',
  duration: '1-Year Limited Movement Warranty',
  coverage: [
    'Complete mechanical and digital quartz movement accuracy.',
    'Custom dial hand-alignment and hand-set stability.',
    'Defects in workmanship on custom-painted markers and dial components.',
    'Free inspect-and-clean checkup during scheduled local meet-ups.'
  ],
  exclusions: [
    'Water damage resulting from submersing the watch with an unsealed crown or modified third-party screws.',
    'Extreme physical trauma, glass shattering, or drop impacts exceeding G-Shock factory tolerances.',
    'Unauthorized third-party disassembly or alterations after handover.'
  ],
  supportInstructions: 'Contact @seandidmywrist on Instagram or use the Contact portal with your order reference number to initiate warranty service.'
};

export const MEETUP_LOCATIONS = {
  chicago: [
    {
      name: 'Millennium Park / The Bean Plaza',
      area: 'Downtown Chicago, IL',
      notes: 'Well-lit, highly public pedestrian plaza. Ideal for weekday afternoon meetups.'
    },
    {
      name: 'Wicker Park Public Square (Damen & Milwaukee)',
      area: 'Wicker Park / Bucktown',
      notes: 'Near Damen Blue Line station. Streetwear and coffee hub.'
    },
    {
      name: 'Navy Pier Public Esplanade',
      area: 'Streeterville / Near North Side',
      notes: 'Public promenade with security presence.'
    },
    {
      name: 'River North Public Transit Concourse',
      area: 'River North, Chicago',
      notes: 'Accessible hub near major Chicago landmarks.'
    }
  ],
  nwi: [
    {
      name: 'Centennial Park Public Promenade',
      area: 'Munster, IN',
      notes: 'Public park center with convenient parking and surveillance.'
    },
    {
      name: 'Valparaiso Square / Central Park Plaza',
      area: 'Downtown Valparaiso, IN',
      notes: 'Outdoor community square in the heart of Valpo.'
    },
    {
      name: 'Highland Public Library Concourse',
      area: 'Highland, IN (45th Ave)',
      notes: 'Safe exchange zone with plenty of parking.'
    },
    {
      name: 'Crown Point Historic Courthouse Square',
      area: 'Crown Point, IN',
      notes: 'Vibrant, open public square with local shops and cafes.'
    }
  ]
};

export const SHIPPING_POLICY = {
  methods: [
    {
      name: 'Local Chicago / NWI Meet-Up Handover',
      price: 0,
      timeline: '1-3 Business Days (Scheduled)',
      description: 'Meet Sean in person at a verified public spot. Inspect fit and finish before walking away.'
    },
    {
      name: 'USPS Priority Insured & Tracked',
      price: 10,
      timeline: '2-3 Business Days',
      description: 'Double-boxed with comic collector packaging, bubble wrap, and direct tracking.'
    },
    {
      name: 'Expedited Signature Delivery',
      price: 25,
      timeline: '1-2 Business Days',
      description: 'Direct signature required upon handover. Best for multi-piece collector orders.'
    }
  ]
};
