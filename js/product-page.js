// ==================== PRODUCT PAGE RENDERER ====================

(async function () {
  // Get product ID from URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  let p = PRODUCT_DETAILS[productId];

  // Try to fetch from Supabase if keys are set
  if (saiDB && typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
    try {
      const { data, error } = await saiDB.from('products').select('*').eq('id', productId).single();
      if (!error && data) {
        p = {
          ...(p || { longDesc: [], packaging: [], whyChoose: [], specTable: [] }), // Merge local static assets if available
          id: data.id,
          name: data.name,
          tag: data.tag,
          shortDesc: data.short_desc,
          longDesc: data.description ? [data.description] : (p?.longDesc || []),
          image: data.img || p?.image,
          specs: data.specs || p?.specs || {}
        };
      }
    } catch (e) {
      console.warn("Supabase fetch failed, using local fallback.", e);
    }
  }

  if (!p || !p.name) {
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;font-family:Inter,sans-serif;">
        <h1 style="font-size:3rem;color:#e8772e;margin-bottom:1rem;">404</h1>
        <p style="color:#555;margin-bottom:2rem;">Product not found.</p>
        <a href="index.html#products" style="color:#1a5c38;font-weight:600;">← Back to Products</a>
      </div>`;
    return;
  }

  // SEO — Title & Meta
  const titleText = p.specs?.seo_title || `${p.name} Exporter India | SAI Import Export Agro`;
  const descText = p.specs?.seo_desc || `${p.shortDesc} Export from India with SAI. ${p.specs?.moq || ''} MOQ.`;
  const imgUrl = window.location.origin + '/' + p.image;
  const currentUrl = window.location.href;

  document.getElementById('page-title').textContent = titleText;
  document.getElementById('page-desc').setAttribute('content', descText);

  // Update Open Graph Tags
  const ogTitle = document.getElementById('og-title');
  if(ogTitle) ogTitle.setAttribute('content', titleText);
  const ogDesc = document.getElementById('og-desc');
  if(ogDesc) ogDesc.setAttribute('content', descText);
  const ogImage = document.getElementById('og-image');
  if(ogImage) ogImage.setAttribute('content', imgUrl);
  const ogUrl = document.getElementById('og-url');
  if(ogUrl) ogUrl.setAttribute('content', currentUrl);
  
  // Update Twitter Tags
  const twTitle = document.getElementById('tw-title');
  if(twTitle) twTitle.setAttribute('content', titleText);
  const twDesc = document.getElementById('tw-desc');
  if(twDesc) twDesc.setAttribute('content', descText);
  const twImage = document.getElementById('tw-image');
  if(twImage) twImage.setAttribute('content', imgUrl);
  const twUrl = document.getElementById('tw-url');
  if(twUrl) twUrl.setAttribute('content', currentUrl);

  // Breadcrumb
  document.getElementById('breadcrumb-name').textContent = p.name;

  // Hero
  document.getElementById('pdp-image').src = p.image;
  document.getElementById('pdp-image').alt = p.name;
  document.getElementById('pdp-tag').textContent = p.tag;
  document.getElementById('pdp-name').textContent = p.name;
  document.getElementById('pdp-tagline').textContent = p.heroTagline || '';
  document.getElementById('pdp-short-desc').textContent = p.shortDesc;

  // Price & Variants
  if (p.specs && p.specs.variants && p.specs.variants.length > 0) {
    // Hide default simple price
    document.getElementById('pdp-price-wrapper').classList.add('hidden');
    // Show variants section
    document.getElementById('pdp-variants-section').classList.remove('hidden');
    
    // Render variants table
    const tbody = document.getElementById('pdp-variants-tbody');
    tbody.innerHTML = p.specs.variants.map((v, i) => `
      <tr class="${i % 2 === 0 ? 'even' : 'odd'}">
        <td><strong>${v.name}</strong></td>
        <td style="color:var(--orange); font-weight:600;">${v.price}</td>
      </tr>
    `).join('');
  } else if (p.specs && p.specs.price) {
    document.getElementById('pdp-price').textContent = p.specs.price;
    document.getElementById('pdp-price-wrapper').classList.remove('hidden');
    document.getElementById('pdp-variants-section')?.classList.add('hidden');
  } else {
    document.getElementById('pdp-price-wrapper').classList.add('hidden');
    document.getElementById('pdp-variants-section')?.classList.add('hidden');
  }

  // Update WhatsApp link with product name
  const waLink = document.querySelector('.btn-whatsapp');
  if (waLink) {
    waLink.href = `https://wa.me/918595827184?text=Hello%20FARMEXO,%20I%20am%20interested%20in%20your%20${encodeURIComponent(p.name)}.%20Please%20share%20pricing%20and%20details.`;
  }

  // Key Specs Grid
  const specsHTML = Object.entries(p.specs)
    .filter(([key]) => key !== 'price')
    .map(([key, val]) => {
    const labels = {
      moq: 'MOQ', hsCode: 'HS Code', shelfLife: 'Shelf Life',
      origin: 'Origin', grade: 'Grade', loadPerContainer: 'Container Load'
    };
    const icons = {
      moq: '📦', hsCode: '📄', shelfLife: '⏳',
      origin: '📍', grade: '⭐', loadPerContainer: '🚢'
    };
    return `<div class="key-spec-item">
      <span class="ks-icon">${icons[key] || '📋'}</span>
      <div><span class="ks-label">${labels[key] || key}</span><span class="ks-value">${val}</span></div>
    </div>`;
  }).join('');
  document.getElementById('pdp-key-specs').innerHTML = specsHTML;

  // Long Description
  document.getElementById('pdp-long-desc').innerHTML = p.longDesc.map(para => `<p>${para}</p>`).join('');

  // Spec Table
  document.getElementById('pdp-spec-tbody').innerHTML = p.specTable.map((row, i) =>
    `<tr class="${i % 2 === 0 ? 'even' : 'odd'}"><td>${row.param}</td><td>${row.value}</td></tr>`
  ).join('');

  // Packaging Grid
  document.getElementById('pdp-packaging-grid').innerHTML = p.packaging.map(pkg =>
    `<div class="pkg-card">
      <span class="pkg-icon">${pkg.icon}</span>
      <h3>${pkg.type}</h3>
      <p class="pkg-sizes">${pkg.sizes}</p>
      <p class="pkg-desc">${pkg.desc}</p>
    </div>`
  ).join('');

  // Why Choose Grid
  document.getElementById('pdp-why-grid').innerHTML = p.whyChoose.map(item =>
    `<div class="why-card">
      <span class="why-icon">${item.icon}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>`
  ).join('');

  // Quote section — product name
  document.getElementById('quote-product-name').textContent = p.name;

  // Related Products
  const relatedHTML = Object.values(PRODUCT_DETAILS)
    .filter(rp => rp.id !== productId)
    .map(rp => `
      <a href="product.html?id=${rp.id}" class="related-card">
        <div class="related-card-img"><img src="${rp.image}" alt="${rp.name}" loading="lazy"></div>
        <div class="related-card-body">
          <span class="product-tag">${rp.tag}</span>
          <h3>${rp.name}</h3>
          <span class="related-link">View Details →</span>
        </div>
      </a>
    `).join('');
  document.getElementById('pdp-related-grid').innerHTML = relatedHTML;

  // Quote Form — set hidden product name and email subject
  const quoteForm = document.getElementById('quote-form');
  const qfProduct = document.getElementById('qf-product');
  const qfSubject = document.getElementById('qf-subject');
  if (qfProduct) qfProduct.value = p.name;
  if (qfSubject) qfSubject.value = `🌾 Quote Request: ${p.name} — FARMEXO`;

  // Handle submit with AJAX (FormSubmit.co in background)
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(quoteForm);

      try {
        const response = await fetch(quoteForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          btn.textContent = '✅ Inquiry Sent Successfully!';
          btn.style.background = '#1a5c38';
          quoteForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
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
    });
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('mobile-open')));

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.pdp-description, .pdp-specs, .pdp-packaging, .pdp-certifications, .pdp-why-choose, .pdp-quote, .pdp-related').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
  });

  // Force Google Translate to re-translate the newly injected dynamic content
  setTimeout(() => {
    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl && selectEl.value) {
      selectEl.dispatchEvent(new Event('change'));
    }
  }, 500); // slight delay to ensure DOM is ready and Google Translate is loaded

})();
