const products = [
  { 
    id: 1, 
    name: "Fury 160mm/6.3inch 20g #03 Ice Chartreuse", 
    category: "Fury", 
    price: 173, 
    inStock: true, 
    color: "#3bff4a", 
    image: "image/fury-03-ice-chartreuse-square-400x400.jpg"
  },
  { 
    id: 2, 
    name: "Fury 160mm/6.3inch 20g #16 Sunset", 
    category: "Fury", 
    price: 173, 
    inStock: false, 
    color: "#f5c842", 
    image: "image/5f9dd3-1775887351050-square-400x400.jpg" 
  },
  { 
    id: 3, 
    name: "Fury 160mm/6.3inch 20g #29 Motor Oil Red", 
    category: "Fury", 
    price: 173, 
    inStock: true, 
    color: "#c8a000", 
    image: "image/10ecf8-1777974837365-square-400x400.jpg" 
  },
  { 
    id: 4, 
    name: "Dragonfire 120mm/4.7inch 10g #16 Sunset", 
    category: "Dragonfire", 
    price: 184, 
    inStock: true, 
    color: "#38b2e0", 
    image: "image/c09e8a-1775887647313-square-400x400.jpg" 
  },
  { 
    id: 5, 
    name: "Fury 160mm/6.3inch 20g #34 Cream LOX", 
    category: "Fury", 
    price: 173, 
    inStock: true, 
    color: "#ff69b4", 
    image: "image/fury-28-caramel-oil-square-400x400.jpg" 
  },
  { 
    id: 6, 
    name: "Fury 160mm/6.3inch 20g #27 Elektrik", 
    category: "Fury", 
    price: 173, 
    inStock: true, 
    color: "#aaa", 
    image: "image/fury-31-lime-perl-square-400x400.jpg" 
  },
  { 
    id: 7, 
    name: "Fury 160mm/6.3inch 20g #18 Green LOX", 
    category: "Fury", 
    price: 173, 
    inStock: true, 
    color: "#4ade80", 
    image: "image/fury-18-green-lox-square-400x400.jpg" 
  },
  { 
    id: 8, 
    name: "Fury 160mm/6.3inch 20g #35 Pink Sea", 
    category: "Fury", 
    price: 173, 
    inStock: true, 
    color: "#f472b6", 
    image: "image/fury-22-pink-lox-square-400x400.jpg" 
  },
  { 
    id: 9, 
    name: "Dragonfire 120mm/4.7inch 10g #03 Ice Chartreuse", 
    category: "Dragonfire", 
    price: 184, 
    inStock: true, 
    color: "#22d3ee", 
    image: "image/fury-03-ice-chartreuse-square-400x400.jpg" 
  },
  { 
    id: 10, 
    name: "Dragonfire 120mm/4.7inch 10g #29 Motor Oil", 
    category: "Dragonfire", 
    price: 184, 
    inStock: true, 
    color: "#854d0e", 
    image: "image/fury-26-green-rose-square-400x400.jpg" 
  },
  { 
    id: 11, 
    name: "Crazy Fox 140mm #07 Firetiger", 
    category: "Crazy Fox", 
    price: 195, 
    inStock: true, 
    color: "#f97316", 
    image: "image/fury-04-lilac-square-400x400.jpg" 
  },
  { 
    id: 12, 
    name: "Crazy Fox 140mm #12 Perch", 
    category: "Crazy Fox", 
    price: 195, 
    inStock: false, 
    color: "#84cc16", 
    image: "" 
  }
];

let cart = {};      
let wishlist = {};  
let currentFilter = null;
let currentPage = 0;
const PER_PAGE = 6;
let filteredProducts = [...products];

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const nl = document.getElementById('nav-' + name);
  if (nl) nl.classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'wishlist') renderWishlist();
}

function goHome() { showPage('home'); }

document.getElementById('buyNowBtn')?.addEventListener('click', () => {
  if (typeof gtag === 'function') {
    gtag('event', 'click_buy_now_btn');
  }
});

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

function doSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const cat = document.getElementById('searchCategory').value;
  showPage('home');

  filteredProducts = products.filter(p => {
    const matchQuery = !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
    const matchCat = !cat || p.category.toLowerCase().includes(cat.toLowerCase());
    return matchQuery && matchCat;
  });

  const title = query ? `Результати: "${document.getElementById('searchInput').value}"` : 'Всі товари';
  document.getElementById('sectionTitle').textContent = title;
  document.getElementById('searchInfo').style.display = 'block';
  document.getElementById('searchCount').textContent = filteredProducts.length;

  currentPage = 0;
  currentFilter = null;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  renderPage(0);

  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function filterByCategory(cat) {
  showPage('home');
  currentFilter = cat;
  filteredProducts = products.filter(p => p.category.toLowerCase().includes(cat.toLowerCase()));

  document.getElementById('sectionTitle').textContent = cat;
  document.getElementById('searchInfo').style.display = 'block';
  document.getElementById('searchCount').textContent = filteredProducts.length;
  document.getElementById('searchInput').value = '';

  document.querySelectorAll('.cat-pill').forEach(p => {
    p.classList.toggle('active', p.textContent.trim().toLowerCase().includes(cat.toLowerCase()));
  });

  currentPage = 0;
  renderPage(0);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showAllProducts() {
  filteredProducts = [...products];
  document.getElementById('sectionTitle').textContent = 'Всі товари';
  document.getElementById('searchInfo').style.display = 'block';
  document.getElementById('searchCount').textContent = filteredProducts.length;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  currentPage = 0;
  renderPage(0);
}


function getProductImageHTML(p) {
  const imgUrl = p.image ? p.image : 'images/no-image.jpg';

  return `<img src="${imgUrl}" alt="${p.name}" class="product-img" loading="lazy" style="width:100%; height:100%; object-fit:contain; background-color:${p.color}15;">`;
}


function productPlaceholder(p) {
  return getProductImageHTML(p);
}


function renderPage(page) {
  currentPage = page;
  const start = page * PER_PAGE;
  const slice = filteredProducts.slice(start, start + PER_PAGE);
  const grid = document.getElementById('productsGrid');

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="no-results">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Нічого не знайдено. Спробуйте інший запит.
    </div>`;
    document.getElementById('sliderDots').innerHTML = '';
    return;
  }

  grid.innerHTML = slice.map(p => {
    const isWished = !!wishlist[p.id];
    return `<div class="product-card${!p.inStock ? ' outofstock' : ''}" data-id="${p.id}">
      <span class="product-badge ${p.inStock ? 'badge-instock' : 'badge-outofstock'}">
        ${p.inStock ? 'В наявності' : 'Розпродано'}
      </span>
      <div class="product-img-wrap" style="position: relative; height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        ${getProductImageHTML(p)}
        <div class="product-actions">
          <div class="action-icon${isWished ? ' wished' : ''}" title="До списку бажань" onclick="toggleWish(${p.id}, event)">
            <svg viewBox="0 0 24 24" fill="${isWished ? 'var(--red)' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <div class="action-icon" title="Швидкий перегляд" onclick="quickView(${p.id}, event)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <a href="#" class="product-name">${p.name}</a>
        <div class="stars">
          ${[1,2,3,4,5].map(() => `<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></polygon></svg>`).join('')}
        </div>
        <div class="product-footer">
          <div class="product-price">${p.price} <span class="price-currency">₴</span></div>
        </div>
      </div>
      <button class="add-to-cart-bar" ${!p.inStock ? 'disabled' : ''} onclick="addToCart(${p.id}, event)">
        ${p.inStock ? 'ДОДАТИ В КОШИК' : 'РОЗПРОДАНО'}
      </button>
    </div>`;
  }).join('');

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  const dotsEl = document.getElementById('sliderDots');
  dotsEl.innerHTML = totalPages > 1 ? Array.from({length: totalPages}, (_, i) =>
    `<button class="slider-dot${i === page ? ' active' : ''}" onclick="renderPage(${i})"></button>`
  ).join('') : '';
}

function addToCart(id, e) {
  e && e.stopPropagation();
  const p = products.find(x => x.id === id);
  if (!p || !p.inStock) return;
  cart[id] = (cart[id] || 0) + 1;
  updateCartBadge();
  showToast(`"${p.name.substring(0,38)}..." додано до кошика`);
  renderCartItems();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartBadge();
  renderCartItems();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}

function renderCartItems() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const ids = Object.keys(cart).map(Number);

  if (ids.length === 0) {
    el.innerHTML = `<div class="cart-empty">
      <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <p style="font-weight:700;color:var(--dark);margin-bottom:4px">Кошик порожній</p>
      <p style="font-size:13px">Додайте товари для оформлення замовлення</p>
    </div>`;
    footer.style.display = 'none';
    return;
  }

  let totalPrice = 0;
  el.innerHTML = ids.map(id => {
    const p = products.find(x => x.id === id);
    if (!p) return '';
    const subtotal = p.price * cart[id];
    totalPrice += subtotal;
    return `<div class="cart-item">
      <div class="cart-item-img" style="width:50px; height:50px; overflow:hidden; display:flex; align-items:center;">${getProductImageHTML(p)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">${subtotal} ₴</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${id}, -1)">−</button>
          <span class="qty-val">${cart[id]}</span>
          <button class="qty-btn" onclick="changeQty(${id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = totalPrice + ' ₴';
  footer.style.display = 'block';
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  if (!isOpen) renderCartItems();
}

function checkout() {
  showToast('Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
  cart = {};
  updateCartBadge();
  renderCartItems();
  toggleCart();
}

function toggleWish(id, e) {
  e && e.stopPropagation();
  if (wishlist[id]) {
    delete wishlist[id];
    showToast('Видалено з обраного');
  } else {
    wishlist[id] = true;
    const p = products.find(x => x.id === id);
    showToast(`"${p.name.substring(0,38)}..." додано до обраного`);
  }
  updateWishBadge();
  renderPage(currentPage);
}

function updateWishBadge() {
  const total = Object.keys(wishlist).length;
  const badge = document.getElementById('wishBadge');
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}


function renderWishlist() {
  const el = document.getElementById('wishlistContent');
  const ids = Object.keys(wishlist).map(Number);

  if (ids.length === 0) {
    el.innerHTML = `<div class="wishlist-empty">
      <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <h3>Список бажань порожній</h3>
      <p>Додавайте товари, що сподобалися, натискаючи на ❤️</p>
      <span class="btn-back" onclick="showPage('home')">Перейти до каталогу</span>
    </div>`;
    return;
  }

  el.innerHTML = `<div class="products-grid">` + ids.map(id => {
    const p = products.find(x => x.id === id);
    if (!p) return '';
    return `<div class="product-card${!p.inStock ? ' outofstock' : ''}">
      <span class="product-badge ${p.inStock ? 'badge-instock' : 'badge-outofstock'}">${p.inStock ? 'В наявності' : 'Розпродано'}</span>
      <div class="product-img-wrap" style="position: relative; height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        ${getProductImageHTML(p)}
        <div class="product-actions" style="opacity:1;transform:translateX(0)">
          <div class="action-icon wished" title="Видалити з обраного" onclick="toggleWish(${p.id}, event)">
            <svg viewBox="0 0 24 24" fill="var(--red)" stroke="var(--red)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <a href="#" class="product-name">${p.name}</a>
        <div class="stars">${[1,2,3,4,5].map(() => `<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></polygon></svg>`).join('')}</div>
        <div class="product-footer"><div class="product-price">${p.price} <span class="price-currency">₴</span></div></div>
      </div>
      <button class="add-to-cart-bar" ${!p.inStock ? 'disabled' : ''} onclick="addToCart(${p.id}, event)">
        ${p.inStock ? 'ДОДАТИ В КОШИК' : 'РОЗПРОДАНО'}
      </button>
    </div>`;
  }).join('') + `</div>`;
}

function quickView(id, e) {
  e && e.stopPropagation();
  const p = products.find(x => x.id === id);
  showToast(`${p.name.substring(0,40)} — ${p.price} ₴`);
}

function showToast(msg) {
  const popup = document.getElementById('cartPopup');
  document.getElementById('cartPopupMsg').textContent = msg;
  popup.classList.add('show');
  clearTimeout(popup._timer);
  popup._timer = setTimeout(() => popup.classList.remove('show'), 3000);
}

const heroSlides = [
  { title: 'Fury', badge: 'бестселлер' },
  { title: 'Crazy Fox', badge: 'власне виробництво' },
  { title: 'Dragonfire', badge: 'новинка' }
];
let heroIdx = 0;

function setHeroSlide(i) {
  document.querySelectorAll('.hero-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
  heroIdx = i;
  document.getElementById('heroTitle').textContent = heroSlides[i].title;
  document.getElementById('heroBadge').textContent = heroSlides[i].badge;
}

setInterval(() => setHeroSlide((heroIdx + 1) % 3), 4000);

function submitForm() {
  const name = document.getElementById('cf-name').value.trim();
  const contact = document.getElementById('cf-contact').value.trim();
  if (!name || !contact) { showToast('Заповніть імʼя та контакт'); return; }
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

const track = document.getElementById('catTrack');
let isDown = false, startX, scrollLeft;
if (track) {
  track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX);
  });
}

filteredProducts = [...products];
renderPage(0);
