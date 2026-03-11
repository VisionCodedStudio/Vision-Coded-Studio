/* ===============================
CART STORAGE
================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ===============================
UPDATE CART COUNT
================================ */

function updateCartCount(){

const cartCount = document.getElementById("cart-count");

if(!cartCount) return;

let totalItems = 0;

cart.forEach(item=>{
totalItems += item.quantity;
});

cartCount.innerText = totalItems;

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

});

});


/* ===============================
LOAD SIDEBAR CART
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

<button onclick="decreaseQty(${index})">-</button>

<span>${item.quantity}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<div class="cart-price">

$${(item.price * item.quantity).toFixed(2)}

</div>

<button onclick="removeItem(${index})">Remove</button>

`;

cartItems.appendChild(itemDiv);

total += item.price * item.quantity;

});

if(subtotal){
subtotal.innerText = "$" + total.toFixed(2);
}

}


/* ===============================
LOAD CART PAGE TABLE
================================ */

function loadCartPage(){

const table = document.getElementById("cart-table-items");
const totalDisplay = document.getElementById("cart-summary-total");

if(!table) return;

table.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

let row = document.createElement("tr");

row.innerHTML = `

<td class="cart-product">
<img src="${item.image}" width="60">
${item.name}
</td>

<td>$${item.price.toFixed(2)}</td>

<td>

<button onclick="decreaseQty(${index})">-</button>

${item.quantity}

<button onclick="increaseQty(${index})">+</button>

</td>

<td>$${(item.price * item.quantity).toFixed(2)}</td>

<td>
<button onclick="removeItem(${index})">X</button>
</td>

`;

table.appendChild(row);

total += item.price * item.quantity;

});

if(totalDisplay){
totalDisplay.innerText = "$" + total.toFixed(2);
}

}


/* ===============================
LOAD CHECKOUT PAGE
================================ */

function loadCheckout(){

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

if(!checkoutItems) return;

checkoutItems.innerHTML = "";

let total = 0;

cart.forEach(item=>{

let row = document.createElement("div");

row.classList.add("checkout-item");

row.innerHTML = `

<div class="checkout-product">

<img src="${item.image}" width="50">

<span>${item.name} x${item.quantity}</span>

</div>

<span>$${(item.price * item.quantity).toFixed(2)}</span>

`;

checkoutItems.appendChild(row);

total += item.price * item.quantity;

});

checkoutTotal.innerText = "$" + total.toFixed(2);

}


/* ===============================
QUANTITY CONTROLS
================================ */

function increaseQty(index){

cart[index].quantity++;

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();
loadCartPage();
loadCheckout();
updateCartCount();

}


function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();
loadCartPage();
loadCheckout();
updateCartCount();

}


function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();
loadCartPage();
loadCheckout();
updateCartCount();

}


/* ===============================
SIDEBAR TOGGLE
================================ */

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");

if(cartIcon && cartSidebar){

cartIcon.addEventListener("click", ()=>{
cartSidebar.classList.add("open");
});

}

if(closeCart){

closeCart.addEventListener("click", ()=>{
cartSidebar.classList.remove("open");
});

}


/* ===============================
CLEAR CART AFTER ORDER
================================ */

if(window.location.pathname.includes("order-success")){
localStorage.removeItem("cart");
}


/* ===============================
INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", function(){

updateCartCount();
loadCart();
loadCartPage();
loadCheckout();

});
