let cart = []

const cartCount = document.getElementById("cart-count")

document.querySelectorAll(".add-cart").forEach(button => {

button.addEventListener("click", () => {

const productCard = button.closest(".product-card")

const productName = productCard.querySelector("h3").innerText
const productPrice = productCard.querySelector(".price").innerText

const item = {
name: productName,
price: productPrice
}

cart.push(item)

cartCount.innerText = cart.length

console.log(cart)

alert(productName + " added to cart")

})

})
