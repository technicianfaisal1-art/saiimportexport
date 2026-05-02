// ==================== EXTENDED PRODUCT DATA ====================
const PRODUCT_DETAILS = {

  'jaggery': {
    id: 'jaggery',
    name: 'Premium Golden Jaggery',
    tag: 'Sweetener',
    heroTagline: 'Pure Indian Sweetness for the World',
    shortDesc: '100% natural, chemical-free cane jaggery in blocks & powder. Rich in iron and minerals.',
    longDesc: [
      'FARMEXO\'s Premium Golden Jaggery is sourced directly from sugarcane farms across Maharashtra and Uttar Pradesh. Produced using traditional methods without any chemical processing, our jaggery retains its natural minerals, iron content, and distinctive rich flavor that has made Indian jaggery sought-after worldwide.',
      'Each batch undergoes rigorous quality testing at our FSSAI-certified facilities to ensure consistent color, texture, and sweetness. Our jaggery is free from artificial colors, preservatives, and adulterants — making it ideal for health-conscious consumers and the organic food market.',
      'Available in solid blocks (500g, 1kg, 5kg) and fine powder form, our jaggery is packaged in food-grade materials to preserve freshness during long-distance shipping. We offer private labeling for retailers and bulk packaging for industrial buyers.'
    ],
    image: 'images/jaggery.png',
    specs: {
      moq: '5 MT',
      hsCode: '1701.99',
      shelfLife: '18 months',
      origin: 'Maharashtra, Uttar Pradesh',
      grade: 'A (Export Grade)',
      loadPerContainer: '24–26 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Sucrose Content', value: '> 70%' },
      { param: 'Moisture Content', value: '< 5%' },
      { param: 'Color', value: 'Golden to Dark Brown' },
      { param: 'Form', value: 'Blocks (Gur) & Powder' },
      { param: 'Ash Content', value: '< 4%' },
      { param: 'Invert Sugar', value: '< 10%' },
      { param: 'Lead (Pb)', value: '< 0.5 ppm' },
      { param: 'Packaging Sizes', value: '500g / 1kg / 5kg / 25kg / 50kg' },
      { param: 'Shelf Life', value: '18 months from manufacturing' },
      { param: 'Storage', value: 'Cool, dry place away from direct sunlight' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Food-grade polypropylene with inner liner' },
      { type: 'Jute Bags', sizes: '50kg', icon: '🧶', desc: 'Eco-friendly jute packaging for organic markets' },
      { type: 'Retail Packs', sizes: '500g / 1kg', icon: '🛒', desc: 'Consumer-ready pouches with your branding' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Your brand name, logo & design on packaging' }
    ],
    whyChoose: [
      { title: 'Farm Direct Sourcing', desc: 'We work directly with 200+ sugarcane farmers, eliminating middlemen and ensuring fresh, authentic jaggery at competitive prices.', icon: '🌾' },
      { title: 'Lab Tested Purity', desc: 'Every batch is tested for sucrose content, moisture, heavy metals, and microbiology at NABL-accredited laboratories.', icon: '🔬' },
      { title: 'Flexible Packaging', desc: 'From bulk 50kg bags to retail-ready 500g pouches with your private label — we customize to your market needs.', icon: '📦' },
      { title: 'Reliable Supply', desc: 'With 5000+ MT annual capacity and cold-storage facilities, we guarantee year-round supply without interruption.', icon: '🚛' }
    ]
  },

  'makhana': {
    id: 'makhana',
    name: 'Roasted Makhana (Fox Nuts)',
    tag: 'Superfood',
    heroTagline: 'India\'s Ancient Superfood, Now Global',
    shortDesc: 'Premium Phool Makhana from Bihar. High protein, low calorie. Available roasted or raw.',
    longDesc: [
      'FARMEXO\'s Makhana (Fox Nuts / Lotus Seeds) is sourced from the pristine ponds of Bihar\'s Mithilanchal region — the world\'s largest producing area. Our Phool Makhana is handpicked, sun-dried, and carefully graded to deliver the largest, whitest pops with a satisfying crunch.',
      'Makhana is a powerhouse superfood — rich in protein, calcium, and antioxidants while being naturally gluten-free, low in fat, and cholesterol-free. It has seen explosive global demand as a healthy snacking alternative and is widely used in Asian cuisine, desserts, and health food products.',
      'We offer Makhana in multiple grades (4-Sutta, 3-Sutta, Lawa) and forms (raw, roasted plain, flavored). Our state-of-the-art sorting facility uses optical grading machines to ensure uniform size and color in every shipment.'
    ],
    image: 'images/makhana.png',
    specs: {
      moq: '2 MT',
      hsCode: '0802.90',
      shelfLife: '12 months',
      origin: 'Bihar (Mithilanchal)',
      grade: '4-Sutta Premium',
      loadPerContainer: '6–8 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Protein Content', value: '9.7g per 100g' },
      { param: 'Fat Content', value: '< 0.1%' },
      { param: 'Moisture Content', value: '< 10%' },
      { param: 'Size Grade', value: '4-Sutta (18mm+) / 3-Sutta (14-18mm)' },
      { param: 'Color', value: 'Bright White to Off-White' },
      { param: 'Form', value: 'Raw / Roasted / Flavored' },
      { param: 'Allergens', value: 'Gluten-free, Nut-free' },
      { param: 'Packaging Sizes', value: '200g / 500g / 1kg / 10kg / 25kg' },
      { param: 'Shelf Life', value: '12 months (nitrogen-flushed)' },
      { param: 'Storage', value: 'Cool, dry, airtight environment' }
    ],
    packaging: [
      { type: 'Vacuum Packs', sizes: '200g / 500g / 1kg', icon: '🫧', desc: 'Nitrogen-flushed pouches for maximum freshness' },
      { type: 'PP Bags', sizes: '10kg / 25kg', icon: '📦', desc: 'Bulk bags with inner food-grade liner' },
      { type: 'Retail Jars', sizes: '200g / 500g', icon: '🫙', desc: 'PET jars with branded labels' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Complete custom packaging design' }
    ],
    whyChoose: [
      { title: 'Bihar Origin Guarantee', desc: 'Direct sourcing from Bihar\'s Mithilanchal region — the world\'s premium makhana belt with generations of harvesting expertise.', icon: '🌿' },
      { title: 'Optical Sorting', desc: 'Advanced color-sorting machines ensure uniform size, color, and zero broken pieces in every batch.', icon: '🔍' },
      { title: 'Superfood Demand', desc: 'Riding the global health food wave — makhana exports grew 300% in the last 5 years. Position your brand early.', icon: '📈' },
      { title: 'Value-Added Options', desc: 'We can supply roasted, salted, or custom-flavored makhana ready for retail shelves.', icon: '✨' }
    ]
  },

  'maize': {
    id: 'maize',
    name: 'Farm Fresh Maize',
    tag: 'Grain',
    heroTagline: 'Golden Indian Maize, Global Quality',
    shortDesc: 'Golden maize with <14% moisture. For human consumption and animal feed.',
    longDesc: [
      'FARMEXO exports premium Indian maize (corn) cultivated in the fertile plains of Bihar, Madhya Pradesh, and Karnataka. Our yellow maize features a bright golden color, high starch content, and consistently low moisture levels that meet international feed and food-grade standards.',
      'Indian maize is prized globally for its superior nutritional profile, making it ideal for corn flour production, animal feed formulation, starch manufacturing, and ethanol production. We supply both FAQ (Fair Average Quality) and premium sorted maize to meet diverse buyer requirements.',
      'Our maize undergoes multi-stage cleaning, de-stoning, and moisture testing before export. Each consignment is accompanied by SGS/Bureau Veritas inspection certificates and phytosanitary documentation for hassle-free customs clearance at destination.'
    ],
    image: 'images/maize.png',
    specs: {
      moq: '10 MT',
      hsCode: '1005.90',
      shelfLife: '12 months',
      origin: 'Bihar, Madhya Pradesh, Karnataka',
      grade: 'FAQ / Premium Sorted',
      loadPerContainer: '26–28 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Moisture Content', value: '< 14%' },
      { param: 'Broken / Damaged', value: '< 2%' },
      { param: 'Foreign Matter', value: '< 1%' },
      { param: 'Aflatoxin', value: '< 20 ppb (EU compliant)' },
      { param: 'Color', value: 'Bright Golden Yellow' },
      { param: 'Protein Content', value: '8–9%' },
      { param: 'Oil Content', value: '3.5–4.5%' },
      { param: 'Packaging Sizes', value: '25kg / 50kg PP bags' },
      { param: 'Shelf Life', value: '12 months' },
      { param: 'Usage', value: 'Food / Feed / Starch / Ethanol' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven polypropylene bags' },
      { type: 'Jute Bags', sizes: '50kg / 100kg', icon: '🧶', desc: 'For markets preferring natural packaging' },
      { type: 'Bulk / Loose', sizes: 'Container load', icon: '🚢', desc: 'Bulk loading with container liner for cost efficiency' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Branded bags as per buyer specification' }
    ],
    whyChoose: [
      { title: 'Multi-Season Supply', desc: 'India\'s dual cropping (Kharif + Rabi) ensures year-round maize availability without seasonal gaps.', icon: '📅' },
      { title: 'Competitive Pricing', desc: 'India ranks among the world\'s top 5 maize producers — offering excellent quality at globally competitive FOB prices.', icon: '💰' },
      { title: 'Third-Party Inspected', desc: 'SGS, Bureau Veritas, or buyer-nominated inspection at loading port for complete quality assurance.', icon: '✅' },
      { title: 'Multi-Purpose Grade', desc: 'We supply food-grade (human consumption) and feed-grade maize to match your specific end-use requirements.', icon: '🌽' }
    ]
  },

  'potato': {
    id: 'potato',
    name: 'Export Quality Potatoes',
    tag: 'Vegetable',
    heroTagline: 'Fresh Indian Potatoes, Cold-Chain Delivered',
    shortDesc: 'Carefully sorted, disease-free potatoes. Excellent shelf life. Cold-stored.',
    longDesc: [
      'FARMEXO exports premium Indian potatoes sourced from the cold-storage belt of Uttar Pradesh, West Bengal, and Punjab. Our potatoes are carefully sorted by size, washed, and graded to meet the stringent quality requirements of international fresh produce markets.',
      'India is the world\'s second-largest potato producer, and our varieties — including Pukhraj, Jyoti, and Chandramukhi — are known for their firm texture, low sugar content, and excellent cooking properties. Whether you need table potatoes, processing varieties for chips, or seed potatoes, we supply them all.',
      'Our cold-chain infrastructure ensures potatoes are stored at optimal 2–4°C temperature from harvest to port, maintaining freshness and extending shelf life. Each shipment includes phytosanitary certificates and undergoes pre-shipment quality inspection.'
    ],
    image: 'images/potato.png',
    specs: {
      moq: '20 MT',
      hsCode: '0701.90',
      shelfLife: '3–4 months (cold stored)',
      origin: 'Uttar Pradesh, West Bengal, Punjab',
      grade: 'A (Export Grade, Sorted)',
      loadPerContainer: '24–26 MT (Reefer 20ft)'
    },
    specTable: [
      { param: 'Size Range', value: '35mm–55mm / 55mm–75mm / 75mm+' },
      { param: 'Skin Condition', value: 'Clean, smooth, no sprouts' },
      { param: 'Defect Tolerance', value: '< 5% (cuts, green, misshapen)' },
      { param: 'Dry Matter', value: '> 18%' },
      { param: 'Storage Temperature', value: '2–4°C (cold chain)' },
      { param: 'Varieties Available', value: 'Pukhraj, Jyoti, Chandramukhi, 3797' },
      { param: 'Pesticide Residue', value: 'EU MRL compliant' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg mesh / PP bags' },
      { param: 'Shipping', value: 'Reefer containers (2–4°C)' },
      { param: 'Usage', value: 'Table / Processing (Chips) / Seed' }
    ],
    packaging: [
      { type: 'Mesh Bags', sizes: '10kg / 25kg / 50kg', icon: '🥔', desc: 'Breathable mesh bags for fresh produce ventilation' },
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Woven polypropylene with ventilation holes' },
      { type: 'Cartons', sizes: '10kg / 20kg', icon: '📤', desc: 'Corrugated cartons for premium retail markets' },
      { type: 'Custom Packing', sizes: 'As required', icon: '🏷️', desc: 'Buyer-specific packing as per destination market' }
    ],
    whyChoose: [
      { title: 'Cold-Chain Integrity', desc: 'End-to-end cold storage from farm to reefer container ensures zero quality loss and maximum shelf life.', icon: '❄️' },
      { title: 'Size Grading', desc: 'Optical and manual sorting by size (small/medium/large) ensures uniformity in every shipment.', icon: '📏' },
      { title: 'Multiple Varieties', desc: 'From table potatoes (Pukhraj) to processing varieties (3797 for chips) — we supply exactly what your market needs.', icon: '🥔' },
      { title: 'Year-Round Availability', desc: 'India\'s massive cold-storage network (180M MT capacity) enables 12-month supply from a single season harvest.', icon: '📆' }
    ]
  },

  'besan': {
    id: 'besan',
    name: 'Fine Gram Flour (Besan)',
    tag: 'Flour',
    heroTagline: 'India\'s Finest Gram Flour for Global Kitchens',
    shortDesc: 'Finely milled from premium chana dal. Vibrant golden color, nutty aroma.',
    longDesc: [
      'FARMEXO\'s Besan (Chickpea / Gram Flour) is finely milled from handpicked Desi Chana Dal sourced from the pulse-growing heartlands of Madhya Pradesh and Rajasthan. Our besan features a vibrant golden color, smooth texture, and the characteristic nutty aroma that defines premium quality.',
      'Besan is a cornerstone ingredient in South Asian, Middle Eastern, and Mediterranean cuisines — used in everything from pakoras and ladoos to flatbreads and batters. Its high protein content (20%+) and gluten-free nature make it increasingly popular in Western health food markets as a flour alternative.',
      'Our milling facility uses precision stone grinding followed by micro-sieving to achieve a uniformly fine particle size. Each batch is tested for protein content, moisture, and microbiological safety before packaging in food-grade, moisture-proof bags.'
    ],
    image: 'images/besan.png',
    specs: {
      moq: '5 MT',
      hsCode: '1106.10',
      shelfLife: '12 months',
      origin: 'Madhya Pradesh, Rajasthan',
      grade: 'Premium Milled',
      loadPerContainer: '22–24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Protein Content', value: '> 20%' },
      { param: 'Moisture Content', value: '< 10%' },
      { param: 'Fat Content', value: '5–6%' },
      { param: 'Fiber Content', value: '3–4%' },
      { param: 'Particle Size', value: '< 200 mesh (fine)' },
      { param: 'Color', value: 'Vibrant Golden Yellow' },
      { param: 'Allergens', value: 'Gluten-free' },
      { param: 'Packaging Sizes', value: '500g / 1kg / 5kg / 25kg / 50kg' },
      { param: 'Shelf Life', value: '12 months in sealed packaging' },
      { param: 'Usage', value: 'Cooking / Baking / Batter / Health Foods' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Laminated inner liner for moisture protection' },
      { type: 'Retail Pouches', sizes: '500g / 1kg / 5kg', icon: '🛒', desc: 'Consumer-ready stand-up pouches' },
      { type: 'Paper Bags', sizes: '25kg', icon: '📃', desc: 'Multi-wall kraft paper for organic/health markets' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Full custom branding and pack design' }
    ],
    whyChoose: [
      { title: 'Premium Desi Chana', desc: 'We use only Desi variety chickpeas (not Kabuli) — delivering the authentic golden color and nutty flavor buyers expect.', icon: '🫘' },
      { title: 'Precision Milling', desc: 'Stone grinding + micro-sieving produces a silk-smooth texture with consistent < 200 mesh particle size.', icon: '⚙️' },
      { title: 'Gluten-Free Certified', desc: 'Perfect for the booming gluten-free market — our besan is naturally gluten-free and tested to < 20 ppm.', icon: '🌿' },
      { title: 'Bulk + Retail Ready', desc: 'Whether you need 50kg bags for food service or 500g pouches for supermarket shelves, we deliver both.', icon: '📦' }
    ]
  },

  'mustard-oil': {
    id: 'mustard-oil',
    name: 'Cold-Pressed Mustard Oil',
    tag: 'Oil',
    heroTagline: 'Pure Kachchi Ghani, Rich in Tradition',
    shortDesc: 'Pure Kachchi Ghani mustard oil. Rich in Omega-3 & 6. Pungent, authentic flavor.',
    longDesc: [
      'FARMEXO\'s Cold-Pressed Mustard Oil is produced using the traditional "Kachchi Ghani" method — where mustard seeds are crushed at low temperatures in wooden/stone presses. This cold-pressing technique preserves the oil\'s natural pungency, dark amber color, and full nutritional profile.',
      'Our mustard oil is rich in monounsaturated fatty acids (MUFA), Omega-3 & Omega-6 fatty acids, and natural antioxidants. It has been a staple cooking oil in Indian, Bangladeshi, and Nepali households for centuries and is gaining popularity in global markets for its unique flavor and health benefits.',
      'Sourced from premium quality mustard seeds grown in Rajasthan and Madhya Pradesh, our oil is filtered, lab-tested for purity (acid value, peroxide value, erucic acid content), and packaged in food-grade HDPE/PET containers or tin cans to prevent oxidation during transit.'
    ],
    image: 'images/mustard_oil.png',
    specs: {
      moq: '3 MT',
      hsCode: '1514.19',
      shelfLife: '12 months',
      origin: 'Rajasthan, Madhya Pradesh',
      grade: 'Grade I (Agmark)',
      loadPerContainer: '18–20 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Extraction Method', value: 'Cold-Pressed (Kachchi Ghani)' },
      { param: 'Acid Value', value: '< 1.0 mg KOH/g' },
      { param: 'Peroxide Value', value: '< 10 meq/kg' },
      { param: 'Erucic Acid', value: '< 2% (Low Erucic available)' },
      { param: 'Color', value: 'Dark Amber to Golden' },
      { param: 'Pungency', value: 'Strong (characteristic)' },
      { param: 'Moisture & Impurities', value: '< 0.25%' },
      { param: 'Packaging', value: '1L / 5L PET, 15L Tin, 200L Drum' },
      { param: 'Shelf Life', value: '12 months from pressing' },
      { param: 'Usage', value: 'Cooking / Pickling / Massage / Industrial' }
    ],
    packaging: [
      { type: 'PET Bottles', sizes: '1L / 2L / 5L', icon: '🫗', desc: 'Consumer-ready bottles with tamper-evident caps' },
      { type: 'Tin Cans', sizes: '5L / 15L', icon: '🥫', desc: 'Food-grade tin for extended shelf life' },
      { type: 'HDPE Drums', sizes: '50L / 200L', icon: '🛢️', desc: 'Industrial drums for bulk/B2B buyers' },
      { type: 'Flexitanks', sizes: '20,000L', icon: '🚢', desc: 'Most cost-effective for full container loads' }
    ],
    whyChoose: [
      { title: 'Kachchi Ghani Authentic', desc: 'Traditional cold-pressing retains natural pungency, nutrients, and flavor that refined oils simply cannot match.', icon: '🫒' },
      { title: 'Health Superfood', desc: 'Rich in MUFA, Omega-3, Omega-6 and natural antioxidants — validated by modern nutrition science.', icon: '💚' },
      { title: 'Low Erucic Available', desc: 'We offer both traditional and Low Erucic Acid Mustard (LEAR) oil to comply with EU and global regulations.', icon: '📋' },
      { title: 'Versatile Packaging', desc: 'From 1L retail bottles to 20,000L flexitanks — we package for every market segment.', icon: '📦' }
    ]
  },

  'wheat': {
    id: 'wheat',
    name: 'Premium Indian Wheat',
    tag: 'Grain',
    heroTagline: 'High-Protein Indian Wheat, Mill-Ready',
    shortDesc: 'High-protein wheat, rigorously cleaned and sorted. Perfect for milling.',
    longDesc: [
      'FARMEXO exports premium Indian wheat sourced from the breadbasket states of Punjab, Haryana, Madhya Pradesh, and Uttar Pradesh. Our wheat is known for its high protein content (11–13%), golden amber color, and excellent milling characteristics that produce superior quality flour.',
      'India is the world\'s second-largest wheat producer, and our Lok-1, Sharbati, and HD varieties are highly sought after by flour mills across Southeast Asia, Africa, and the Middle East. We supply both milling-grade wheat for atta/maida production and feed-grade wheat at competitive prices.',
      'Every shipment goes through a 7-stage cleaning process — pre-cleaning, de-stoning, magnetic separation, gravity separation, aspiration, indent cylinder separation, and optical sorting — ensuring < 0.5% foreign matter and zero live infestations. All lots are fumigated with aluminum phosphide as per IPPC standards.'
    ],
    image: 'images/wheat.png',
    specs: {
      moq: '25 MT',
      hsCode: '1001.99',
      shelfLife: '12 months',
      origin: 'Punjab, Haryana, MP, UP',
      grade: 'FAQ / Premium Sorted',
      loadPerContainer: '26–28 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Protein Content', value: '11–13%' },
      { param: 'Moisture Content', value: '< 12%' },
      { param: 'Gluten (Wet)', value: '> 28%' },
      { param: 'Test Weight', value: '> 76 kg/hl' },
      { param: 'Broken / Shriveled', value: '< 3%' },
      { param: 'Foreign Matter', value: '< 0.5%' },
      { param: 'Damaged Grains', value: '< 1.5%' },
      { param: 'Varieties', value: 'Lok-1, Sharbati, HD-2967, PBW-550' },
      { param: 'Fumigation', value: 'Aluminum Phosphide (IPPC compliant)' },
      { param: 'Usage', value: 'Milling (Atta/Maida) / Feed / Semolina' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven polypropylene with stitched closure' },
      { type: 'Jute Bags', sizes: '50kg / 100kg', icon: '🧶', desc: 'Traditional jute for markets requiring natural packaging' },
      { type: 'Bulk Loading', sizes: 'Full container', icon: '🚢', desc: 'Container liner with bulk loading for cost savings' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Branded bags with your design and markings' }
    ],
    whyChoose: [
      { title: 'High Protein Content', desc: 'Indian wheat delivers 11–13% protein — ideal for strong, elastic dough and premium flour production.', icon: '🌾' },
      { title: '7-Stage Cleaning', desc: 'Our advanced cleaning line removes stones, dust, weed seeds, and damaged grains — delivering mill-ready wheat.', icon: '⚙️' },
      { title: 'Competitive FOB Pricing', desc: 'India\'s massive wheat production (110M MT/year) translates to some of the most competitive prices globally.', icon: '💰' },
      { title: 'Global Compliance', desc: 'Fumigation, phytosanitary, and inspection certificates included. EU aflatoxin and pesticide MRL compliant.', icon: '📋' }
    ]
  }

};
