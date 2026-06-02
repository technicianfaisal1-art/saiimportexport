// ==================== SAI IMPORT EXPORT AGRO PRODUCT DATA ====================
const PRODUCT_DETAILS_STATIC = {

  '1121-basmati': {
    id: '1121-basmati',
    name: '1121 Basmati Rice',
    tag: 'Basmati',
    heroTagline: 'The King of Basmati Rice',
    shortDesc: 'Extra-long grain 1121 Basmati rice available in White/Creamy Sella, Steam, and Golden Sella.',
    longDesc: [
      'SAI Import Export Agro offers premium 1121 Basmati Rice, globally recognized for its extraordinary grain length (up to 8.35mm to 8.40mm) which elongates significantly upon cooking. This variety is prized for its exquisite aroma, delicate flavor, and non-sticky texture, making it the top choice for Biryani and premium culinary applications.',
      'We supply 1121 Basmati in multiple variants to suit your market needs: White/Creamy Sella (parboiled for extra strength and separate grains), Steam (steamed to lock in nutrients and flavor), and Golden Sella (parboiled to achieve a beautiful golden hue and maximum cooking yield).',
      'Our 1121 Basmati goes through rigorous sortex cleaning and aging to ensure zero impurities, consistent grain length, and optimal moisture content. It is a staple in Middle Eastern, European, and American markets.'
    ],
    image: 'images/1121-basmati.webp',
    specs: {
      price: '$0.99 - $1.07 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Export Grade',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Average Grain Length', value: '8.30mm - 8.40mm' },
      { param: 'Moisture', value: '12.5% Max' },
      { param: 'Broken Grains', value: '1% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Variants', value: 'White Sella, Golden Sella, Steam' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg' }
    ],
    packaging: [
      { type: 'BOPP Bags', sizes: '10kg / 25kg / 50kg', icon: '📦', desc: 'Durable, moisture-resistant BOPP bags' },
      { type: 'Jute Bags', sizes: '25kg / 50kg', icon: '🧶', desc: 'Premium traditional jute packaging' },
      { type: 'Non-Woven Bags', sizes: '10kg / 25kg', icon: '🛍️', desc: 'Breathable fabric bags for retail' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Your brand name, logo & design' }
    ],
    whyChoose: [
      { title: 'Extra-Long Grain', desc: 'Guaranteed average grain length of 8.30mm+, elongating to over 20mm when cooked.', icon: '📏' },
      { title: 'Aged for Aroma', desc: 'Aged perfectly to enhance the authentic basmati aroma and reduce moisture content.', icon: '⏳' },
      { title: 'Sortex Cleaned', desc: '100% sortex clean ensuring zero dust, stones, or broken grains.', icon: '✨' },
      { title: 'Bulk Supply', desc: 'Reliable capacity for large B2B orders with a minimum 25 tons (MT) per shipment.', icon: '🚢' }
    ]
  },

  '1509-basmati': {
    id: '1509-basmati',
    name: '1509 Basmati Rice',
    tag: 'Basmati',
    heroTagline: 'Premium Basmati Value',
    shortDesc: 'High-quality 1509 Basmati rice offering excellent grain length and value. White/Creamy Sella, Golden Sella, and Steam.',
    longDesc: [
      'The 1509 Basmati Rice is an exceptional variety that offers the characteristic long grain and aroma of premium basmati at a more competitive price point. With an average grain length of around 8.20mm to 8.40mm, it provides an excellent alternative to the 1121 variety without compromising on the visual appeal or taste.',
      'At SAI Import Export Agro, we supply 1509 Basmati in White/Creamy Sella, Golden Sella, and Steam variants. The Sella varieties are parboiled to ensure the grains remain separate and fluffy after cooking, making them ideal for catering, restaurants, and everyday premium meals.',
      'Our 1509 Basmati is meticulously processed using advanced milling and sortex technology. It is highly demanded across the Gulf, Levant, and African markets for its excellent cooking characteristics and affordability.'
    ],
    image: 'images/1509-basmati.webp',
    specs: {
      price: '$0.89 - $0.95 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Export Grade',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Average Grain Length', value: '8.20mm - 8.40mm' },
      { param: 'Moisture', value: '12.5% Max' },
      { param: 'Broken Grains', value: '1% - 2% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Variants', value: 'White Sella, Golden Sella, Steam' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven polypropylene bags' },
      { type: 'BOPP Bags', sizes: '10kg / 25kg / 50kg', icon: '🛍️', desc: 'High-quality printed BOPP bags' },
      { type: 'Jute Bags', sizes: '25kg / 50kg', icon: '🧶', desc: 'Traditional export packaging' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Custom branding for your market' }
    ],
    whyChoose: [
      { title: 'Excellent Value', desc: 'Offers the premium look and feel of long-grain basmati at a highly competitive price.', icon: '💰' },
      { title: 'High Yield', desc: 'Excellent elongation and volume expansion upon cooking, perfect for commercial kitchens.', icon: '📈' },
      { title: 'Sortex Cleaned', desc: 'Processed through state-of-the-art color sorters for flawless, uniform grains.', icon: '🔍' },
      { title: 'Multiple Variants', desc: 'Available in Steam, White Sella, and Golden Sella to match regional preferences.', icon: '🍚' }
    ]
  },

  'sona-masoori': {
    id: 'sona-masoori',
    name: 'Sona Masoori Rice',
    tag: 'Non-Basmati',
    heroTagline: 'Light, Aromatic, and Everyday Perfect',
    shortDesc: 'Premium Sona Masoori steam non-basmati rice. Lightweight, low starch, and easily digestible.',
    longDesc: [
      'Sona Masoori is a medium-grain, lightweight, and aromatic non-basmati rice that is a staple in many Indian households and highly popular globally. Known as the "Pearls of South India," it is a cross between the Sona and Masoori varieties, offering the best traits of both.',
      'SAI Import Export Agro provides premium Sona Masoori Steam Rice. The steaming process hardens the grain, reducing breakage during milling and cooking, while retaining its natural aroma and nutrients. It is low in starch, making it a healthier choice and easy to digest.',
      'Ideal for everyday cooking, sweet dishes like pongal, or savory meals like idli and dosa batter preparation, our Sona Masoori is meticulously cleaned, sorted, and packed to preserve its freshness and authentic taste.'
    ],
    image: 'images/sona-masoori.webp',
    specs: {
      price: '$0.48 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Sortex Clean',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Grain Type', value: 'Medium Grain' },
      { param: 'Moisture', value: '13% Max' },
      { param: 'Broken Grains', value: '5% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Variant', value: 'Steam' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg' }
    ],
    packaging: [
      { type: 'Non-Woven Bags', sizes: '10kg / 20kg', icon: '🛍️', desc: 'Popular choice for retail Sona Masoori' },
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Bulk packaging for wholesale' },
      { type: 'BOPP Bags', sizes: '10kg / 25kg', icon: '✨', desc: 'Premium printed packaging' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Fully branded as per buyer requirements' }
    ],
    whyChoose: [
      { title: 'Low Starch', desc: 'Naturally low in starch, making it lighter and healthier for daily consumption.', icon: '🥗' },
      { title: 'Versatile Usage', desc: 'Perfect for everyday meals, South Indian dishes, and festive preparations.', icon: '🍛' },
      { title: 'Easily Digestible', desc: 'A preferred choice for all age groups due to its light nature.', icon: '🌱' },
      { title: 'Quality Assured', desc: '100% sortex cleaned to remove all impurities and ensure uniform grain size.', icon: '✅' }
    ]
  },

  'pusa-basmati': {
    id: 'pusa-basmati',
    name: 'Pusa Steam Basmati Rice',
    tag: 'Basmati',
    heroTagline: 'Aromatic & Slender Basmati',
    shortDesc: 'Pusa Steam Basmati Rice known for its distinct aroma, slender grains, and excellent cooking qualities.',
    longDesc: [
      'Pusa Basmati is a highly sought-after variety of Indian basmati rice, celebrated for its captivating aroma, slender grains, and delicious taste. It offers a slightly shorter grain length compared to 1121, but compensates with a richer flavor profile and a more pronounced natural fragrance.',
      'Our Pusa Steam Basmati Rice undergoes a specialized steaming process before milling. This locks in the essential nutrients, hardens the grain to prevent breakage during cooking, and ensures the grains remain separate, non-sticky, and fluffy when served.',
      'SAI Import Export Agro sources the finest Pusa Basmati from the fertile regions of Northern India. It is a favorite in both domestic and international markets, particularly for preparing traditional dishes like Pulao and Biryani where aroma is paramount.'
    ],
    image: 'images/pusa-basmati.webp',
    specs: {
      price: '$0.96 - $0.97 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Export Grade',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Average Grain Length', value: '7.40mm - 7.50mm' },
      { param: 'Moisture', value: '12.5% Max' },
      { param: 'Broken Grains', value: '1% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Aroma', value: 'Strong, Natural' },
      { param: 'Variant', value: 'Steam' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg' }
    ],
    packaging: [
      { type: 'Jute Bags', sizes: '25kg / 50kg', icon: '🧶', desc: 'Traditional packaging to preserve aroma' },
      { type: 'BOPP Bags', sizes: '10kg / 25kg / 50kg', icon: '🛍️', desc: 'Moisture-proof, durable bags' },
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven bags for bulk' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Custom printed bags available' }
    ],
    whyChoose: [
      { title: 'Rich Aroma', desc: 'Known for its intense, natural basmati fragrance that enhances any dish.', icon: '🌿' },
      { title: 'Fluffy Texture', desc: 'Steaming process ensures grains cook perfectly separate and non-sticky.', icon: '☁️' },
      { title: 'Authentic Taste', desc: 'Delivers the traditional, rich taste of classic Indian basmati.', icon: '🍽️' },
      { title: 'Strict Quality Control', desc: 'Double sortexed to guarantee purity and consistent grain quality.', icon: '🔬' }
    ]
  },

  '1401-basmati': {
    id: '1401-basmati',
    name: '1401 Steam Basmati Rice',
    tag: 'Basmati',
    heroTagline: 'The Perfect Blend of Length & Aroma',
    shortDesc: '1401 Steam Basmati Rice offering an excellent balance of grain length, strong aroma, and taste.',
    longDesc: [
      'The 1401 Basmati Rice is an improved, high-yielding variety that beautifully combines the exceptional grain length of 1121 with the rich, traditional aroma of older basmati varieties. It is increasingly becoming the rice of choice for discerning buyers worldwide.',
      'SAI Import Export Agro\'s 1401 Steam Basmati Rice is carefully processed. The steaming treatment helps the grains retain their natural vitamins and minerals while strengthening them. Upon cooking, the rice expands remarkably, offering a delightful visual presentation and a soft, delectable texture.',
      'This variety is perfectly suited for Middle Eastern cuisines, Indian festive dishes, and fine dining establishments that demand both visual appeal and authentic basmati flavor in every serving.'
    ],
    image: 'images/1401-basmati.webp',
    specs: {
      price: '$1.00 - $1.01 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Sortex Clean',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Average Grain Length', value: '7.70mm - 7.90mm' },
      { param: 'Moisture', value: '12.5% Max' },
      { param: 'Broken Grains', value: '1% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Variant', value: 'Steam' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg' }
    ],
    packaging: [
      { type: 'BOPP Bags', sizes: '10kg / 25kg', icon: '🛍️', desc: 'Premium retail-ready packaging' },
      { type: 'Jute Bags', sizes: '25kg / 50kg', icon: '🧶', desc: 'Breathable traditional packaging' },
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Cost-effective bulk packaging' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Tailored branding solutions' }
    ],
    whyChoose: [
      { title: 'Balanced Profile', desc: 'The ideal combination of long grains and strong, authentic basmati aroma.', icon: '⚖️' },
      { title: 'High Cooking Yield', desc: 'Expands significantly during cooking, making it highly economical for catering.', icon: '📈' },
      { title: 'Nutrient Retention', desc: 'Steaming process locks in essential nutrients for a healthier meal.', icon: '💪' },
      { title: 'Export Ready', desc: 'Processed to meet the highest international food safety and quality standards.', icon: '🌍' }
    ]
  },

  'swarna-raw': {
    id: 'swarna-raw',
    name: 'Swarna Raw Rice 5% Broken',
    tag: 'Non-Basmati',
    heroTagline: 'High-Quality Short Grain Rice',
    shortDesc: 'Swarna Raw Rice with 5% broken grains. A popular, affordable short-grain non-basmati rice.',
    longDesc: [
      'Swarna Raw Rice is a highly popular short-grain, non-basmati rice variety grown extensively in India. Known for its affordable price point, health benefits, and excellent cooking qualities, it is a daily dietary staple for millions across South Asia and Africa.',
      'Our Swarna Raw Rice is offered with a maximum of 5% broken grains, ensuring a high-quality product that looks good and cooks well. Being a raw rice (un-parboiled), it cooks relatively quickly, has a soft texture, and a mild, pleasant flavor that pairs well with a variety of curries and gravies.',
      'SAI Import Export Agro ensures that our Swarna rice is thoroughly cleaned, de-stoned, and sortexed to remove impurities, providing a clean, ready-to-cook product suitable for mass consumption, government tenders, and retail markets.'
    ],
    image: 'images/swarna-raw.webp',
    specs: {
      price: '$0.37 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Standard Export Grade',
      loadPerContainer: '26 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Grain Type', value: 'Short Grain' },
      { param: 'Moisture', value: '14% Max' },
      { param: 'Broken Grains', value: '5% Max' },
      { param: 'Discolor/Damage', value: '2% Max' },
      { param: 'Foreign Matter', value: '0.5% Max' },
      { param: 'Variant', value: 'Raw (White)' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Packaging', value: '25kg / 50kg' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven polypropylene bags' },
      { type: 'Non-Woven Bags', sizes: '25kg', icon: '🛍️', desc: 'Better presentation for wholesale markets' },
      { type: 'Bulk Bags', sizes: '1 MT Jumbo Bags', icon: '🏗️', desc: 'For industrial and repackaging use' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Buyer branding available' }
    ],
    whyChoose: [
      { title: 'Highly Affordable', desc: 'A cost-effective rice variety perfect for mass consumption and large-scale catering.', icon: '💰' },
      { title: 'Healthy Option', desc: 'Known to have a lower glycemic index compared to some other white rice varieties.', icon: '❤️' },
      { title: 'Soft Texture', desc: 'Cooks quickly and results in a soft, easily digestible texture.', icon: '☁️' },
      { title: 'Consistent Supply', desc: 'Widely cultivated, ensuring steady availability and stable pricing year-round.', icon: '📅' }
    ]
  },

  'ir64-parboiled': {
    id: 'ir64-parboiled',
    name: 'IR 64 Parboiled Rice 5% Broken',
    tag: 'Non-Basmati',
    heroTagline: 'The Global Staple for Bulk Markets',
    shortDesc: 'IR 64 Parboiled Rice with 5% broken grains. Long-grain non-basmati, highly nutritious and durable.',
    longDesc: [
      'IR 64 Parboiled Rice is one of the most exported non-basmati rice varieties from India. It is a long-grain rice that is favored for its affordability, excellent cooking characteristics, and nutritional value, making it a staple in many African, Asian, and Middle Eastern countries.',
      'The parboiling process (partially boiling the rice in its husk) drives nutrients from the bran into the grain, making IR 64 Parboiled rice more nutritious than regular white rice. It also hardens the grain, making it highly resistant to overcooking and ensuring the grains remain separate and firm.',
      'SAI Import Export Agro supplies premium IR 64 Parboiled Rice with a maximum of 5% broken grains. It is meticulously sortexed for a uniform golden-yellow color and free from impurities, making it ideal for daily consumption, catering, and institutional feeding.'
    ],
    image: 'images/ir64-parboiled.webp',
    specs: {
      price: '$0.38 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Sortex Clean',
      loadPerContainer: '26 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Average Grain Length', value: '5.80mm - 6.20mm' },
      { param: 'Moisture', value: '14% Max' },
      { param: 'Broken Grains', value: '5% Max' },
      { param: 'Discolor/Damage', value: '1% - 2% Max' },
      { param: 'Foreign Matter', value: '0.5% Max' },
      { param: 'Variant', value: 'Parboiled (Golden/Yellowish)' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Packaging', value: '25kg / 50kg' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven polypropylene for bulk export' },
      { type: 'BOPP Bags', sizes: '25kg', icon: '🛍️', desc: 'Printed bags for regional distribution' },
      { type: 'Jumbo Bags', sizes: '1 MT', icon: '🏗️', desc: 'For bulk buyers and repackagers' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Custom printed bags with your logo' }
    ],
    whyChoose: [
      { title: 'Nutrient Rich', desc: 'Parboiling retains essential vitamins and minerals, offering better nutritional value.', icon: '💪' },
      { title: 'Perfect Cooking', desc: 'Hardened grains do not turn mushy, staying separate and firm after cooking.', icon: '🍽️' },
      { title: 'Economical', desc: 'An affordable long-grain option for price-sensitive bulk markets.', icon: '📉' },
      { title: 'High Durability', desc: 'Parboiled rice has an extended shelf life and better resistance to weevils.', icon: '🛡️' }
    ]
  },

  'jeerakasala': {
    id: 'jeerakasala',
    name: 'Jeerakasala Rice',
    tag: 'Specialty',
    heroTagline: 'The Biryani Rice of the South',
    shortDesc: 'Jeerakasala (Kaima) Rice, a highly aromatic short-grain rice famous for Malabar Biryani.',
    longDesc: [
      'Jeerakasala Rice, also known as Kaima Rice or Wayanadan Kaima, is a premium short-grain specialty rice highly prized in Southern India, particularly in Kerala. It is renowned for its unique, captivating aroma and delicate flavor, which significantly enhances any dish it is used in.',
      'Unlike the long-grained basmati used in Northern Indian biryanis, Jeerakasala is the quintessential rice for authentic Malabar and Thalassery Biryanis. The small, firm grains absorb spices and ghee beautifully, creating a rich, flavorful, and aromatic culinary experience.',
      'SAI Import Export Agro sources authentic Jeerakasala rice, ensuring it is aged perfectly to enhance its fragrance and reduce moisture. It is a premium offering for diaspora markets, specialty Indian grocery stores, and authentic South Indian restaurants worldwide.'
    ],
    image: 'images/jeerakasala.webp',
    specs: {
      price: '$1.77 - $1.80 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India (Kerala region)',
      grade: 'Premium Specialty Grade',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Grain Type', value: 'Short Grain' },
      { param: 'Moisture', value: '13% Max' },
      { param: 'Broken Grains', value: '2% Max' },
      { param: 'Aroma', value: 'Strong, Distinctive' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Sortex', value: '100% Clean' },
      { param: 'Variant', value: 'Raw / Aged' },
      { param: 'Packaging', value: '5kg / 10kg / 25kg' }
    ],
    packaging: [
      { type: 'Non-Woven Bags', sizes: '5kg / 10kg', icon: '🛍️', desc: 'Premium retail packaging' },
      { type: 'Jute Bags', sizes: '10kg / 25kg', icon: '🧶', desc: 'Traditional bags to retain aroma' },
      { type: 'PP Bags', sizes: '25kg', icon: '📦', desc: 'Standard wholesale packaging' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Branded packaging for specialty stores' }
    ],
    whyChoose: [
      { title: 'Unique Aroma', desc: 'Possesses a distinct, natural fragrance that defines authentic Malabar cuisine.', icon: '🌿' },
      { title: 'Flavor Absorption', desc: 'Small grains absorb spices and flavors better than long-grain varieties.', icon: '🥘' },
      { title: 'Specialty Niche', desc: 'A high-demand premium product for specific regional and diaspora markets.', icon: '⭐' },
      { title: 'Aged to Perfection', desc: 'Carefully aged to ensure optimal cooking characteristics and maximum aroma.', icon: '⏳' }
    ]
  },

  'broken-rice': {
    id: 'broken-rice',
    name: '100% Broken Raw White Rice',
    tag: 'Broken',
    heroTagline: 'Premium Grade Broken Rice',
    shortDesc: '100% Broken Raw White Rice, Silky Sortexed. Ideal for industrial use, brewing, and animal feed.',
    longDesc: [
      'Our 100% Broken Raw White Rice consists of grains that break during the milling process. Despite being broken, it retains the same high nutritional value and taste as whole grain rice. It is an economical and highly versatile commodity in the global market.',
      'SAI Import Export Agro provides silky sortexed broken rice, meaning it undergoes rigorous cleaning to remove discolored grains, dust, and foreign particles, resulting in a clean, bright white product. We offer various sizes of broken rice depending on buyer requirements.',
      'This product is widely used for human consumption (in porridges or traditional dishes), in the brewing industry for beer production, for manufacturing rice flour and noodles, and as a high-quality ingredient in premium animal and pet feed.'
    ],
    image: 'images/broken-rice.webp',
    specs: {
      price: '$0.33 / kg',
      moq: '25 MT',
      hsCode: '1006.40',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Silky Sortex Clean',
      loadPerContainer: '26 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Broken Percentage', value: '100%' },
      { param: 'Moisture', value: '14% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: '0.5% Max' },
      { param: 'Sortex', value: '100% Clean (Silky)' },
      { param: 'Variant', value: 'Raw White' },
      { param: 'Chalky Grains', value: '5% Max' },
      { param: 'Packaging', value: '25kg / 50kg' }
    ],
    packaging: [
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard woven polypropylene bags' },
      { type: 'Jumbo Bags', sizes: '1 MT', icon: '🏗️', desc: 'Bulk bags for industrial/brewing clients' },
      { type: 'Bulk in Container', sizes: 'Full Load', icon: '🚢', desc: 'Loose loading in container liners' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Custom printed bags available' }
    ],
    whyChoose: [
      { title: 'Cost-Effective', desc: 'An economical alternative for applications where whole grain shape is not required.', icon: '💰' },
      { title: 'Silky Sortexed', desc: 'Thoroughly cleaned and polished for a bright white, premium appearance.', icon: '✨' },
      { title: 'Versatile Application', desc: 'Suitable for food processing, brewing, flour milling, and animal feed.', icon: '🏭' },
      { title: 'High Volume Supply', desc: 'Consistent, large-volume availability for industrial buyers.', icon: '📈' }
    ]
  },

  'sona-masoori-old': {
    id: 'sona-masoori-old',
    name: 'Sona Masoori Raw Rice (Old Crop)',
    tag: 'Non-Basmati',
    heroTagline: 'Aged for Perfect Cooking',
    shortDesc: 'Aged/Old Crop Sona Masoori Raw Rice. Lower moisture, better yield, and non-sticky texture.',
    longDesc: [
      'Sona Masoori Raw Rice (Old Crop) is premium rice that has been carefully aged for 12 to 18 months in controlled warehouse conditions. The aging process is crucial for high-quality rice as it significantly reduces the moisture content and changes the physicochemical properties of the grain.',
      'Unlike new crop rice which can turn sticky and mushy when cooked, our Old Crop Sona Masoori cooks perfectly. The grains remain separate, fluffy, and expand significantly, offering a much higher yield per kilogram. It also absorbs flavors and gravies much more effectively.',
      'SAI Import Export Agro ensures that our aged Sona Masoori is stored safely to prevent any infestation while developing its mature characteristics. It is the preferred choice for households and restaurants that demand the perfect, non-sticky rice for everyday meals.'
    ],
    image: 'images/sona-masoori-old.webp',
    specs: {
      price: '$0.51 / kg',
      moq: '25 MT',
      hsCode: '1006.30',
      shelfLife: '24 months',
      origin: 'India',
      grade: 'Premium Aged (12+ Months)',
      loadPerContainer: '24 MT (20ft FCL)'
    },
    specTable: [
      { param: 'Grain Type', value: 'Medium Grain' },
      { param: 'Age', value: '12 - 18 Months' },
      { param: 'Moisture', value: '12% Max' },
      { param: 'Broken Grains', value: '5% Max' },
      { param: 'Discolor/Damage', value: '1% Max' },
      { param: 'Foreign Matter', value: 'Nil' },
      { param: 'Variant', value: 'Raw (Aged)' },
      { param: 'Packaging', value: '10kg / 25kg / 50kg' }
    ],
    packaging: [
      { type: 'Non-Woven Bags', sizes: '10kg / 25kg', icon: '🛍️', desc: 'Premium retail bags denoting "Old Crop"' },
      { type: 'PP Bags', sizes: '25kg / 50kg', icon: '📦', desc: 'Standard bulk packaging' },
      { type: 'Jute Bags', sizes: '25kg', icon: '🧶', desc: 'Traditional packaging for aged rice' },
      { type: 'Private Label', sizes: 'Custom', icon: '🏷️', desc: 'Custom branding for your market' }
    ],
    whyChoose: [
      { title: 'Perfectly Aged', desc: 'Aged for over a year to ensure a non-sticky, fluffy texture upon cooking.', icon: '⏳' },
      { title: 'Higher Yield', desc: 'Aged rice expands more when cooked, providing more servings per kilogram.', icon: '📈' },
      { title: 'Better Absorption', desc: 'Absorbs water and flavors better, enhancing the taste of curries and dishes.', icon: '🍛' },
      { title: 'Premium Quality', desc: 'Sortex cleaned and carefully stored to maintain the highest export standards.', icon: '⭐' }
    ]
  }

};

// This will be populated from Supabase DB. Falls back to static data above.
let PRODUCT_DETAILS = {};

async function loadProductsFromDB() {
  // Start with static data as base
  PRODUCT_DETAILS = JSON.parse(JSON.stringify(PRODUCT_DETAILS_STATIC));

  if (typeof saiDB === 'undefined') return;

  try {
    const { data, error } = await saiDB.from('products').select('*').order('id');
    if (error || !data || data.length === 0) return;

    // Merge DB products: DB overrides basic fields, static provides extended fields
    data.forEach(p => {
      const existing = PRODUCT_DETAILS[p.id] || {};
      PRODUCT_DETAILS[p.id] = {
        ...existing,
        id: p.id,
        name: p.name || existing.name,
        tag: p.tag || existing.tag,
        shortDesc: p.short_desc || existing.shortDesc,
        longDesc: p.description ? [p.description] : existing.longDesc,
        image: p.img || existing.image,
        specs: {
          ...(existing.specs || {}),
          ...(p.specs || {})
        },
        // Keep extended fields from static if available
        heroTagline: existing.heroTagline || p.name,
        specTable: existing.specTable || [],
        packaging: existing.packaging || [],
        whyChoose: existing.whyChoose || []
      };
    });
  } catch (err) {
    console.warn('Failed to load products from DB, using static fallback:', err);
  }
}
