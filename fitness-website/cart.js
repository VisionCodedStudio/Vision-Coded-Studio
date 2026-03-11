/* ===============================
   CART STORAGE
================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ===============================
   UPDATE CART COUNT
================================ */

function updateCartCount(){

const cartCount = document.getElementById("cart-count");

if(cartCount){

let totalItems = 0;

cart.forEach(item=>{
totalItems += item.quantity;
});

cartCount.innerText = totalItems;

}

}


/* ===============================
   ADD TO CART
================================ */

document.querySelectorAll(".add-cart").forEach(button=>{

button.addEventListener("click",()=>{

const productCard = button.closest(".product-card");

const name = productCard.querySelector("h3").innerText;

const price = parseFloat(
productCard.querySelector(".price").innerText.replace("$","")
);

const image = productCard.querySelector("img").src;


/* CHECK IF PRODUCT EXISTS */

let existingProduct = cart.find(item => item.name === name);

if(existingProduct){

existingProduct.quantity++;

}else{

cart.push({
name,
price,
image,
quantity:1
});

}

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

loadCart();

/* OPEN CART AUTOMATICALLY */

const cartSidebar = document.getElementById("cart-sidebar");

if(cartSidebar){
cartSidebar.classList.add("open");
}

});

});


/* ===============================
   LOAD CART ITEMS
================================ */

function loadCart(){

const cartItems = document.getElementById("cart-items");
const subtotal = document.getElementById("cart-subtotal");

if(!cartItems) return;

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

let itemDiv = document.createElement("div");

itemDiv.classList.add("cart-item");

itemDiv.innerHTML = `

<div class="cart-product">

<img src="${item.image}" width="60">

<span>${item.name}</span>

</div>

<div class="cart-controls">

<button class="qty-btn" onclick="decreaseQty(${index})">-</button>

<span>${item.quantity}</span>

<button class="qty-btn" onclick="increaseQty(${index})">+</button>

</div>

<div class="cart-price">

$${(item.price * item.quantity).toFixed(2)}

</div>

<div>

<button class="remove-btn" onclick="removeItem(${index})">
Remove
</button>

</div>

`;

cartItems.appendChild(itemDiv);

total += item.price * item.quantity;

});

if(subtotal){
subtotal.innerText = "$" + total.toFixed(2);
}

}


/* ===============================
   INCREASE QUANTITY
================================ */

function increaseQty(index){

cart[index].quantity++;

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();
updateCartCount();

}


/* ===============================
   DECREASE QUANTITY
================================ */

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();
updateCartCount();

}


/* ===============================
   REMOVE ITEM
================================ */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();
updateCartCount();

}


/* ===============================
   CART SIDEBAR CONTROLS
================================ */

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");

if(cartIcon){

const overlay = document.getElementById("cart-overlay");

cartIcon.addEventListener("click", ()=>{
cartSidebar.classList.add("open");
overlay.classList.add("active");
});

closeCart.addEventListener("click", ()=>{
cartSidebar.classList.remove("open");
overlay.classList.remove("active");
});

}

if(closeCart){

closeCart.addEventListener("click", ()=>{

cartSidebar.classList.remove("open");

});

}


/* ===============================
   LOAD CHECKOUT SUMMARY
================================ */

function loadCheckout(){

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

if(!checkoutItems) return;

checkoutItems.innerHTML = "";

let total = 0;

cart.forEach(item=>{

let row = document.createElement("p");

row.innerText =
item.name + " x" + item.quantity + " - $" + (item.price * item.quantity);

checkoutItems.appendChild(row);

total += item.price * item.quantity;

});

checkoutTotal.innerText = "$" + total.toFixed(2);

}

loadCheckout();


/* ===============================
   CLEAR CART AFTER ORDER
================================ */

if(window.location.pathname.includes("order-success")){

localStorage.removeItem("cart");

}


/* ===============================
   INITIALIZE CART
================================ */

updateCartCount();
loadCart();
