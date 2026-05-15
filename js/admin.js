// Admin Panel Logic

const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const tableBody = document.getElementById('product-table-body');

let currentProducts = [];

// Initialize
async function init() {
    const session = await checkAuth();
    if (session) {
        showDashboard();
    } else {
        loginScreen.style.display = 'block';
        dashboard.style.display = 'none';
    }
}

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('login-btn');
    
    btn.innerText = 'Logging in...';
    
    try {
        // Check supabase is initialized
        if (typeof saiDB === 'undefined') {
            alert('ERROR: Supabase client not initialized. Check console.');
            btn.innerText = 'Log In';
            return;
        }

        const { data, error } = await saiDB.auth.signInWithPassword({
            email: email,
            password: password,
        });
        
        if (error) {
            loginError.style.display = 'block';
            loginError.innerText = '❌ ' + error.message;
            loginError.style.color = 'red';
            loginError.style.fontSize = '1rem';
            loginError.style.padding = '10px';
            btn.innerText = 'Log In';
        } else {
            loginError.style.display = 'none';
            showDashboard();
        }
    } catch (err) {
        alert('JS Error: ' + err.message);
        btn.innerText = 'Log In';
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    await saiDB.auth.signOut();
    window.location.reload();
});

// Show Dashboard & Load Data
async function showDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    await loadProducts();
}

async function loadProducts() {
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Loading...</td></tr>';
    
    // Fetch from Supabase
    const { data, error } = await saiDB
        .from('products')
        .select('*')
        .order('id', { ascending: true });
        
    if (error) {
        tableBody.innerHTML = `<tr><td colspan="5" style="color:red; text-align: center;">Error loading data: ${error.message}. <br>Make sure you have created the 'products' table in saiDB.</td></tr>`;
        return;
    }
    
    currentProducts = data;
    renderTable();
}

function renderTable() {
    if (currentProducts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No products found. Add one!</td></tr>';
        return;
    }
    
    tableBody.innerHTML = currentProducts.map(p => `
        <tr>
            <td><img src="${p.img}" alt="${p.name}"></td>
            <td><strong>${p.id}</strong></td>
            <td>${p.name}</td>
            <td><span class="product-tag">${p.tag}</span></td>
            <td><strong>${p.specs?.price || 'N/A'}</strong></td>
            <td>
                <div class="actions">
                    <button class="btn-edit" onclick="editProduct('${p.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct('${p.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Modal Logic
function openModal(isEdit = false) {
    productModal.style.display = 'flex';
    setTimeout(() => productModal.classList.add('active'), 10);
    if (!isEdit) {
        document.getElementById('modal-title').innerText = 'Add New Product';
        productForm.reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('p_id').readOnly = false;
    }
}

function closeModal() {
    productModal.classList.remove('active');
    setTimeout(() => productModal.style.display = 'none', 300);
}

function editProduct(id) {
    const p = currentProducts.find(x => x.id === id);
    if (!p) return;
    
    document.getElementById('modal-title').innerText = 'Edit Product';
    document.getElementById('edit-id').value = p.id;
    document.getElementById('p_id').value = p.id;
    document.getElementById('p_id').readOnly = true; // Don't allow changing ID easily
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_img').value = p.img;
    document.getElementById('p_tag').value = p.tag;
    document.getElementById('p_price').value = p.specs?.price || '';
    document.getElementById('p_short_desc').value = p.short_desc;
    document.getElementById('p_desc').value = p.description;
    
    // Convert specs JSON back to string
    document.getElementById('p_specs').value = JSON.stringify(p.specs, null, 2);
    
    openModal(true);
}



// Delete Product
async function deleteProduct(id) {
    if (!confirm(`Are you sure you want to delete ${id}?`)) return;
    
    const { error } = await saiDB
        .from('products')
        .delete()
        .eq('id', id);
        
    if (error) {
        alert(`Error deleting product: ${error.message}`);
    } else {
        loadProducts(); // Refresh
    }
}

// ==================== IMAGE UPLOAD SYSTEM ====================
var pendingImageFile = null; // Holds compressed blob ready for upload

// Click to upload
document.getElementById('img-upload-area').addEventListener('click', function() {
    document.getElementById('img-file-input').click();
});

// Drag and drop
var uploadArea = document.getElementById('img-upload-area');
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#2d5a3c';
    uploadArea.style.background = '#ddf0e3';
});
uploadArea.addEventListener('dragleave', function() {
    uploadArea.style.borderColor = '#4a7c59';
    uploadArea.style.background = '#f0f7f2';
});
uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#4a7c59';
    uploadArea.style.background = '#f0f7f2';
    if (e.dataTransfer.files.length > 0) {
        processImageFile(e.dataTransfer.files[0]);
    }
});

// File input change
document.getElementById('img-file-input').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        processImageFile(e.target.files[0]);
    }
});

// Compress image to WebP using Canvas API
function compressImage(file, maxWidth, quality) {
    return new Promise(function(resolve) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                var ratio = Math.min(maxWidth / img.width, 1);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(function(blob) {
                    resolve(blob);
                }, 'image/webp', quality);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// Process selected image
async function processImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    var originalSize = (file.size / 1024).toFixed(1);
    document.getElementById('img-size-info').innerText = 'Compressing...';
    document.getElementById('img-upload-prompt').style.display = 'none';
    document.getElementById('img-preview-box').style.display = 'block';

    // Compress to WebP, max 400px width, 60% quality
    var compressed = await compressImage(file, 400, 0.6);
    var compressedSize = (compressed.size / 1024).toFixed(1);
    var savings = Math.round((1 - compressed.size / file.size) * 100);

    pendingImageFile = compressed;

    // Show preview
    var previewUrl = URL.createObjectURL(compressed);
    document.getElementById('img-preview').src = previewUrl;
    document.getElementById('img-size-info').innerText = 
        originalSize + 'KB → ' + compressedSize + 'KB (' + savings + '% smaller) ✓ WebP';
}

function clearImageUpload() {
    pendingImageFile = null;
    document.getElementById('img-upload-prompt').style.display = 'block';
    document.getElementById('img-preview-box').style.display = 'none';
    document.getElementById('img-file-input').value = '';
    document.getElementById('img-preview').src = '';
    document.getElementById('img-size-info').innerText = '';
}

// Upload image to Supabase Storage
async function uploadImageToStorage(productId) {
    if (!pendingImageFile) return null;
    
    var fileName = productId + '.webp';
    var filePath = 'products/' + fileName;
    
    // Upload to Supabase Storage
    var result = await saiDB.storage.from('product-images').upload(filePath, pendingImageFile, {
        contentType: 'image/webp',
        upsert: true
    });
    
    if (result.error) {
        console.error('Upload error:', result.error);
        alert('Image upload failed: ' + result.error.message);
        return null;
    }
    
    // Get public URL
    var urlResult = saiDB.storage.from('product-images').getPublicUrl(filePath);
    return urlResult.data.publicUrl;
}

// ==================== MODIFIED SAVE (with image upload) ====================
// Override the original form submit to include image upload
productForm.removeEventListener('submit', productForm._handler);
productForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = document.getElementById('save-btn');
    btn.innerText = 'Saving...';
    
    // Upload image first if pending
    if (pendingImageFile) {
        var pid = document.getElementById('p_id').value;
        btn.innerText = 'Uploading image...';
        var imageUrl = await uploadImageToStorage(pid);
        if (imageUrl) {
            document.getElementById('p_img').value = imageUrl;
        }
    }

    var specsData = {};
    try {
        specsData = JSON.parse(document.getElementById('p_specs').value);
    } catch (err) {
        alert("Invalid JSON format in Specifications!");
        btn.innerText = 'Save Product';
        return;
    }

    var priceVal = document.getElementById('p_price').value;
    if (priceVal) {
        specsData.price = priceVal;
    } else {
        delete specsData.price;
    }

    var productData = {
        id: document.getElementById('p_id').value,
        name: document.getElementById('p_name').value,
        tag: document.getElementById('p_tag').value,
        short_desc: document.getElementById('p_short_desc').value,
        description: document.getElementById('p_desc').value,
        img: document.getElementById('p_img').value,
        specs: specsData
    };

    var result = await saiDB.from('products').upsert(productData);
    btn.innerText = 'Save Product';

    if (result.error) {
        alert('Error saving product: ' + result.error.message);
    } else {
        pendingImageFile = null;
        closeModal();
        loadProducts();
    }
});

// Boot up
document.addEventListener('DOMContentLoaded', init);
