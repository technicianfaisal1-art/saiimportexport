// ==================== ADMIN PANEL JS ====================
var loginScreen = document.getElementById('login-screen');
var loginWrapper = document.getElementById('login-wrapper');
var dashboard = document.getElementById('dashboard');
var loginForm = document.getElementById('login-form');
var loginError = document.getElementById('login-error');
var productForm = document.getElementById('product-form');
var blogForm = document.getElementById('blog-form');
var currentProducts = [];
var currentEnquiries = [];
var currentPosts = [];
var pendingImageFile = null;

// ==================== AUTH ====================
async function init() {
    var session = await checkAuth();
    if (session) { showDashboard(); } 
    else { loginWrapper.style.display = 'flex'; dashboard.style.display = 'none'; }
}

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = document.getElementById('login-btn');
    btn.innerText = 'Logging in...';
    try {
        var r = await saiDB.auth.signInWithPassword({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });
        if (r.error) { loginError.style.display = 'block'; loginError.innerText = '❌ ' + r.error.message; btn.innerText = 'Log In'; }
        else { loginError.style.display = 'none'; showDashboard(); }
    } catch(err) { alert('Error: ' + err.message); btn.innerText = 'Log In'; }
});

document.getElementById('logout-btn').addEventListener('click', async function() {
    await saiDB.auth.signOut(); window.location.reload();
});

async function showDashboard() {
    loginWrapper.style.display = 'none'; dashboard.style.display = 'flex';
    loadProducts(); loadEnquiries(); loadBlogPosts(); loadHeroSettings(); loadWhatsAppSettings();
}

// ==================== TABS & SIDEBAR ====================
function switchTab(name) {
    document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.sidebar-nav .nav-btn').forEach(function(b) { b.classList.remove('active'); });
    var targetPanel = document.getElementById('tab-' + name);
    if(targetPanel) targetPanel.classList.add('active');
    var targetBtn = document.getElementById('nav-' + name);
    if(targetBtn) targetBtn.classList.add('active');
    
    // Close sidebar on mobile after clicking
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

async function loadOverviewStats() {
    // These will be updated dynamically as data loads
    document.getElementById('stat-products').innerText = currentProducts.length;
    document.getElementById('stat-enquiries').innerText = currentEnquiries.length;
    document.getElementById('stat-blogs').innerText = currentPosts.length;
}

// ==================== PRODUCTS ====================
async function loadProducts() {
    var tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Loading...</td></tr>';
    var r = await saiDB.from('products').select('*').order('id');
    if (r.error) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:red">Error: '+r.error.message+'</td></tr>'; return; }
    currentProducts = r.data;
    loadOverviewStats();
    if (!currentProducts.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No products. Add one!</td></tr>'; return; }
    tbody.innerHTML = currentProducts.map(function(p) {
        var priceDisplay = 'N/A';
        if (p.specs && p.specs.variants && p.specs.variants.length > 0) {
            if (p.specs.variants.length === 1) priceDisplay = p.specs.variants[0].price;
            else priceDisplay = p.specs.variants.length + ' variants';
        } else if (p.specs && p.specs.price) {
            priceDisplay = p.specs.price;
        }
        return '<tr><td><img src="'+p.img+'" alt="'+p.name+'"></td><td>'+p.id+'</td><td><strong>'+p.name+'</strong></td><td><span class="badge badge-published">'+p.tag+'</span></td><td>'+priceDisplay+'</td><td><div class="actions"><button class="btn-sm btn-edit" onclick="editProduct(\''+p.id+'\')">Edit</button><button class="btn-sm btn-delete" onclick="deleteProduct(\''+p.id+'\')">Del</button></div></td></tr>';
    }).join('');
}

function openProductModal(isEdit) {
    document.getElementById('product-modal').classList.add('active');
    if (!isEdit) { 
        document.getElementById('product-modal-title').innerText = 'Add New Product'; 
        productForm.reset(); 
        document.getElementById('edit-id').value = ''; 
        document.getElementById('p_id').readOnly = false; 
        document.getElementById('variants-container').innerHTML = ''; // Clear variants
        addVariantRow(); // Add one default empty row
        clearImageUpload(); 
    }
}
function closeProductModal() { document.getElementById('product-modal').classList.remove('active'); }

function editProduct(id) {
    var p = currentProducts.find(function(x) { return x.id === id; });
    if (!p) return;
    document.getElementById('product-modal-title').innerText = 'Edit Product';
    document.getElementById('edit-id').value = p.id;
    document.getElementById('p_id').value = p.id; document.getElementById('p_id').readOnly = true;
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_img').value = p.img;
    document.getElementById('p_tag').value = p.tag;
    document.getElementById('p_seo_title').value = p.specs&&p.specs.seo_title||'';
    document.getElementById('p_seo_desc').value = p.specs&&p.specs.seo_desc||'';
    document.getElementById('p_short_desc').value = p.short_desc;
    document.getElementById('p_desc').value = p.description;
    
    // Populate Variants
    var vContainer = document.getElementById('variants-container');
    vContainer.innerHTML = '';
    if (p.specs && p.specs.variants && Array.isArray(p.specs.variants)) {
        p.specs.variants.forEach(function(v) { addVariantRow(v.name, v.price); });
    }
    
    // Clean specs JSON from variants/seo to show raw other specs
    var cleanSpecs = Object.assign({}, p.specs);
    delete cleanSpecs.variants; delete cleanSpecs.seo_title; delete cleanSpecs.seo_desc; delete cleanSpecs.price;
    document.getElementById('p_specs').value = JSON.stringify(cleanSpecs, null, 2);
    
    clearImageUpload();
    openProductModal(true);
}

async function deleteProduct(id) {
    if (!confirm('Delete ' + id + '?')) return;
    var r = await saiDB.from('products').delete().eq('id', id);
    if (r.error) alert('Error: ' + r.error.message); else loadProducts();
}

productForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = document.getElementById('save-btn');
    btn.innerText = 'Saving...';
    if (pendingImageFile) {
        btn.innerText = 'Uploading image...';
        var url = await uploadImageToStorage(document.getElementById('p_id').value);
        if (url) document.getElementById('p_img').value = url;
    }
    var specs = {};
    try { specs = JSON.parse(document.getElementById('p_specs').value); } catch(e) { alert('Invalid JSON in Specs! Must be {}'); btn.innerText = 'Save Product'; return; }
    
    // Extract Variants
    var variantRows = document.querySelectorAll('.variant-row');
    var variants = [];
    variantRows.forEach(function(row) {
        var n = row.querySelector('.var-name').value.trim();
        var p = row.querySelector('.var-price').value.trim();
        if (n || p) variants.push({name: n, price: p});
    });
    if (variants.length > 0) specs.variants = variants;
    
    var seo_title = document.getElementById('p_seo_title').value;
    if (seo_title) specs.seo_title = seo_title; else delete specs.seo_title;
    var seo_desc = document.getElementById('p_seo_desc').value;
    if (seo_desc) specs.seo_desc = seo_desc; else delete specs.seo_desc;
    var r = await saiDB.from('products').upsert({
        id: document.getElementById('p_id').value, name: document.getElementById('p_name').value,
        tag: document.getElementById('p_tag').value, short_desc: document.getElementById('p_short_desc').value,
        description: document.getElementById('p_desc').value, img: document.getElementById('p_img').value, specs: specs
    });
    btn.innerText = 'Save Product';
    if (r.error) alert('Error: ' + r.error.message); else { pendingImageFile = null; closeProductModal(); loadProducts(); }
});

// Dynamic Variants Logic
function addVariantRow(name, price) {
    var vContainer = document.getElementById('variants-container');
    var row = document.createElement('div');
    row.className = 'variant-row';
    row.style = 'display:flex; gap:10px; margin-bottom:8px;';
    row.innerHTML = `
        <input type="text" class="form-control var-name" placeholder="Variant (e.g. Steam)" value="${name || ''}">
        <input type="text" class="form-control var-price" placeholder="Price (e.g. $1.07)" value="${price || ''}">
        <button type="button" class="btn-delete" style="padding:0 10px;" onclick="this.parentElement.remove()">✕</button>
    `;
    vContainer.appendChild(row);
}


// ==================== IMAGE UPLOAD ====================
document.getElementById('img-upload-area').addEventListener('click', function() { document.getElementById('img-file-input').click(); });
var ua = document.getElementById('img-upload-area');
ua.addEventListener('dragover', function(e) { e.preventDefault(); ua.style.borderColor = '#2d5a3c'; ua.style.background = '#ddf0e3'; });
ua.addEventListener('dragleave', function() { ua.style.borderColor = '#4a7c59'; ua.style.background = '#f0f7f2'; });
ua.addEventListener('drop', function(e) { e.preventDefault(); ua.style.borderColor = '#4a7c59'; ua.style.background = '#f0f7f2'; if (e.dataTransfer.files.length) processImageFile(e.dataTransfer.files[0]); });
document.getElementById('img-file-input').addEventListener('change', function(e) { if (e.target.files.length) processImageFile(e.target.files[0]); });

function compressImage(file, maxW, q) {
    return new Promise(function(res) {
        var r = new FileReader(); r.onload = function(e) {
            var img = new Image(); img.onload = function() {
                var c = document.createElement('canvas'), ratio = Math.min(maxW/img.width,1);
                c.width = img.width*ratio; c.height = img.height*ratio;
                c.getContext('2d').drawImage(img,0,0,c.width,c.height);
                c.toBlob(function(b) { res(b); }, 'image/webp', q);
            }; img.src = e.target.result;
        }; r.readAsDataURL(file);
    });
}

async function processImageFile(file) {
    if (!file.type.startsWith('image/')) { alert('Select an image'); return; }
    var orig = (file.size/1024).toFixed(1);
    document.getElementById('img-upload-prompt').style.display = 'none';
    document.getElementById('img-preview-box').style.display = 'block';
    document.getElementById('img-size-info').innerText = 'Compressing...';
    var comp = await compressImage(file, 400, 0.6);
    pendingImageFile = comp;
    document.getElementById('img-preview').src = URL.createObjectURL(comp);
    document.getElementById('img-size-info').innerText = orig + 'KB → ' + (comp.size/1024).toFixed(1) + 'KB ✓ WebP';
}

function clearImageUpload() {
    pendingImageFile = null;
    document.getElementById('img-upload-prompt').style.display = 'block';
    document.getElementById('img-preview-box').style.display = 'none';
    document.getElementById('img-file-input').value = '';
}

async function uploadImageToStorage(pid) {
    if (!pendingImageFile) return null;
    var path = 'products/' + pid + '.webp';
    var r = await saiDB.storage.from('product-images').upload(path, pendingImageFile, { contentType: 'image/webp', upsert: true });
    if (r.error) { alert('Upload failed: ' + r.error.message); return null; }
    return saiDB.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}

// ==================== ENQUIRIES ====================
async function loadEnquiries() {
    var tbody = document.getElementById('enquiry-table-body');
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Loading...</td></tr>';
    var r = await saiDB.from('enquiries').select('*').order('created_at', { ascending: false });
    if (r.error) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:red">'+r.error.message+'</td></tr>'; return; }
    currentEnquiries = r.data;
    loadOverviewStats();
    var newCount = currentEnquiries.filter(function(e) { return e.status === 'new'; }).length;
    var badge = document.getElementById('enquiry-badge');
    if (newCount > 0) { badge.style.display = 'inline'; badge.innerText = newCount; } else { badge.style.display = 'none'; }
    if (!currentEnquiries.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No enquiries yet.</td></tr>'; return; }
    tbody.innerHTML = currentEnquiries.map(function(e) {
        var d = new Date(e.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short' });
        var badge = e.status === 'new' ? 'badge-new' : e.status === 'replied' ? 'badge-replied' : 'badge-read';
        return '<tr><td>'+d+'</td><td>'+e.name+'</td><td style="font-size:0.72rem">'+e.email+'</td><td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(e.products||'-')+'</td><td><span class="badge '+badge+'">'+e.status+'</span></td><td><div class="actions"><button class="btn-sm btn-view" onclick="viewEnquiry('+e.id+')">View</button><button class="btn-sm btn-delete" onclick="deleteEnquiry('+e.id+')">Del</button></div></td></tr>';
    }).join('');
}

function viewEnquiry(id) {
    var e = currentEnquiries.find(function(x) { return x.id === id; });
    if (!e) return;
    var d = new Date(e.created_at).toLocaleString('en-IN');
    document.getElementById('enquiry-detail').innerHTML = 
        '<div style="font-size:0.82rem;line-height:1.8"><p><strong>📅 Date:</strong> '+d+'</p><p><strong>👤 Name:</strong> '+e.name+'</p><p><strong>📧 Email:</strong> <a href="mailto:'+e.email+'">'+e.email+'</a></p><p><strong>📱 Phone:</strong> '+(e.phone||'N/A')+'</p><p><strong>🏢 Company:</strong> '+(e.company||'N/A')+'</p><p><strong>📦 Products:</strong> '+(e.products||'N/A')+'</p><p><strong>💬 Message:</strong></p><div style="background:#f9f9f9;padding:10px;border-radius:8px;margin-top:4px">'+(e.message||'No message')+'</div><div style="margin-top:12px;display:flex;gap:6px"><button class="btn-cta" onclick="markEnquiry('+e.id+',\'read\')">✓ Mark Read</button><button class="btn-sm btn-reply" style="padding:8px 14px" onclick="markEnquiry('+e.id+',\'replied\')">✉ Replied</button><a href="mailto:'+e.email+'?subject=Re: Enquiry from SAI Import Export Agro" class="btn-sm btn-view" style="padding:8px 14px;text-decoration:none">📧 Email</a></div></div>';
    document.getElementById('enquiry-modal').classList.add('active');
    if (e.status === 'new') markEnquiry(e.id, 'read');
}

function closeEnquiryModal() { document.getElementById('enquiry-modal').classList.remove('active'); }

async function markEnquiry(id, status) {
    await saiDB.from('enquiries').update({ status: status }).eq('id', id);
    loadEnquiries();
}

async function deleteEnquiry(id) {
    if (!confirm('Delete this enquiry?')) return;
    await saiDB.from('enquiries').delete().eq('id', id);
    loadEnquiries();
}

// ==================== BLOG ====================
async function loadBlogPosts() {
    var tbody = document.getElementById('blog-table-body');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Loading...</td></tr>';
    var r = await saiDB.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (r.error) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:red">'+r.error.message+'</td></tr>'; return; }
    currentPosts = r.data;
    loadOverviewStats();
    if (!currentPosts.length) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">No posts yet. Create one!</td></tr>'; return; }
    tbody.innerHTML = currentPosts.map(function(p) {
        var d = new Date(p.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
        var badge = p.published ? 'badge-published' : 'badge-draft';
        var label = p.published ? 'Live' : 'Draft';
        return '<tr><td><strong>'+p.title+'</strong></td><td style="font-size:0.72rem;color:#888">'+p.slug+'</td><td><span class="badge '+badge+'">'+label+'</span></td><td>'+d+'</td><td><div class="actions"><button class="btn-sm btn-edit" onclick="editBlog('+p.id+')">Edit</button><button class="btn-sm btn-delete" onclick="deleteBlog('+p.id+')">Del</button></div></td></tr>';
    }).join('');
}

function openBlogModal(isEdit) {
    document.getElementById('blog-modal').classList.add('active');
    if (!isEdit) { document.getElementById('blog-modal-title').innerText = 'New Blog Post'; blogForm.reset(); document.getElementById('blog-edit-id').value = ''; }
}
function closeBlogModal() { document.getElementById('blog-modal').classList.remove('active'); }

function editBlog(id) {
    var p = currentPosts.find(function(x) { return x.id === id; });
    if (!p) return;
    document.getElementById('blog-modal-title').innerText = 'Edit Post';
    document.getElementById('blog-edit-id').value = p.id;
    document.getElementById('blog_title').value = p.title;
    document.getElementById('blog_slug').value = p.slug;
    document.getElementById('blog_cover').value = p.cover_img || '';
    document.getElementById('blog_excerpt').value = p.excerpt || '';
    document.getElementById('blog_content').value = p.content || '';
    document.getElementById('blog_published').checked = p.published;
    openBlogModal(true);
}

async function deleteBlog(id) {
    if (!confirm('Delete this post?')) return;
    await saiDB.from('blog_posts').delete().eq('id', id);
    loadBlogPosts();
}

// Auto-generate slug from title
document.getElementById('blog_title').addEventListener('input', function() {
    if (!document.getElementById('blog-edit-id').value) {
        document.getElementById('blog_slug').value = this.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
});

// ==================== HERO/BANNER SETTINGS ====================
async function loadHeroSettings() {
    var r = await saiDB.from('site_settings').select('*').eq('key', 'hero').single();
    if (r.data && r.data.value) {
        var v = r.data.value;
        document.getElementById('hero_tagline').value = v.tagline || '';
        document.getElementById('hero_heading').value = v.heading || '';
        document.getElementById('hero_subheading').value = v.subheading || '';
        document.getElementById('hero_cta_text').value = v.cta_text || '';
        document.getElementById('hero_cta_link').value = v.cta_link || '';
        document.getElementById('hero_bg_img').value = v.bg_image || 'images/hero_bg.webp';
    }
}

async function saveHeroSettings() {
    var data = {
        tagline: document.getElementById('hero_tagline').value,
        heading: document.getElementById('hero_heading').value,
        subheading: document.getElementById('hero_subheading').value,
        cta_text: document.getElementById('hero_cta_text').value,
        cta_link: document.getElementById('hero_cta_link').value,
        bg_image: document.getElementById('hero_bg_img').value
    };
    var r = await saiDB.from('site_settings').upsert({ key: 'hero', value: data, updated_at: new Date().toISOString() });
    if (r.error) alert('Error: ' + r.error.message); else alert('✅ Hero settings saved!');
}

// ==================== WHATSAPP SETTINGS ====================
async function loadWhatsAppSettings() {
    var r = await saiDB.from('site_settings').select('*').eq('key', 'whatsapp').single();
    if (r.data && r.data.value) {
        var v = r.data.value;
        document.getElementById('wa_phone').value = v.phone || '';
        document.getElementById('wa_apikey').value = v.apikey || '';
    }
}

async function saveWhatsAppSettings() {
    var data = {
        phone: document.getElementById('wa_phone').value,
        apikey: document.getElementById('wa_apikey').value
    };
    var r = await saiDB.from('site_settings').upsert({ key: 'whatsapp', value: data, updated_at: new Date().toISOString() });
    if (r.error) alert('Error: ' + r.error.message); else alert('✅ WhatsApp settings saved!');
}

// Hero image upload
var pendingHeroImage = null;
document.getElementById('hero-img-input').addEventListener('change', async function(e) {
    if (!e.target.files.length) return;
    var file = e.target.files[0];
    var orig = (file.size/1024).toFixed(1);
    document.getElementById('hero-img-prompt').style.display = 'none';
    document.getElementById('hero-img-preview').style.display = 'block';
    document.getElementById('hero-img-info').innerText = 'Compressing...';
    var comp = await compressImage(file, 1200, 0.65);
    pendingHeroImage = comp;
    document.getElementById('hero-preview-img').src = URL.createObjectURL(comp);
    document.getElementById('hero-img-info').innerText = orig + 'KB → ' + (comp.size/1024).toFixed(1) + 'KB ✓ WebP';
});

async function saveHeroImage() {
    if (!pendingHeroImage) {
        if (document.getElementById('hero_bg_img').value) { saveHeroSettings(); return; }
        alert('Upload an image first'); return;
    }
    var path = 'hero/hero_bg.webp';
    var r = await saiDB.storage.from('product-images').upload(path, pendingHeroImage, { contentType: 'image/webp', upsert: true });
    if (r.error) { alert('Upload failed: ' + r.error.message); return; }
    var url = saiDB.storage.from('product-images').getPublicUrl(path).data.publicUrl;
    document.getElementById('hero_bg_img').value = url;
    pendingHeroImage = null;
    saveHeroSettings();
}

// ==================== BLOG IMAGE UPLOAD ====================
var pendingBlogImage = null;
document.getElementById('blog-img-input').addEventListener('change', async function(e) {
    if (!e.target.files.length) return;
    var file = e.target.files[0];
    var orig = (file.size/1024).toFixed(1);
    document.getElementById('blog-img-prompt').style.display = 'none';
    document.getElementById('blog-img-preview').style.display = 'block';
    document.getElementById('blog-img-info').innerText = 'Compressing...';
    var comp = await compressImage(file, 600, 0.6);
    pendingBlogImage = comp;
    document.getElementById('blog-preview-img').src = URL.createObjectURL(comp);
    document.getElementById('blog-img-info').innerText = orig + 'KB → ' + (comp.size/1024).toFixed(1) + 'KB ✓ WebP';
});

function clearBlogImage() {
    pendingBlogImage = null;
    document.getElementById('blog-img-prompt').style.display = 'block';
    document.getElementById('blog-img-preview').style.display = 'none';
    document.getElementById('blog-img-input').value = '';
}

async function uploadBlogImage(slug) {
    if (!pendingBlogImage) return null;
    var path = 'blog/' + slug + '.webp';
    var r = await saiDB.storage.from('product-images').upload(path, pendingBlogImage, { contentType: 'image/webp', upsert: true });
    if (r.error) { alert('Blog image upload failed: ' + r.error.message); return null; }
    return saiDB.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}

// Override blog form submit to include image upload
blogForm.removeEventListener('submit', blogForm._blogHandler);
blogForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = document.getElementById('blog-save-btn');
    btn.innerText = 'Saving...';
    
    if (pendingBlogImage) {
        btn.innerText = 'Uploading image...';
        var imgUrl = await uploadBlogImage(document.getElementById('blog_slug').value);
        if (imgUrl) document.getElementById('blog_cover').value = imgUrl;
    }
    
    var editId = document.getElementById('blog-edit-id').value;
    var data = {
        title: document.getElementById('blog_title').value,
        slug: document.getElementById('blog_slug').value,
        cover_img: document.getElementById('blog_cover').value || null,
        excerpt: document.getElementById('blog_excerpt').value || null,
        content: document.getElementById('blog_content').value,
        published: document.getElementById('blog_published').checked,
        updated_at: new Date().toISOString()
    };
    var r;
    if (editId) { r = await saiDB.from('blog_posts').update(data).eq('id', parseInt(editId)); }
    else { r = await saiDB.from('blog_posts').insert(data); }
    btn.innerText = 'Save Post';
    if (r.error) alert('Error: ' + r.error.message); else { pendingBlogImage = null; clearBlogImage(); closeBlogModal(); loadBlogPosts(); }
});

// ==================== PDF CATALOG GENERATOR ====================
async function generatePDF() {
    if (!currentProducts.length) { alert('No products to generate catalog'); return; }
    var w = window.open('', '_blank');
    w.document.write('<html><head><title>SAI Import Export Agro - Product Catalog</title>');
    w.document.write('<style>@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap");');
    w.document.write('*{margin:0;padding:0;box-sizing:border-box;font-family:"Inter",sans-serif}');
    w.document.write('body{padding:20px;color:#333}');
    w.document.write('.header{text-align:center;padding:30px 0;border-bottom:3px solid #2d5a3c;margin-bottom:30px}');
    w.document.write('.header h1{color:#2d5a3c;font-size:28px;margin-bottom:5px}');
    w.document.write('.header p{color:#666;font-size:14px}');
    w.document.write('.product{display:flex;gap:20px;padding:18px 0;border-bottom:1px solid #eee;page-break-inside:avoid}');
    w.document.write('.product img{width:100px;height:100px;object-fit:cover;border-radius:10px}');
    w.document.write('.product h3{color:#2d5a3c;font-size:16px;margin-bottom:4px}');
    w.document.write('.product .tag{background:#e8f0ea;color:#2d5a3c;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600}');
    w.document.write('.product .price{color:#c87533;font-weight:700;font-size:15px;margin-top:4px}');
    w.document.write('.product .desc{color:#666;font-size:12px;margin-top:4px}');
    w.document.write('.specs{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}');
    w.document.write('.spec{background:#f5f5f5;padding:2px 8px;border-radius:6px;font-size:11px;color:#555}');
    w.document.write('.footer{text-align:center;margin-top:30px;padding-top:15px;border-top:2px solid #2d5a3c;font-size:12px;color:#888}');
    w.document.write('@media print{body{padding:10px}.product img{width:80px;height:80px}}</style></head><body>');
    w.document.write('<div class="header"><h1>🌾 SAI Import Export Agro</h1><p>Premium Indian Rice Exporter | Product Catalog ' + new Date().getFullYear() + '</p><p style="margin-top:4px;font-size:12px">📧 admin@saiimportexportagro.com | 📱 +91 8595827184</p></div>');
    currentProducts.forEach(function(p) {
        var specsHtml = '';
        if (p.specs) { Object.keys(p.specs).forEach(function(k) { if (k !== 'price') specsHtml += '<span class="spec"><strong>'+k+':</strong> '+p.specs[k]+'</span>'; }); }
        w.document.write('<div class="product"><img src="'+p.img+'" alt="'+p.name+'"><div><span class="tag">'+p.tag+'</span><h3>'+p.name+'</h3><div class="price">'+(p.specs&&p.specs.price||'Contact for Price')+'</div><p class="desc">'+(p.short_desc||p.description||'')+'</p><div class="specs">'+specsHtml+'</div></div></div>');
    });
    w.document.write('<div class="footer"><p>© ' + new Date().getFullYear() + ' SAI Import Export Agro. All rights reserved. | saiimportexport.vercel.app</p></div>');
    w.document.write('</body></html>');
    w.document.close();
    setTimeout(function() { w.print(); }, 500);
}

// ==================== BOOT ====================
document.addEventListener('DOMContentLoaded', init);
