const products = [
    { id: 1, name: "Wireless Headphones", price: 2999, category: "Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 2, name: "Smart Watch", price: 4500, category: "Wearable", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 3, name: "Mechanical Keyboard", price: 3200, category: "Peripherals", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300" },
    { id: 4, name: "Bluetooth Speaker", price: 1500, category: "Audio", img:"https://images.unsplash.com/photo-1725016934951-5acd118169de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    { id: 5, name: "Gaming Mouse", price: 1800, category: "Peripherals", img:"https://media.istockphoto.com/id/1091778794/photo/computer-mouse-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=Wzig558R_hhlQ4GgQddLbahAdASQGVUqcluNHHehzNo="},
];

let cart = [];
let currentCategory = 'All';

// 1. Display Products Function
function displayProducts(items) {
    const grid = document.getElementById('product-grid');
    if (items.length === 0) {
        grid.innerHTML = `<h3 style="grid-column: 1/-1; text-align:center; color:gray;">No products found!</h3>`;
        return;
    }
    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p><strong>₹${product.price}</strong></p>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// 2. Filter by Category
function filterCategory(category, event) {
    currentCategory = category;
    
    // Update active button UI
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    filterSearch(); // Trigger search logic to handle category + search text together
}

// 3. Combined Search Logic (Handles Category + Search Text)
function filterSearch() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    
    const filtered = products.filter(p => {
        const matchesCategory = (currentCategory === 'All' || p.category === currentCategory);
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}

// 4. Cart Logic
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItemsDiv = document.getElementById('cart-items');
    
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').innerText = total;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// Initial Load
displayProducts(products);