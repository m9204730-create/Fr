const products = [
  {
    id: 1,
    name: "Fury 160mm/6.3inch 20g #03 Ice Chartreuse",
    category: "Fury 160",
    price: 173,
    inStock: true,
    color: "#3bff4a",
    colors: ["#3bff4a","#00bfff","#ff6b00"]
  },
  {
    id: 2,
    name: "Fury 160mm/6.3inch 20g #16 Sunset",
    category: "Fury 160",
    price: 173,
    inStock: false,
    color: "#f5c842",
    colors: ["#f5c842","#ff9800","#fff"]
  },
  {
    id: 3,
    name: "Fury 160mm/6.3inch 20g #29 Motor Oil Red",
    category: "Fury 160",
    price: 173,
    inStock: true,
    color: "#c8a000",
    colors: ["#c8a000","#d44","#8b6914"]
  },
  {
    id: 4,
    name: "Dragonfire 120mm/4.7inch 10g #16 Sunset",
    category: "Dragonfire 120",
    price: 184,
    inStock: true,
    color: "#38b2e0",
    colors: ["#38b2e0","#f97316","#fff"]
  },
  {
    id: 5,
    name: "Fury 160mm/6.3inch 20g #34 Cream LOX",
    category: "Fury 160",
    price: 173,
    inStock: true,
    color: "#ff69b4",
    colors: ["#ff69b4","#fff","#c0a0c0"]
  },
  {
    id: 6,
    name: "Fury 160mm/6.3inch 20g #27 Elektrik",
    category: "Fury 160",
    price: 173,
    inStock: true,
    color: "#ccc",
    colors: ["#ccc","#888","#fff"]
  },
  {
    id: 7,
    name: "Fury 160mm/6.3inch 20g #18 Green LOX",
    category: "Fury 160",
    price: 173,
    inStock: true,
    color: "#4ade80",
    colors: ["#4ade80","#166534","#fff"]
  },
  {
    id: 8,
    name: "Fury 160mm/6.3inch 20g #35 Pink Sea",
    category: "Fury 160",
    price: 173,
    inStock: true,
    color: "#f472b6",
    colors: ["#f472b6","#fff","#be185d"]
  }
];
 
let cartTotal = 0;
 
function fishSVG(p) {
  const [c1, c2, c3] = p.colors;
  return `<svg width="150" height="90" viewBox="0 0 150 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 45 Q55 15 95 30 Q115 38 130 45 Q115 52 95 60 Q55 75 20 45Z" fill="${c1}" stroke="${c2}" stroke-width="1.2" opacity=".95"/>
    <path d="M20 45 L5 30 L10 45 L5 60 Z" fill="${c1}" opacity=".7"/>
    <path d="M55 30 Q75 25 100 35" stroke="${c3}" stroke-width="1.5" fill="none" opacity=".6"/>
    <path d="M55 60 Q75 65 100 55" stroke="${c3}" stroke-width="1.5" fill="none" opacity=".6"/>
    <circle cx="112" cy="40" r="7" fill="white"/>
    <circle cx="114" cy="40" r="3.5" fill="#1a1a2e"/>
    <circle cx="115" cy="39" r="1.5" fill="white"/>
    <path d="M75 30 L82 18 L92 30" fill="${c2}" opacity=".5"/>
    <path d="M75 60 L82 72 L92 60" fill="${c2}" opacity=".5"/>
    <path d="M100 28 L115 22 L118 30" fill="${c2}" opacity=".4"/>
    <path d="M100 62 L115 68 L118 60" fill="${c2}" opacity=".4"/>
    <ellipse cx="50" cy="45" rx="4" ry="10" fill="${c2}" opacity=".25" transform="rotate(-10 50 45)"/>
  </svg>`;
}
 
function renderCards(list) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = list.map(p => `
    <div class="product-card${!p.inStock ? ' outofstock' : ''}" data-id="${p.id}">
      <span class="product-badge ${p.inStock ? 'badge-instock' : 'badge-outofstock'}">
        ${p.inStock ? 'В наявності' : 'Розпродано'}
      </span>
      <div class="product-img-wrap">
        ${fishSVG(p)}
        <div class="product-actions">
          <div class="action-icon" title="До списку бажань">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <div class="action-icon" title="Швидкий перегляд">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <a href="#" class="product-name">${p.name}</a>
        <div class="stars">
          ${[1,2,3,4,5].map(i => `<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
        </div>
        <div class="product-footer">
          <div class="product-price">
            ${p.price} <span class="price-currency">₴</span>
          </div>
        </div>
      </div>
      <button
        class="add-to-cart-bar"
        ${!p.inStock ? 'disabled' : ''}
        onclick="addToCart(${p.id}, '${p.name.replace(/'/g,"\\'")}', event)"
      >${p.inStock ? 'ДОДАТИ В КОШИК' : 'РОЗПРОДАНО'}</button>
    </div>
  `).join('');
}
 
let currentPage = 0;
const perPage = 6;
 
function showPage(page, btn) {
  currentPage = page;
  document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const start = page * perPage;
  renderCards(products.slice(start, start + perPage));
}
 
function addToCart(id, name, e) {
  e.stopPropagation();
  cartTotal++;
  const countEl = document.getElementById('cart-count');
  countEl.textContent = cartTotal;
  countEl.style.display = 'flex';
 
  const popup = document.getElementById('cartPopup');
  document.getElementById('cartPopupMsg').textContent = `"${name.substring(0,40)}..." додано до кошика`;
  popup.classList.add('show');
  clearTimeout(popup._timer);
  popup._timer = setTimeout(() => popup.classList.remove('show'), 3000);
}
 
renderCards(products.slice(0, perPage));
 
let heroSlide = 0;
const heroDots = document.querySelectorAll('.hero-dot');
const heroTitles = ['Fury', 'Crazy Fox', 'Dragonfire'];
const heroBadges = ['бестселлер', 'власне виробництво', 'новинка'];
 
setInterval(() => {
  heroDots[heroSlide].classList.remove('active');
  heroSlide = (heroSlide + 1) % 3;
  heroDots[heroSlide].classList.add('active');
  document.querySelector('.hero-title').textContent = heroTitles[heroSlide];
  document.querySelector('.hero-badge').textContent = heroBadges[heroSlide];
}, 4000);
 
heroDots.forEach((d, i) => {
  d.addEventListener('click', () => {
    heroDots[heroSlide].classList.remove('active');
    heroSlide = i;
    d.classList.add('active');
    document.querySelector('.hero-title').textContent = heroTitles[i];
    document.querySelector('.hero-badge').textContent = heroBadges[i];
  });
});
 
// cat pills scroll on drag
const track = document.getElementById('catTrack');
let isDown = false, startX, scrollLeft;
track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
track.addEventListener('mouseleave', () => isDown = false);
track.addEventListener('mouseup', () => isDown = false);
track.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  track.scrollLeft = scrollLeft - (x - startX);
});