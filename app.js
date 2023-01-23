const productContainer = document.querySelector(".product-container");
const subtotalPrice = document.querySelector("#subtotal-price");
const taxPrice = document.querySelector("#tax-price");
const shipmentPrice = document.querySelector("#shipment");
const grandTotal = document.querySelector("#total-price");
const allProductTotal = document.querySelectorAll("#product-total");
const btnRemove = document.querySelector("#btn-remove");

function increase(e) {
  let amount = e.target.previousElementSibling;
  let itemIncrease = Number(amount.innerText);
  itemIncrease++;
  amount.innerText = itemIncrease;
}

function decrease(e) {
  let amount = e.target.nextElementSibling;
  let itemDecrease = Number(amount.innerText);
  itemDecrease--;
  itemDecrease >= 0 ? (amount.innerText = itemDecrease) : null;
}

function price(e) {
  let amount = e.target.closest(".amount").querySelector("#quantity").innerText;
  let discountPrice =
    e.target.closest(".amount").previousElementSibling.firstElementChild;
  let totalPrice = discountPrice.innerText.slice(1);
  let productTotal = e.target
    .closest(".product-information")
    .querySelector("#product-total");
  productTotal.innerText = (amount * totalPrice).toFixed(2);
}

function payment(e) {
  const subTotal = [...allProductTotal];
  const innerSubtotal = subTotal
    .map((i) => Number(i.innerText))
    .reduce((v1, v2) => v1 + v2);
  subtotalPrice.innerText = "$" + Number(innerSubtotal.toFixed(2));

  taxPrice.innerText = "$" + Number((innerSubtotal * 0.18).toFixed(2));

  subtotalPrice.innerText != "$0"
    ? (shipmentPrice.innerText = "$15")
    : (shipmentPrice.innerText = "$0");

  grandTotal.innerText =
    "$" +
    (
      Number(subtotalPrice.innerText.slice(1)) +
      Number(taxPrice.innerText.slice(1)) +
      Number(shipmentPrice.innerText.slice(1))
    ).toFixed(2);
}

function itemRemove(e) {
  const item = e.target.closest(".item");
  item.querySelector("#product-total").innerText = 0;
  item.remove();
}

productContainer.addEventListener("click", (e) => {
  if (e.target.className == "fas fa-duotone fa-square-plus") {
    increase(e);
    price(e);
    payment(e);
  } else if (e.target.className == "fas fa-duotone fa-square-minus") {
    decrease(e);
    price(e);
    payment(e);
  } else if (e.target.id == "btn-remove") {
    itemRemove(e);
    payment(e);
  }
});
