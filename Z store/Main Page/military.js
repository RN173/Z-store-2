/* ==================== DATA ==================== */
const products = [

  {
    id: 1,
    name: "M4A4 Abram",
    price: 2.99,
    thumb: "assets/thumbs/M4A1 Abram.jpg",
    model: "assets/models/M4A1 Abram.glb"
	
 },

  {
    id: 2,
    name: "leopard",
    price: 78.6,
    thumb: "assets/thumbs/leopard.jpg",
    model: "assets/models/leopard.glb"
	
 },,

   {
    id: 3,
    name: "Glock 22",
    price: 18.4,
    thumb: "assets/thumbs/glock.jpg",
    model: "assets/models/Pinkerton.glb"
	
   },,

 
  // Add as many as you need
];

/* ==================== STATE ==================== */
let cart = JSON.parse(localStorage.getItem('3dCart') || '[]');

/* ==================== DOM refs ==================== */
const gridEl = document.getElementById('product-grid');
const cartToggle = document.getElementById('cart-toggle');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

/* ==================== Render products ==================== */
function renderProducts() {
  gridEl.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.thumb}" alt="${p.name}" loading="lazy">
      <div class="info">
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => addToCart(p));
    gridEl.appendChild(card);
  });
}

/* ==================== Cart functions ==================== */
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  if (item.qty === 0) removeFromCart(id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('3dCart', JSON.stringify(cart));
  cartCountEl.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function renderCart() {
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.thumb}" alt="${item.name}">
      <div class="item-info">
        <strong>${item.name}</strong>
        <small>$${item.price.toFixed(2)} × ${item.qty}</small>
      </div>
      <button class="remove" data-id="${item.id}">✕</button>
    `;
    li.querySelector('.remove').addEventListener('click', () => removeFromCart(item.id));
    // Optional: add +/- buttons for qty
    cartItemsEl.appendChild(li);
  });
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

/* ==================== UI interactions ==================== */
cartToggle.addEventListener('click', () => cartDrawer.classList.toggle('open'));
cartClose.addEventListener('click', () => cartDrawer.classList.remove('open'));

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  // ---- MOCK CHECKOUT ----
  alert(`Mock checkout – total: $${cartTotalEl.textContent}\ngimme money.`);
  // Example Stripe redirect (replace with your own session):
  // const session = await fetch('/create-checkout-session', {method:'POST',body:JSON.stringify(cart)}).then(r=>r.json());
  // stripe.redirectToCheckout({sessionId: session.id});
});

/* ==================== Init ==================== */
renderProducts();
renderCart();