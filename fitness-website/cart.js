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


/* CHECK IF PRODUCT ALREADY EXISTS */

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

alert(name + " added to cart");

});

});


/* ===============================
   LOAD CART PAGE
================================ */

function loadCart(){

const cartItems = document.getElementById("cart-items");
const subtotal = document.getElementById("cart-subtotal");

if(!cartItems) return;

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

let row = document.createElement("tr");

row.innerHTML = `

<td class="cart-product">

<img src="${item.image}" width="60">
<span>${item.name}</span>

</td>

<td>$${item.price}</td>

<td>${item.quantity}</td>

<td>$${(item.price * item.quantity).toFixed(2)}</td>

<td>
<button onclick="removeItem(${index})">Remove</button>
</td>

`;

cartItems.appendChild(row);

total += item.price * item.quantity;

});

if(subtotal){
subtotal.innerText = "$" + total.toFixed(2);
}

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
   INITIALIZE
================================ */

updateCartCount();
loadCart();
