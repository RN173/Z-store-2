/* ==================== DATA ==================== */
const products = [
  {
    id: 1,
    name: "Sci-Fi Robot",
    price: 19.99,
    thumb: "assets/thumbs/robot.jpg",
    model: "assets/models/robot.glb"
  },
  {
    id: 2,
    name: "Sports Car",
    price: 29.99,
    thumb: "assets/thumbs/car.jpg",
    model: "assets/models/car.glb"
  },
  {
    id: 3,
    name: "Modern House",
    price: 39.99,
    thumb: "assets/thumbs/house.jpg",
    model: "assets/models/house.glb"
  },
  {
    id: 4,
    name: "M4A4 Abram",
    price: 2.99,
    thumb: "assets/thumbs/M4A1 Abram.jpg",
    model: "assets/models/M4A1 Abram.glb"
	
 },

{
    id: 7,
    name: "JBl speaker",
    price: 17.38,
    thumb: "assets/thumbs/hello.jpg",
    model: "assets/models/hello.glb"
	
 },
 {
    id: 8,
    name: "Cracker",
    price: 19.60,
    thumb: "assets/thumbs/Cracker.jpg",
    model: "assets/models/cracker.glb"
	
 },,
  {
    id: 9,
    name: "Spinosaurus",
    price: 50.31,
    thumb: "assets/thumbs/Spinosaurus.jpg",
    model: "assets/models/Spinosaurus.glb"
	
 },,
   {
    id: 11,
    name: "WEEZER",
    price: 34.89,
    thumb: "assets/thumbs/weezer blue.jpg",
    model: "assets/models/weezer blue.glb"
	
 },,
   {
    id: 10,
    name: "Clock",
    price: 9.62,
    thumb: "assets/thumbs/clock.jpg",
    model: "assets/models/clock.glb"
	
 },,
   {
    id: 12,
    name: "Pinkerton",
    price: 42.7,
    thumb: "assets/thumbs/Pinkerton.jpg",
    model: "assets/models/Pinkerton.glb"
	
 },,
  {
    id: 13,
    name: "leopard",
    price: 78.6,
    thumb: "assets/thumbs/leopard.jpg",
    model: "assets/models/leopard.glb"
	
 },,

   {
    id: 15,
    name: "Glock 22",
    price: 18.4,
    thumb: "assets/thumbs/glock.jpg",
    model: "assets/models/Pinkerton.glb"
	
 },,
   {
    id: 16,
    name: "codsworth",
    price: 42.7,
    thumb: "assets/thumbs/codsworth.jpg",
    model: "assets/models/codsworth.glb"
	
 },,
   {
    id: 17,
    name: "dirt bike",
    price: 42.7,
    thumb: "assets/thumbs/dirt bike.jpg",
    model: "assets/models/dirt bike.glb"
	
 },,
   {
    id: 18,
    name: "new york",
    price: 42.7,
    thumb: "assets/thumbs/new york.jpg",
    model: "assets/models/new york.glb"
	
 },,
   {
    id: 19,
    name: "by the way",
    price: 42.7,
    thumb: "assets/thumbs/by the way.jpg",
    model: "assets/models/by the way.glb"
	
 },,
   {
    id: 20,
    name: "Calafornication",
    price: 42.7,
    thumb: "assets/thumbs/Calafornication.jpg",
    model: "assets/models/Calafornication.glb"
	
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