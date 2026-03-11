let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* UPDATE CART COUNT */

function updateCartCount(){

const cartCount = document.getElementById("cart-count");

if(cartCount){

cartCount.innerText = cart.length;

}

}

/* ADD TO CART */

document.querySelectorAll(".add-cart").forEach(button=>{

button.addEventListener("click",()=>{

const productCard = button.closest(".product-card");

const product = {

name: productCard.querySelector("h3").innerText,

price: productCard.querySelector(".price").innerText.replace("$",""),

image: productCard.querySelector("img").src,

quantity:1

};

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert(product.name + " added to cart");

});

});

/* LOAD CART PAGE */

function loadCart(){

const cartItems = document.getElementById("cart-items");

const subtotal = document.getElementById("cart-subtotal");

if(!cartItems) return;

cartItems.innerHTML="";

let total = 0;

cart.forEach((item,index)=>{

let row = document.createElement("tr");

row.innerHTML = `

<td>${item.name}</td>
<td>$${item.price}</td>
<td>${item.quantity}</td>
<td>$${item.price * item.quantity}</td>
<td><button onclick="removeItem(${index})">X</button></td>

`;

cartItems.appendChild(row);

total += item.price * item.quantity;

});

subtotal.innerText = "$"+total;

}

/* REMOVE ITEM */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

updateCartCount();

}

/* INIT */

updateCartCount();
loadCart();
