// ==================== PRODUCT DATA ====================
const PRODUCT_IMAGES = {
  '1121-basmati': 'images/1121-basmati.webp',
  '1509-basmati': 'images/1509-basmati.webp',
  'sona-masoori': 'images/sona-masoori.webp',
  'pusa-basmati': 'images/pusa-basmati.webp',
  '1401-basmati': 'images/1401-basmati.webp',
  'swarna-raw': 'images/swarna-raw.webp',
  'ir64-parboiled': 'images/ir64-parboiled.webp',
  'jeerakasala': 'images/jeerakasala.webp',
  'broken-rice': 'images/broken-rice.webp',
  'sona-masoori-old': 'images/sona-masoori-old.webp'
};

// Products array removed, falling back to PRODUCT_DETAILS from product-data.js

// ==================== DYNAMIC HERO ====================
async function loadHeroSection() {
  if (typeof saiDB === 'undefined') return;
  try {
    const { data, error } = await saiDB.from('site_settings').select('*').eq('key', 'hero').single();
    if (!error && data && data.value) {
      const v = data.value;
      if (v.bg_img) {
        const heroImg = document.getElementById('hero-img');
        if (heroImg) heroImg.src = v.bg_img;
      }
      if (v.tagline) {
        const tag = document.getElementById('hero-tag');
        if (tag) tag.textContent = v.tagline;
      }
      if (v.heading) {
        const head = document.getElementById('hero-head');
        if (head) head.innerHTML = v.heading; // allow <br> and <em>
      }
      if (v.subheading) {
        const sub = document.getElementById('hero-sub');
        if (sub) sub.textContent = v.subheading;
      }
      if (v.cta_text && v.cta_link) {
        const btn = document.getElementById('hero-btn');
        if (btn) {
          btn.textContent = v.cta_text;
          btn.href = v.cta_link;
        }
      }
    }
  } catch (e) {
    console.warn("Failed to load hero from Supabase, using local fallback.", e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  loadHeroSection();
  // Load products from Supabase (falls back to static data)
  if (typeof loadProductsFromDB === 'function') await loadProductsFromDB();
  renderProducts();
  buildProductInterestCheckboxes();
  buildFooterProducts();
  loadFormEmail();
  loadGeminiSetting();
});

let IS_GEMINI_CONFIGURED = false;

// Check if Gemini API is configured in Supabase
async function loadGeminiSetting() {
  if (typeof saiDB === 'undefined') return;
  try {
    const { data } = await saiDB.from('site_settings').select('value').eq('key', 'gemini').single();
    if (data && data.value && data.value.apikey) {
      IS_GEMINI_CONFIGURED = true;
    }
  } catch (e) {
    IS_GEMINI_CONFIGURED = false;
  }
}

// ==================== FORM SUBMISSION VIA RESEND ====================
let ADMIN_EMAIL = 'saiimportexportagro0@gmail.com'; // Default fallback

async function loadFormEmail() {
  if (typeof saiDB === 'undefined') return;
  try {
    const { data } = await saiDB.from('site_settings').select('value').eq('key', 'form_email').single();
    if (data && data.value && data.value.email) ADMIN_EMAIL = data.value.email;
  } catch (e) { /* use default */ }

  // Intercept all forms with formsubmit action and handle via our API
  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"], .btn-cta');
      const origText = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      const formData = new FormData(form);
      const payload = {
        to: ADMIN_EMAIL,
        name: formData.get('Name') || formData.get('name') || '',
        email: formData.get('Email') || formData.get('email') || '',
        phone: formData.get('Phone') || formData.get('phone') || '',
        company: formData.get('Company') || formData.get('company') || '',
        country: formData.get('Country') || formData.get('country') || '',
        message: formData.get('Message') || formData.get('message') || '',
        source: formData.get('_subject') || 'Website Inquiry',
        subject: formData.get('_subject') || '🍚 New SAI Import Export Agro Inquiry'
      };

      // Collect selected products
      const products = formData.getAll('Products');
      if (products.length) payload.products = products.join(', ');
      if (formData.get('Product')) payload.products = formData.get('Product');

      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          window.location.href = 'thank-you.html';
        } else {
          throw new Error('API failed');
        }
      } catch (err) {
        // Fallback: submit via FormSubmit if our API fails
        console.warn('Resend API failed, falling back to FormSubmit');
        form.removeEventListener('submit', arguments.callee);
        form.submit();
      } finally {
        if (btn) { btn.textContent = origText; btn.disabled = false; }
      }
    });
  });
}

// Dynamically build Product Interest checkboxes from PRODUCT_DETAILS
function buildProductInterestCheckboxes() {
  const container = document.getElementById('product-interest-container');
  if (!container || typeof PRODUCT_DETAILS === 'undefined') return;

  const allProducts = Object.values(PRODUCT_DETAILS).map(p => p.name);
  const VISIBLE_COUNT = 5;
  const mainProducts = allProducts.slice(0, VISIBLE_COUNT);
  const moreProducts = allProducts.slice(VISIBLE_COUNT);

  // Build main grid
  const mainGrid = document.createElement('div');
  mainGrid.className = 'checkbox-grid';
  mainProducts.forEach(name => {
    mainGrid.innerHTML += `<label class="checkbox-label"><input type="checkbox" name="Products" value="${name}"> ${name}</label>`;
  });

  // Add "More..." toggle if extra products exist
  if (moreProducts.length > 0) {
    const moreBtn = document.createElement('label');
    moreBtn.className = 'checkbox-label more-toggle';
    moreBtn.style.cssText = 'color:var(--green); font-weight:600; cursor:pointer;';
    moreBtn.textContent = '+ More...';
    mainGrid.appendChild(moreBtn);

    // Build hidden extra grid
    const moreGrid = document.createElement('div');
    moreGrid.className = 'checkbox-grid';
    moreGrid.style.cssText = 'display:none; margin-top:8px;';
    moreProducts.forEach(name => {
      moreGrid.innerHTML += `<label class="checkbox-label"><input type="checkbox" name="Products" value="${name}"> ${name}</label>`;
    });

    moreBtn.addEventListener('click', () => {
      moreBtn.style.display = 'none';
      moreGrid.style.display = '';
    });

    container.appendChild(mainGrid);
    container.appendChild(moreGrid);
  } else {
    container.appendChild(mainGrid);
  }
}

// Dynamically build footer product quick links from PRODUCT_DETAILS
function buildFooterProducts() {
  const footerList = document.getElementById('footer-products-list');
  if (!footerList || typeof PRODUCT_DETAILS === 'undefined') return;

  const allProducts = Object.entries(PRODUCT_DETAILS);
  const FOOTER_VISIBLE = 5;

  allProducts.slice(0, FOOTER_VISIBLE).forEach(([id, p]) => {
    footerList.innerHTML += `<li><a href="product.html?id=${id}">${p.name}</a></li>`;
  });

  if (allProducts.length > FOOTER_VISIBLE) {
    const moreLi = document.createElement('li');
    const moreLink = document.createElement('a');
    moreLink.href = '#';
    moreLink.textContent = '+ More...';
    moreLink.style.cssText = 'color:var(--orange); font-weight:600;';
    moreLi.appendChild(moreLink);
    footerList.appendChild(moreLi);

    moreLink.addEventListener('click', (e) => {
      e.preventDefault();
      moreLi.remove();
      allProducts.slice(FOOTER_VISIBLE).forEach(([id, p]) => {
        footerList.innerHTML += `<li><a href="product.html?id=${id}">${p.name}</a></li>`;
      });
    });
  }
}

// ==================== RENDER PRODUCTS ====================
const productContainer = document.getElementById('product-container');

async function renderProducts() {
  if (!productContainer) return;
  
  let productsToRender = Object.values(PRODUCT_DETAILS).map(p => {
    let displayPrice = p.specs?.price || '';
    if (p.specs?.variants && p.specs.variants.length > 0) {
      if (p.specs.variants.length === 1) {
        displayPrice = p.specs.variants[0].price;
      } else {
        displayPrice = p.specs.variants.length + ' variants available';
      }
    }
    return {
      id: p.id,
      name: p.name,
      tag: p.tag,
      desc: p.shortDesc,
      price: displayPrice,
      img: p.image
    };
  });
  
  // Try to fetch from Supabase if keys are set
  if (saiDB && typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
    try {
      const { data, error } = await saiDB.from('products').select('*');
      if (!error && data && data.length > 0) {
        productsToRender = data.map(p => {
          let displayPrice = p.specs?.price || '';
          if (p.specs?.variants && p.specs.variants.length > 0) {
            if (p.specs.variants.length === 1) {
              displayPrice = p.specs.variants[0].price;
            } else {
              displayPrice = p.specs.variants.length + ' variants available';
            }
          }
          return {
            id: p.id,
            name: p.name,
            tag: p.tag,
            desc: p.short_desc || p.description,
            price: displayPrice,
            img: p.img
          };
        });
      }
    } catch (e) {
      console.warn("Supabase fetch failed, using local fallback.", e);
    }
  }

  productContainer.innerHTML = '';
  productsToRender.forEach((p, index) => {
    const card = document.createElement('div');
    const imageSrc = p.img || PRODUCT_IMAGES[p.id]; // Fallback to local image mapping if missing
    
    card.className = `product-card`;
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="product-card-img">
        <img src="${imageSrc}" alt="${p.name}" loading="lazy">
        <div class="product-img-overlay"><span>View Details →</span></div>
      </a>
      <div class="product-card-body">
        <span class="product-tag">${p.tag}</span>
        <h3><a href="product.html?id=${p.id}" style="color:inherit;">${p.name}</a></h3>
        ${p.price ? `<div style="color:var(--green-dark);font-weight:700;font-size:1.1rem;margin:5px 0;">${p.price}</div>` : ''}
        <p>${p.desc}</p>
        <div class="product-actions" style="display:flex;gap:0.5rem;">
          <a href="product.html?id=${p.id}" class="product-btn" style="text-align:center;flex:1;">View Details →</a>
          <button class="product-btn" style="background:var(--orange);flex:1;" onclick="openCheckout('${p.id}')">Get Quote</button>
        </div>
      </div>`;
    productContainer.appendChild(card);
  });
}



// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

// Check if we are on the homepage (index.html or root)
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Background toggle + top bar hide
  const scrolled = currentScrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
  const topBar = document.getElementById('top-bar');
  if (topBar) topBar.style.transform = scrolled ? 'translateY(-100%)' : 'translateY(0)';
  
  // Hide on scroll down, show on scroll up (ONLY for subpages)
  if (!isHomePage) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
  }
  
  lastScrollY = currentScrollY;
});

// ==================== HAMBURGER ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('mobile-open')));
}

// ==================== SCROLL ANIMATIONS ====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.animate-in, .animate-scale, .animate-left, .animate-right').forEach(el => observer.observe(el));

// ==================== STAT COUNTER ====================
let statsCounted = false;
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsCounted) {
    statsCounted = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = +el.dataset.target;
      const step = Math.ceil(target / 60);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString();
      }, 30);
    });
  }
}, { threshold: 0.5 });
const statsRibbon = document.querySelector('.stats-ribbon');
if (statsRibbon) statsObserver.observe(statsRibbon);

// ==================== CHECKOUT MODAL ====================
const modal = document.getElementById('checkout-modal');
const modalTitle = document.getElementById('checkout-title');
const modalClose = document.getElementById('modal-close');
const cancelBtn = document.getElementById('cancel-checkout');
const confirmBtn = document.getElementById('confirm-checkout');
let selectedProduct = null;

if (modal) {
  window.openCheckout = function (id) {
    selectedProduct = products.find(p => p.id === id);
    modalTitle.textContent = selectedProduct.name;
    modal.classList.add('active');
  };
  [modalClose, cancelBtn].forEach(b => b.addEventListener('click', () => modal.classList.remove('active')));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  confirmBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    openChat();
    setTimeout(() => {
      addMsg(`I'm interested in ${selectedProduct.name}. Please share FOB pricing and MOQ details.`, 'user');
      setTimeout(() => addMsg(`Thank you for your interest in our ${selectedProduct.name}! Our export team will prepare a quote. Could you share your destination port?`, 'bot'), 800);
    }, 400);
  });
}

// ==================== CHATBOT (GEMINI AI) ====================
// The API Key is securely managed in Supabase and accessed via the /api/chat backend

function buildProductsText() {
  if (typeof PRODUCT_DETAILS === 'undefined' || !Object.keys(PRODUCT_DETAILS).length) return 'Products info will be loaded dynamically.';
  return Object.values(PRODUCT_DETAILS).map(p => `
[Product: ${p.name}]
Tagline: ${p.heroTagline || p.name}
Description: ${p.shortDesc || ''}
Specifications: MOQ: ${p.specs?.moq || 'N/A'}, HS Code: ${p.specs?.hsCode || 'N/A'}, Origin: ${p.specs?.origin || 'India'}, Shelf Life: ${p.specs?.shelfLife || 'N/A'}, Grade: ${p.specs?.grade || 'N/A'}, Load: ${p.specs?.loadPerContainer || 'N/A'}
Packaging Options: ${(p.packaging || []).map(pkg => pkg.type).join(' | ') || 'Standard export packaging'}
Why Choose Us for this: ${(p.whyChoose || []).map(w => w.title).join(', ') || 'Premium quality'}
`).join('\n');
}

function getSystemPrompt() {
  return `You are the AI sales assistant for SAI Import Export Agro, a leading Indian exporter of premium rice. You are helpful, professional, and highly knowledgeable.

IMPORTANT: You must always reply in the SAME language the user is speaking.

Our Detailed Product Knowledge Base:
${buildProductsText()}

Company & Export Information:
- Shipping ports: Nhava Sheva (Mumbai), Mundra, Haldia, Chennai
- Certifications: FSSAI, APEDA registered, ISO 22000, HACCP Compliant
- Payment terms: LC at sight, T/T (30% advance)
- Incoterms: FOB, CIF, CFR available
- Contact: saiimportexportagro0@gmail.com | +91 85958 27184

Rules:
- Keep responses concise (2-4 sentences max). Do not write long paragraphs.
- Be warm, professional, and convincing.
- If asked about MOQ, HS codes, packaging, or specs, provide the exact details from the Knowledge Base above.

LEAD COLLECTION PROCESS:
If a user wants a quote or pricing, you MUST gently collect their details step-by-step in a conversational way. Do not ask everything at once.

Step 1: Ask for their FULL NAME.
  - VALIDATION: A valid name must look like an actual human name (e.g. "Ahmed Khan", "John", "Priya Sharma").
  - If the user replies with a greeting (like "hello", "hi", "hey"), a question, a random word (like "asdf", "test", "ok"), a number, or anything that does NOT look like a real person's name — DO NOT accept it as a name. Politely say something like: "That doesn't seem like a name 😊 Could you please share your actual name so we can personalize your quote?"
  - Only move to Step 2 once you have a genuine-looking name.

Step 2: Ask for their BUSINESS EMAIL.
  - VALIDATION: A valid email MUST contain an "@" symbol and a domain (e.g. "name@company.com").
  - If the user provides something without "@" or something clearly fake (like "abc", "123", "noemail"), DO NOT accept it. Politely ask again: "That doesn't look like a valid email address. Could you please share your business email? (example: john@company.com)"
  - Only move to Step 3 once you have a properly formatted email.

Step 3: Ask for their exact REQUIREMENTS.
  - VALIDATION: Requirements should include at least a product name. Ideally also quantity and destination.
  - If the user gives a very vague answer like "everything" or "all" or just "yes", ask them to be specific: "Could you tell me which specific products you need, the approximate quantity (in MT), and your destination port? This helps us prepare an accurate quote."
  - If they mention a product but not quantity/port, that is acceptable — proceed with what they provided.

CRITICAL: Do NOT use the [LEAD_COLLECTED] block until ALL three fields (Name, Email, Requirements) pass validation. Never include fake/placeholder data.

Once you have ALL THREE validated pieces of information, you MUST append the following exact block at the very end of your reply (fill in the real collected variables):
[LEAD_COLLECTED]
Name: {user_name}
Email: {user_email}
Requirements: {user_requirements}
[/LEAD_COLLECTED]
After appending this block, thank them and tell them the sales team will email them a custom quote within 24 hours.`;
}

const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const chatField = document.getElementById('chat-input-field');
const sendBtn = document.getElementById('send-chat');

let chatHistory = [];

function openChat() { if (chatWindow) chatWindow.classList.add('active'); }
if (chatToggle) {
  chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
}
if (closeChat) {
  closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));
}

function addMsg(text, sender) {
  const d = document.createElement('div');
  d.className = `chat-message ${sender}`;
  // Basic markdown parsing for bold and line breaks
  let parsedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsedText = parsedText.replace(/\n/g, '<br>');
  d.innerHTML = `<p>${parsedText}</p>`;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
  return d;
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'chat-message bot typing-indicator';
  d.innerHTML = '<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>';
  d.id = 'typing-dots';
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
  const dots = document.getElementById('typing-dots');
  if (dots) dots.remove();
}

// Static fallback replies (used when API key not set or API fails)
const fallbackReplies = {
  '1121': 'Our 1121 Basmati has an extraordinary grain length (8.30mm+). Available in Sella and Steam. MOQ is 25 MT.',
  '1509': '1509 Basmati offers excellent length and value. Available in Sella and Steam. MOQ is 25 MT.',
  'sona': 'We supply premium Sona Masoori (Steam and Old Crop Raw). Excellent for daily use. MOQ is 25 MT.',
  'swarna': 'Our Swarna Raw rice is a highly affordable short-grain variety. MOQ is 25 MT.',
  'ir64': 'We export premium IR 64 Parboiled rice, a global staple. MOQ is 25 MT.',
  'broken': 'We offer silky sortexed 100% broken white rice for industrial/feed use. MOQ is 25 MT.',
  'moq': 'Our Minimum Order Quantity (MOQ) for all rice varieties is 25 MT (One 20ft container).',
  'shipping': 'We ship from Nhava Sheva, Mundra, Haldia, and Chennai ports.',
  'port': 'Our main export ports are Nhava Sheva, Mundra, Haldia, and Chennai.',
  'price': "Pricing depends on product, quantity, and destination. Share your requirements and we'll prepare a custom FOB/CIF quote!",
  'quote': 'To prepare a quote I need: 1) Product, 2) Quantity, 3) Destination port. You can also email us at saiimportexportagro0@gmail.com',
  'payment': 'We accept LC at sight and T/T (30% advance, 70% against BL copy).',
  'certificate': 'We hold FSSAI, APEDA registration, and ISO 22000 certifications.',
  'hello': 'Hello! Welcome to SAI Import Export Agro. How can I help you today? 😊',
  'hi': 'Hi there! 👋 Ask me about any of our premium rice varieties — 1121 Basmati, Sona Masoori, and more!'
};

function getFallbackReply(msg) {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(fallbackReplies)) {
    if (lower.includes(key)) return reply;
  }
  return "Thanks for your message! For detailed inquiries, please email us at saiimportexportagro0@gmail.com or call +91 85958 27184. I can also help with product info, MOQ, or shipping details!";
}

async function getGeminiReply(userMsg) {
  // If API key not configured, use fallback
  if (!IS_GEMINI_CONFIGURED) {
    return getFallbackReply(userMsg);
  }

  // Add user message to history
  chatHistory.push({ role: 'user', parts: [{ text: userMsg }] });

  // Keep only last 10 messages to avoid token limits
  const recentHistory = chatHistory.slice(-10);

  try {
    let res;
    // Production & Local: Call our secure serverless function
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: getSystemPrompt() }] },
        contents: recentHistory
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackReply(userMsg);

    // Add bot reply to history
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });

    return reply;
  } catch (err) {
    console.warn('Gemini API error, using fallback:', err);
    return getFallbackReply(userMsg);
  }
}

// Lead generation state: -1=normal AI chat, 0=name, 1=email, 2=products(checkboxes), 3=requirements
let leadState = -1;
let leadData = { name: '', email: '', products: [], requirements: '' };

const CHAT_PRODUCTS_MAIN = ['1121 Basmati', '1509 Basmati', 'Sona Masoori', 'Swarna Raw', 'IR 64 Parboiled'];

function showProductCheckboxes() {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-message bot';
  
  let allProductNames = [];
  if (typeof PRODUCT_DETAILS !== 'undefined') {
    allProductNames = Object.values(PRODUCT_DETAILS).map(p => p.name);
  } else {
    allProductNames = CHAT_PRODUCTS_MAIN;
  }

  const mainNamesLower = CHAT_PRODUCTS_MAIN.map(n => n.toLowerCase());
  const moreProducts = allProductNames.filter(name => {
    return !mainNamesLower.some(main => name.toLowerCase().includes(main) || main.includes(name.toLowerCase()));
  });

  wrapper.innerHTML = `
    <p>Please select the products you're interested in:</p>
    <div class="chat-product-grid" id="main-product-grid" style="display:flex; flex-direction:column; gap:8px; margin-bottom:10px;">
      ${CHAT_PRODUCTS_MAIN.map(p => `
        <label class="chat-checkbox-label">
          <input type="checkbox" value="${p}" class="chat-product-cb"> ${p}
        </label>
      `).join('')}
      ${moreProducts.length > 0 ? `
        <label class="chat-checkbox-label" id="chat-more-btn" style="color:var(--green); font-weight:600; cursor:pointer;">
          + More...
        </label>
      ` : ''}
    </div>
    
    <div class="chat-product-grid" id="more-product-grid" style="display:none; flex-direction:column; gap:8px; margin-bottom:10px; padding-top:10px; border-top:1px solid #eee;">
      ${moreProducts.map(p => `
        <label class="chat-checkbox-label">
          <input type="checkbox" value="${p}" class="chat-product-cb"> ${p}
        </label>
      `).join('')}
    </div>
    <button class="chat-product-submit" id="chat-product-submit">Confirm Selection →</button>
  `;
  chatBody.appendChild(wrapper);
  chatBody.scrollTop = chatBody.scrollHeight;

  const moreBtn = wrapper.querySelector('#chat-more-btn');
  const moreGrid = wrapper.querySelector('#more-product-grid');
  if (moreBtn && moreGrid) {
    moreBtn.addEventListener('click', () => {
      moreBtn.style.display = 'none';
      moreGrid.style.display = 'flex';
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }

  // Hide text input during checkbox step
  chatField.style.display = 'none';
  sendBtn.style.display = 'none';

  document.getElementById('chat-product-submit').addEventListener('click', () => {
    const checked = wrapper.querySelectorAll('.chat-product-cb:checked');
    const selected = Array.from(checked).map(cb => cb.value);

    if (selected.length === 0) {
      alert('Please select at least one product.');
      return;
    }

    leadData.products = selected;

    // Show user's selection as a message
    addMsg(`Selected: ${selected.join(', ')}`, 'user');

    // Disable checkboxes after submit
    wrapper.querySelectorAll('.chat-product-cb').forEach(cb => cb.disabled = true);
    document.getElementById('chat-product-submit').disabled = true;
    document.getElementById('chat-product-submit').style.opacity = '0.5';

    // Restore text input
    chatField.style.display = '';
    sendBtn.style.display = '';

    leadState = 3;
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg(`Great choices! Now please tell us your requirements — quantity needed, destination port, and any packaging preferences.`, 'bot');
      chatField.disabled = false; sendBtn.disabled = false; chatField.focus();
    }, 800);
  });
}

async function sendMessage() {
  const text = chatField.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  chatField.value = '';
  chatField.disabled = true;
  sendBtn.disabled = true;

  showTyping();

  // Normal AI Chat (always active now)
  if (leadState === -1) {
    let reply = await getGeminiReply(text);
    removeTyping();

    // Check if AI completed lead collection
    const leadMatch = reply.match(/\[LEAD_COLLECTED\]([\s\S]*?)\[\/LEAD_COLLECTED\]/);
    if (leadMatch) {
      // Extract the block and remove it from the reply shown to user
      const leadBlock = leadMatch[1];
      reply = reply.replace(leadMatch[0], '').trim();

      // Parse the details
      const nameMatch = leadBlock.match(/Name:\s*(.+)/i);
      const emailMatch = leadBlock.match(/Email:\s*(.+)/i);
      const reqMatch = leadBlock.match(/Requirements:\s*(.+)/i);

      if (nameMatch && emailMatch && reqMatch) {
        const leadName = nameMatch[1].trim();
        const leadEmail = emailMatch[1].trim();
        const leadReqs = reqMatch[1].trim();

        // ========== HARD JAVASCRIPT VALIDATION ==========
        // Email: must match proper email pattern (something@something.something)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(leadEmail);

        // Name: must be 2+ letters, only letters/spaces/hyphens/dots (no numbers, no gibberish)
        const nameRegex = /^[a-zA-Z\u00C0-\u024F\u0900-\u097F\u0600-\u06FF\s.\-']{2,}$/;
        const isValidName = nameRegex.test(leadName) && leadName.length >= 2;

        // Requirements: must be at least 3 chars and not just "yes"/"ok"/"all"
        const badReqs = ['yes', 'ok', 'no', 'all', 'everything', 'anything', 'nothing'];
        const isValidReqs = leadReqs.length >= 3 && !badReqs.includes(leadReqs.toLowerCase());

        if (!isValidEmail || !isValidName || !isValidReqs) {
          // Build a correction message for the AI
          let correctionParts = [];
          if (!isValidName) correctionParts.push(`The name "${leadName}" doesn't look like a real name. Ask for their actual full name again.`);
          if (!isValidEmail) correctionParts.push(`The email "${leadEmail}" is not a valid email address (must be like name@company.com). Ask for a proper business email again.`);
          if (!isValidReqs) correctionParts.push(`The requirements "${leadReqs}" are too vague. Ask them to specify product name, quantity, and destination.`);

          // Inject correction into chat history so AI knows to re-ask
          chatHistory.push({ role: 'user', parts: [{ text: `[SYSTEM VALIDATION FAILED: ${correctionParts.join(' ')} Do NOT use [LEAD_COLLECTED] until you get valid data. Re-ask the invalid fields politely.]` }] });

          // Get a new AI response that re-asks
          showTyping();
          const retryReply = await getGeminiReply('');
          removeTyping();

          // Remove any accidental [LEAD_COLLECTED] from retry
          const cleanRetry = retryReply.replace(/\[LEAD_COLLECTED\][\s\S]*?\[\/LEAD_COLLECTED\]/g, '').trim();
          
          addMsg(cleanRetry || "I noticed some details need correction. Could you please re-share your name, email, or requirements?", 'bot');
          chatField.disabled = false; sendBtn.disabled = false; chatField.focus();
          return;
        }
        // ========== VALIDATION PASSED — SEND EMAIL ==========

        const formData = new FormData();
        formData.append('_subject', '🤖 AI Chatbot Lead — SAI Import Export Agro');
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');
        formData.append('_replyto', leadEmail);
        formData.append('_autoresponse', `Thank you for chatting with SAI Import Export Agro! 🍚\n\nWe have noted your requirements and our export team is preparing a personalized quotation for you.\n\nYou will hear from us within 24 hours.\n\n📧 saiimportexportagro0@gmail.com\n📞 +91 85958 27184\n\nWarm regards,\nSAI Import Export Agro Export Team`);
        formData.append('Name', leadName);
        formData.append('Email', leadEmail);
        formData.append('Requirements', leadReqs);

        const chatQuotation = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 READY-TO-SEND QUOTATION TEMPLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
(Hit Reply and fill the blanks)

Dear ${leadName},

Thank you for your interest in SAI Import Export Agro products. Please find below our quotation:

PROFORMA INVOICE
──────────────────────
Product(s): ${leadReqs}
Quantity: _______ MT
Unit Price (FOB): USD _______ / MT
Unit Price (CIF): USD _______ / MT
Total Value: USD _______
──────────────────────
Incoterm: FOB / CIF
Port of Loading: Nhava Sheva / Mundra
Port of Discharge: _______
Packaging: _______
Payment Terms: LC at Sight / T/T 30% Advance
Validity: 7 days from date of quote
Estimated Shipment: _______ days from confirmation

Certifications: FSSAI | APEDA | ISO 22000 | HACCP

Best regards,
SAI Import Export Agro Export Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

        formData.append('--- QUOTATION TEMPLATE ---', chatQuotation);
        
        fetch('https://formsubmit.co/faisal.khan1192519@gmail.com', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).catch(err => console.error('Chatbot email failed', err));
      }
    }

    addMsg(reply, 'bot');
    chatField.disabled = false; sendBtn.disabled = false; chatField.focus();
    return;
  }

}

// Quick reply buttons (single handler, no duplicates)
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    chatField.value = btn.getAttribute('data-msg');
    sendMessage();
  });
});

// Send button & Enter key
if (sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
}
if (chatField) {
  chatField.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
}

// ==================== CONTACT FORM (AJAX FormSubmit) ====================
// ==================== CONTACT FORM (Supabase + WhatsApp + FormSubmit) ====================
async function handleContactSubmit(e, formElement) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const formData = new FormData(formElement);

  // Set _replyto so owner can Reply directly to the buyer
  const buyerEmail = formData.get('Email') || '';
  if (buyerEmail) formData.append('_replyto', buyerEmail);

  // Add pre-filled quotation template for easy owner reply
  const buyerName = (formData.get('First Name') || '') + ' ' + (formData.get('Last Name') || '');
  const buyerProducts = formData.getAll('Products').join(', ') || 'Not specified';
  const buyerReqs = formData.get('Requirements') || '';
  const buyerCompany = formData.get('Company') || '';

  const quotationTemplate = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 READY-TO-SEND QUOTATION TEMPLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
(Copy-paste this into your Reply and fill the blanks)

Dear ${buyerName.trim()},

Thank you for your interest in SAI Import Export Agro products. Please find below our quotation:

PROFORMA INVOICE
──────────────────────
Product(s): ${buyerProducts}
Quantity: _______ MT
Unit Price (FOB): USD _______ / MT
Unit Price (CIF): USD _______ / MT
Total Value: USD _______
──────────────────────
Incoterm: FOB / CIF (circle one)
Port of Loading: Nhava Sheva / Mundra
Port of Discharge: _______
Packaging: _______
Payment Terms: LC at Sight / T/T 30% Advance
Validity: 7 days from date of quote
Estimated Shipment: _______ days from order confirmation

Certifications Included:
✅ FSSAI ✅ APEDA ✅ ISO 22000 ✅ HACCP
✅ Phytosanitary Certificate ✅ Certificate of Origin

For any questions, contact us:
📧 saiimportexportagro0@gmail.com | 📞 +91 85958 27184

Best regards,
SAI Import Export Agro Export Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  formData.append('--- QUOTATION TEMPLATE ---', quotationTemplate);

  try {
    // 1. Send to FormSubmit
    const formSubmitPromise = fetch(formElement.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    // 2. Save to Supabase Database (Admin Inbox)
    let supabasePromise = Promise.resolve();
    if (typeof saiDB !== 'undefined') {
      supabasePromise = saiDB.from('enquiries').insert({
        name: buyerName.trim(),
        email: buyerEmail,
        phone: formData.get('Phone') || null, // if added in future
        company: buyerCompany || null,
        products: buyerProducts,
        message: buyerReqs,
        status: 'new'
      });
    }

    // 3. Send WhatsApp Notification via CallMeBot
    let waPromise = Promise.resolve();
    if (typeof saiDB !== 'undefined') {
      waPromise = saiDB.from('site_settings').select('*').eq('key', 'whatsapp').single().then(res => {
        if (res.data && res.data.value && res.data.value.phone && res.data.value.apikey) {
          const waPhone = res.data.value.phone.replace(/[^0-9]/g, '');
          const waApi = res.data.value.apikey;
          const waMsg = encodeURIComponent(`*🔔 New Enquiry on Website!*\n\n*👤 Name:* ${buyerName.trim()}\n*📧 Email:* ${buyerEmail}\n*🏢 Company:* ${buyerCompany || 'N/A'}\n*📦 Products:* ${buyerProducts}\n\n*💬 Message:*\n${buyerReqs}`);
          const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${waMsg}&apikey=${waApi}`;
          return fetch(waUrl, { mode: 'no-cors' }); // no-cors because callmebot doesn't set CORS headers
        }
      }).catch(err => console.error("WhatsApp API Error:", err));
    }

    // Wait for everything
    await Promise.all([formSubmitPromise, supabasePromise, waPromise]);

    btn.textContent = '✅ Inquiry Sent Successfully!';
    btn.style.background = '#1a5c38';
    formElement.reset();

  } catch (error) {
    console.error('Error submitting form:', error);
    btn.textContent = '❌ Failed — Try Again';
    btn.style.background = '#c0392b';
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', (e) => handleContactSubmit(e, contactForm));

const contactPageForm = document.getElementById('contact-page-form');
if (contactPageForm) contactPageForm.addEventListener('submit', (e) => handleContactSubmit(e, contactPageForm));

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('nav-active', a.getAttribute('href') === `#${current}`);
  });
});

// ==================== SEARCHABLE LANGUAGE PICKER ====================
const LANGUAGES = [
  { code:'af', name:'Afrikaans', native:'Afrikaans', flag:'🇿🇦' },
  { code:'sq', name:'Albanian', native:'Shqip', flag:'🇦🇱' },
  { code:'am', name:'Amharic', native:'አማርኛ', flag:'🇪🇹' },
  { code:'ar', name:'Arabic', native:'العربية', flag:'🇸🇦' },
  { code:'hy', name:'Armenian', native:'Հայերեն', flag:'🇦🇲' },
  { code:'az', name:'Azerbaijani', native:'Azərbaycan', flag:'🇦🇿' },
  { code:'eu', name:'Basque', native:'Euskara', flag:'🇪🇸' },
  { code:'be', name:'Belarusian', native:'Беларуская', flag:'🇧🇾' },
  { code:'bn', name:'Bengali', native:'বাংলা', flag:'🇧🇩' },
  { code:'bs', name:'Bosnian', native:'Bosanski', flag:'🇧🇦' },
  { code:'bg', name:'Bulgarian', native:'Български', flag:'🇧🇬' },
  { code:'my', name:'Burmese', native:'မြန်မာ', flag:'🇲🇲' },
  { code:'ca', name:'Catalan', native:'Català', flag:'🇪🇸' },
  { code:'zh-CN', name:'Chinese (Simplified)', native:'中文（简体）', flag:'🇨🇳' },
  { code:'zh-TW', name:'Chinese (Traditional)', native:'中文（繁體）', flag:'🇹🇼' },
  { code:'hr', name:'Croatian', native:'Hrvatski', flag:'🇭🇷' },
  { code:'cs', name:'Czech', native:'Čeština', flag:'🇨🇿' },
  { code:'da', name:'Danish', native:'Dansk', flag:'🇩🇰' },
  { code:'nl', name:'Dutch', native:'Nederlands', flag:'🇳🇱' },
  { code:'en', name:'English', native:'English', flag:'🇬🇧' },
  { code:'et', name:'Estonian', native:'Eesti', flag:'🇪🇪' },
  { code:'fi', name:'Finnish', native:'Suomi', flag:'🇫🇮' },
  { code:'fr', name:'French', native:'Français', flag:'🇫🇷' },
  { code:'gl', name:'Galician', native:'Galego', flag:'🇪🇸' },
  { code:'ka', name:'Georgian', native:'ქართული', flag:'🇬🇪' },
  { code:'de', name:'German', native:'Deutsch', flag:'🇩🇪' },
  { code:'el', name:'Greek', native:'Ελληνικά', flag:'🇬🇷' },
  { code:'gu', name:'Gujarati', native:'ગુજરાતી', flag:'🇮🇳' },
  { code:'ht', name:'Haitian Creole', native:'Kreyòl Ayisyen', flag:'🇭🇹' },
  { code:'ha', name:'Hausa', native:'Hausa', flag:'🇳🇬' },
  { code:'he', name:'Hebrew', native:'עברית', flag:'🇮🇱' },
  { code:'hi', name:'Hindi', native:'हिन्दी', flag:'🇮🇳' },
  { code:'hu', name:'Hungarian', native:'Magyar', flag:'🇭🇺' },
  { code:'is', name:'Icelandic', native:'Íslenska', flag:'🇮🇸' },
  { code:'id', name:'Indonesian', native:'Bahasa Indonesia', flag:'🇮🇩' },
  { code:'ga', name:'Irish', native:'Gaeilge', flag:'🇮🇪' },
  { code:'it', name:'Italian', native:'Italiano', flag:'🇮🇹' },
  { code:'ja', name:'Japanese', native:'日本語', flag:'🇯🇵' },
  { code:'jw', name:'Javanese', native:'Basa Jawa', flag:'🇮🇩' },
  { code:'kn', name:'Kannada', native:'ಕನ್ನಡ', flag:'🇮🇳' },
  { code:'kk', name:'Kazakh', native:'Қазақ', flag:'🇰🇿' },
  { code:'km', name:'Khmer', native:'ខ្មែរ', flag:'🇰🇭' },
  { code:'ko', name:'Korean', native:'한국어', flag:'🇰🇷' },
  { code:'ku', name:'Kurdish', native:'Kurdî', flag:'🇮🇶' },
  { code:'lo', name:'Lao', native:'ລາວ', flag:'🇱🇦' },
  { code:'lv', name:'Latvian', native:'Latviešu', flag:'🇱🇻' },
  { code:'lt', name:'Lithuanian', native:'Lietuvių', flag:'🇱🇹' },
  { code:'mk', name:'Macedonian', native:'Македонски', flag:'🇲🇰' },
  { code:'ms', name:'Malay', native:'Bahasa Melayu', flag:'🇲🇾' },
  { code:'ml', name:'Malayalam', native:'മലയാളം', flag:'🇮🇳' },
  { code:'mt', name:'Maltese', native:'Malti', flag:'🇲🇹' },
  { code:'mr', name:'Marathi', native:'मराठी', flag:'🇮🇳' },
  { code:'mn', name:'Mongolian', native:'Монгол', flag:'🇲🇳' },
  { code:'ne', name:'Nepali', native:'नेपाली', flag:'🇳🇵' },
  { code:'no', name:'Norwegian', native:'Norsk', flag:'🇳🇴' },
  { code:'ps', name:'Pashto', native:'پښتو', flag:'🇦🇫' },
  { code:'fa', name:'Persian', native:'فارسی', flag:'🇮🇷' },
  { code:'pl', name:'Polish', native:'Polski', flag:'🇵🇱' },
  { code:'pt', name:'Portuguese', native:'Português', flag:'🇵🇹' },
  { code:'pa', name:'Punjabi', native:'ਪੰਜਾਬੀ', flag:'🇮🇳' },
  { code:'ro', name:'Romanian', native:'Română', flag:'🇷🇴' },
  { code:'ru', name:'Russian', native:'Русский', flag:'🇷🇺' },
  { code:'sr', name:'Serbian', native:'Српски', flag:'🇷🇸' },
  { code:'si', name:'Sinhala', native:'සිංහල', flag:'🇱🇰' },
  { code:'sk', name:'Slovak', native:'Slovenčina', flag:'🇸🇰' },
  { code:'sl', name:'Slovenian', native:'Slovenščina', flag:'🇸🇮' },
  { code:'so', name:'Somali', native:'Soomaali', flag:'🇸🇴' },
  { code:'es', name:'Spanish', native:'Español', flag:'🇪🇸' },
  { code:'su', name:'Sundanese', native:'Basa Sunda', flag:'🇮🇩' },
  { code:'sw', name:'Swahili', native:'Kiswahili', flag:'🇰🇪' },
  { code:'sv', name:'Swedish', native:'Svenska', flag:'🇸🇪' },
  { code:'tl', name:'Tagalog', native:'Tagalog', flag:'🇵🇭' },
  { code:'ta', name:'Tamil', native:'தமிழ்', flag:'🇮🇳' },
  { code:'te', name:'Telugu', native:'తెలుగు', flag:'🇮🇳' },
  { code:'th', name:'Thai', native:'ไทย', flag:'🇹🇭' },
  { code:'tr', name:'Turkish', native:'Türkçe', flag:'🇹🇷' },
  { code:'uk', name:'Ukrainian', native:'Українська', flag:'🇺🇦' },
  { code:'ur', name:'Urdu', native:'اردو', flag:'🇵🇰' },
  { code:'uz', name:'Uzbek', native:'Oʻzbek', flag:'🇺🇿' },
  { code:'vi', name:'Vietnamese', native:'Tiếng Việt', flag:'🇻🇳' },
  { code:'cy', name:'Welsh', native:'Cymraeg', flag:'🏴' },
  { code:'yo', name:'Yoruba', native:'Yorùbá', flag:'🇳🇬' },
  { code:'zu', name:'Zulu', native:'isiZulu', flag:'🇿🇦' }
];

const langPicker = document.getElementById('lang-picker');
const langPickerBtn = document.getElementById('lang-picker-btn');
const langPickerLabel = document.getElementById('lang-picker-label');
const langDropdownEl = document.getElementById('lang-dropdown');
const langSearch = document.getElementById('lang-search');
const langList = document.getElementById('lang-list');
let currentLangCode = 'en';

function renderLangList(filter = '') {
  const q = filter.toLowerCase();
  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q) || l.code.includes(q)
  );
  if (filtered.length === 0) {
    langList.innerHTML = '<div class="lang-no-results">No languages found</div>';
    return;
  }
  langList.innerHTML = filtered.map(l => `
    <button class="lang-item${l.code === currentLangCode ? ' active' : ''}" data-code="${l.code}">
      <span class="lang-item-flag">${l.flag}</span>
      <span class="lang-item-names">
        <span class="lang-item-native">${l.native}</span>
        <span class="lang-item-en">${l.name}</span>
      </span>
      <span class="lang-item-check">✓</span>
    </button>
  `).join('');

  langList.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', () => {
      selectLanguage(item.dataset.code);
      closePicker();
    });
  });
}

function selectLanguage(code, skipReload) {
  currentLangCode = code;
  const lang = LANGUAGES.find(l => l.code === code);
  if (lang) langPickerLabel.textContent = lang.native;

  // Update active state
  langList.querySelectorAll('.lang-item').forEach(item => {
    item.classList.toggle('active', item.dataset.code === code);
  });

  localStorage.setItem('preferred-lang', code);

  // If skipReload is true, just update UI (used on page init)
  if (skipReload) return;

  // Set Google Translate cookie
  if (code === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
  } else {
    document.cookie = 'googtrans=/en/' + code + '; path=/;';
    document.cookie = 'googtrans=/en/' + code + '; path=/; domain=' + window.location.hostname;
  }

  // Reload page for instant translation
  window.location.reload();
}

function openPicker() {
  langPicker.classList.add('open');
  langSearch.value = '';
  renderLangList();
  setTimeout(() => langSearch.focus(), 100);

  // Scroll active item into view
  setTimeout(() => {
    const active = langList.querySelector('.lang-item.active');
    if (active) active.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 150);
}

function closePicker() {
  langPicker.classList.remove('open');
}

langPickerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langPicker.classList.contains('open') ? closePicker() : openPicker();
});

langSearch.addEventListener('input', () => renderLangList(langSearch.value));
langSearch.addEventListener('click', e => e.stopPropagation());

document.addEventListener('click', (e) => {
  if (!langPicker.contains(e.target)) closePicker();
});

// Keyboard navigation
langSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePicker();
  if (e.key === 'Enter') {
    const first = langList.querySelector('.lang-item');
    if (first) { selectLanguage(first.dataset.code); closePicker(); }
  }
});

// ==================== INIT ON PAGE LOAD ====================
(function initLangPicker() {
  const saved = localStorage.getItem('preferred-lang');
  if (saved) {
    // Just update UI state — don't reload (cookie is already set from last selection)
    selectLanguage(saved, true);
  } else {
    // Auto-detect browser language on first visit
    const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
    const match = LANGUAGES.find(l => l.code === browserLang || l.code.startsWith(browserLang));
    if (match && match.code !== 'en') {
      selectLanguage(match.code); // This will set cookie + reload on first visit
    }
  }
  renderLangList();
})();

