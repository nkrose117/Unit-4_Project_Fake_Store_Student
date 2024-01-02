const baseURL = "https://fakestoreapi.com/products/";
const cart = [];

//! make sure to use "prettier" for code.

// eliminate console.logs?

document
  .getElementById("cartButton")
  .addEventListener("click", updateCartModal);

// Global Variables
const searchDisplay = document.getElementById("display");

const searchClothesWomen = document.getElementById("clothingWomen");
const searchClothesMen = document.getElementById("clothingMen");
const searchElectronics = document.getElementById("electronics");
const searchJewelry = document.getElementById("jewelry");

// Event Listeners
searchClothesWomen.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault();
  fakeStore(`category/women's clothing`); //! category added to each of these after original submission.
  console.log();
});

searchClothesMen.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault();
  fakeStore(`category/men's clothing`);
  console.log();
});

searchElectronics.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault();
  fakeStore(`category/electronics`);
  console.log();
});

searchJewelry.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault();
  fakeStore(`category/jewelery`);
  console.log();
});

// ------------------------------------------------------------------ //

const fakeStore = async (endPoint) => {
  try {
    let response = await fetch(`${baseURL}/${endPoint}`);
    let data = await response.json();
    console.log(data);
    console.log("Data =", data);
    displayCards(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
window.onload = function () { //! added after original submission
  fakeStore(``);
};

// ------------------------------------------------------------------ //

const removeElements = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// ------------------------------------------------------------------ //

const displayCards = (data) => {
  removeElements(display);
  console.log(data);
  data.forEach((item) => {
    // Create Elements
    let card = document.createElement("div");
    let img = document.createElement("img");
    let body = document.createElement("div");
    let title = document.createElement("h5");
    let btn = document.createElement("a");
    let price = document.createElement("p");
    let priceAccordion = document.createElement("div");

    // Set Attributes
    card.className = "card";
    card.style.width = "18rem";
    img.src = item.image;
    img.className = "card-img-top";
    img.alt = item.title;
    body.className = "card-body";
    body.textContent = item.description; //! just added
    title.className = "card-title";
    title.textContent = item.title;
    btn.className = "btn btn-primary";
    btn.textContent = "Add to Cart";
    price.className = "item_price";
    price.textContent = `Price: $${item.price.toFixed(2)}`;
    // descriptionAccordion.className = "accordion accordion-flush";
    priceAccordion.className = "accordion accordion-flush";

    btn.onclick = () => {
      submitToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
      });
    };

    //! still need to get rid of extra price text (non accordion) and add description back in. Move add to cart button lower if possible.

    // Attach Elements
    body.appendChild(title);

    body.appendChild(btn);

    card.appendChild(img);

    card.appendChild(body);

    body.appendChild(price);

    // body.appendChild(title);

    // body.appendChild(price);

    // body.appendChild(btn);



    // card.appendChild(img);

    // card.appendChild(body);


   
   //!Try to shorten cards, uniform. Move button to bottom.
    let priceAccordionItem = document.createElement("div");
    priceAccordionItem.className = "accordion-item";

    let priceAccordionHeader = document.createElement("h2");
    priceAccordionHeader.className = "accordion-header";
    priceAccordionHeader.innerHTML = 
    `<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#priceCollapse${item.id}">
    Price
  </button>
`;
let priceAccordionCollapse = document.createElement("div");
priceAccordionCollapse.id = `priceCollapse${item.id}`;
priceAccordionCollapse.className = "accordion-collapse collapse";
priceAccordionCollapse.innerHTML = `
  <div class="accordion-body">
    Price: $${item.price.toFixed(2)}
  </div>
`;

priceAccordionItem.appendChild(priceAccordionHeader);
priceAccordionItem.appendChild(priceAccordionCollapse);

priceAccordion.appendChild(priceAccordionItem);

card.appendChild(priceAccordion);

searchDisplay.appendChild(card);

    // let descriptionAccordionItem = document.createElement("div");
    // descriptionAccordionItem.className = "accordion-item";

    // // Create accordion header
    // let descriptionAccordionHeader = document.createElement("h2");
    // descriptionAccordionHeader.className = "accordion-header";
    // descriptionAccordionHeader.innerHTML = `
    //   <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.id}">
    //     Description
    //   </button>
    // `;

    // // Create accordion collapse element
    // let descriptionAccordionCollapse = document.createElement("div");
    // descriptionAccordionCollapse.id = `collapse${item.id}`;
    // descriptionAccordionCollapse.className = "accordion-collapse collapse";
    // descriptionAccordionCollapse.innerHTML = `
    //   <div class="accordion-body">
    //     ${item.description}
    //   </div>
    // `;

    // // Append the accordion elements
    // descriptionAccordionItem.appendChild(descriptionAccordionHeader);
    // descriptionAccordionItem.appendChild(descriptionAccordionCollapse);

    // // Append the accordion item to an accordion container
    // descriptionAccordion.appendChild(descriptionAccordionItem);

    // // Append the description accordion to the card
    // card.appendChild(descriptionAccordion);

    // searchDisplay.appendChild(card);
  });
};

// ------------------------------------------------------------------ //

function submitToCart(item) {
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
}

// ------------------------------------------------------------------ //
function updateCartModal() {
  let total = 0;
  let tax = 0;
  let shipping = 0;

  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));

  const cartModalBody = document.getElementById("cartModalBody");

  cartModalBody.innerHTML = "";

  cartModalBody.innerHTML +=
    '<div class="row mb-3"><div class="col">Quantity</div><div class="col">Item</div><div class="col">Price</div></div>';

  if (cart.length === 0) {
    cartModalBody.innerHTML = "<p>Your cart is empty.</p>";
    cartModal.show();
    return;
  }

  // Iterate through cart items
  cart.forEach((item) => {
    // Add horizontal line
    cartModalBody.innerHTML += "<hr>";
    // Create a row for each item
    cartModalBody.innerHTML += `<div class="row"><div class="col">${
      item.quantity
    }</div><div class="col">${item.title}</div><div class="col">$${(
      item.price * item.quantity
    ).toFixed(2)}</div></div>`;

    // Update total
    total += item.price * item.quantity;
  });

  // Add horizontal line
  cartModalBody.innerHTML += "<hr>";

  // Display subtotal
  cartModalBody.innerHTML += `<p>Subtotal: $${total.toFixed(2)}</p>`;

  // Add horizontal line
  cartModalBody.innerHTML += "<hr>";

  // Calculate tax
  tax = total * 0.06;

  // Display tax
  cartModalBody.innerHTML += `<p>Tax: $${tax.toFixed(2)}</p>`;
  // Add horizontal line

  cartModalBody.innerHTML += "<hr>";
  // Calculate shipping

  shipping = total * 0.1;

  // Display shipping
  cartModalBody.innerHTML += `<p>Shipping: $${shipping.toFixed(2)}</p>`;

  // Add horizontal line
  cartModalBody.innerHTML += "<hr>";

  // Display total with green background
  cartModalBody.innerHTML += `<p style="background-color: lightgreen;"><strong>Total: $${(
    total +
    tax +
    shipping
  ).toFixed(2)}</strong></p>`;

  // Add buttons
  cartModalBody.innerHTML += '<div class="row mt-3">';
  // Only add the Clear Cart button if the cart is not empty
  if (cart.length > 0) {
    cartModalBody.innerHTML +=
      '<div class="col"><button id="clearCartBtn" class="btn btn-danger">Clear Cart</button></div>';
    cartModalBody.innerHTML += "&nbsp;"; // Add a space between the lines.
    cartModalBody.innerHTML += `<div class="col"><button id="purchaseCartBtn" class="btn btn-success">Purchase for $${(
      total +
      tax +
      shipping
    ).toFixed(2)}</button></div>`;
  }

  // Add event listeners

  document
    .getElementById("clearCartBtn")
    .addEventListener("click", function () {
      cart.length = 0;
      updateCartModal();
    });

  document
    .getElementById("purchaseCartBtn")
    .addEventListener("click", function () {
      cart.length = 0;
      cartModalBody.innerHTML = "";
      cartModalBody.innerHTML = "<p>Thank you for your purchase.</p>";
    });

  cartModal.show();
}
