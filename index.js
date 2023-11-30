const baseURL = 'https://fakestoreapi.com/products/category';
// const baseURL = 'https://fakestoreapi.com/products';
const cart = [];

// Global Variables
const searchDisplay = document.getElementById(`display`);

const searchClothesWomen = document.getElementById('clothingWomen');
const searchClothesMen = document.getElementById('clothingMen');
const searchElectronics = document.getElementById('electronics');
const searchJewelry = document.getElementById('jewelry');
// const searchCart = document.getElementById('shoppingCart');

// Event Listeners
searchClothesWomen.addEventListener('click', e => {
  console.log(e);
  e.preventDefault();
  fakeStore(`women's clothing`);
  console.log();
});

searchClothesMen.addEventListener('click', e => {
  console.log(e);
  e.preventDefault();
  fakeStore(`men's clothing`);
  console.log();
});

searchElectronics.addEventListener('click', e => {
  console.log(e);
  e.preventDefault();
  fakeStore(`electronics`);
  console.log();
});

searchJewelry.addEventListener('click', e => {
  console.log(e);
  e.preventDefault();
  fakeStore(`jewelery`);
  console.log();
});

// searchCart.addEventListener('click', e => {
//   console.log(e);
//   e.preventDefault();
//   updateCartModal();
// });

// ------------------------------------------------------------------ //
async function fakeStore(endPoint) {
    try {
      let response = await fetch(`${baseURL}/${endPoint}`);
      let data = await response.json();
      console.log(data);
      console.log('Data =', data);
      displayCards(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

// ------------------------------------------------------------------ //  
  window.onload = function () {
    fakeStore(); 
    
};
const removeElements = element => {
  while(element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

// ------------------------------------------------------------------ //

// Display Cards
function displayCards(data) {
  removeElements(display);
  console.log(data);
  data.forEach(item => {
  // Create Elements
    let card = document.createElement('div');
    let img = document.createElement('img');
    let body = document.createElement('div');
    let title = document.createElement('h5');
    let btn = document.createElement('a');
    let p = document.createElement('p');

  // Set Attributes
    card.className = 'card';
    card.style.width = '18rem';
    img.src = item.image;
    img.className = 'card-img-top';
    img.alt = item.title;
    body.className = 'card-body.accordion-container';
    title.className = 'card-title'; // active?
    title.textContent = item.title;
    btn.className = 'btn btn-primary'; // active?
    btn.textContent = 'Add to Cart';
    p.className = 'item_price_accordion';
    p.textContent = `Price: $${item.price.toFixed(2)}`;
        btn.onclick = () => {
            submitToCart( {
              item: item.id,
              title: item.title,
              price: item.price,
              quantity: 1
            });
        };
          
        
  // Attach Elements
    body.appendChild(title);

    body.appendChild(btn);

    card.appendChild(img);

    card.appendChild(body);

    body.appendChild(p);

    searchDisplay.appendChild(card);
});
};

// ------------------------------------------------------------------ //

function submitToCart (item) {
  const existingItem = cart.find (
    cartItem => cartItem.id === item.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
};

// ------------------------------------------------------------------ //
function updateCartModal() {


  // Initialize variables for calculations
  let total = 0;
  let tax = 0;
  let shipping = 0;


  // Get the cart modal element
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

  // Get the modal body element
  const cartModalBody = document.getElementById('cartModalBody');

  // Clear existing content
  cartModalBody.innerHTML = '';

  // Add header

  //cartModalBody.innerHTML += '<h1>Cart</h1>';
  //cartModalBody.innerHTML += '<hr>';


  // Add column headers in a row
  cartModalBody.innerHTML += '<div class="row mb-3"><div class="col">Quantity</div><div class="col">Item</div><div class="col">Price</div></div>';

  if (cart.length === 0) {
    // Display a message indicating that the cart is empty
    displayEmptyCartMessage();
    cartModal.show();
    return;
  }
  // Iterate through cart items
  cart.forEach(item => {
      // Add horizontal line
      cartModalBody.innerHTML += '<hr>';
      // Create a row for each item
      cartModalBody.innerHTML += `<div class="row"><div class="col">${item.quantity}</div><div class="col">${item.title}</div><div class="col">$${(item.price * item.quantity).toFixed(2)}</div></div>`;
    
      // Update total
      total += item.price * item.quantity;
  });

  // Add horizontal line
  cartModalBody.innerHTML += '<hr>';

  // Display subtotal
  cartModalBody.innerHTML += `<p>Subtotal: $${total.toFixed(2)}</p>`;

  // Add horizontal line
  cartModalBody.innerHTML += '<hr>';

  // Calculate tax
  tax = total * 0.06;

  // Display tax
  cartModalBody.innerHTML += `<p>Tax: $${tax.toFixed(2)}</p>`;
  // Add horizontal line
  cartModalBody.innerHTML += '<hr>';

  // Calculate shipping
  shipping = total * 0.10;

  // Display shipping
  cartModalBody.innerHTML += `<p>Shipping: $${shipping.toFixed(2)}</p>`;

  // Add horizontal line
  cartModalBody.innerHTML += '<hr>';

  // Display total with green background
  cartModalBody.innerHTML += `<p style="background-color: lightgreen;"><strong>Total: $${(total + tax + shipping).toFixed(2)}</strong></p>`;
  
  // Add buttons
  cartModalBody.innerHTML += '<div class="row mt-3">';
// /  / Only add the Clear Cart button if the cart is not empty
  if (cart.length > 0) {
    //cartModalBody.innerHTML += '<div class="col"><button class="btn btn-danger" onclick="clearCart()">Clear Cart</button></div>';
    cartModalBody.innerHTML += '<div class="col"><button id="clearCartBtn" class="btn btn-danger">Clear Cart</button></div>';
    cartModalBody.innerHTML += '&nbsp;'; // Add a space between the lines. 
    cartModalBody.innerHTML += `<div class="col"><button id="purchaseCartBtn" class="btn btn-success">Purchase for $${(total + tax + shipping).toFixed(2)}</button></div>`;
    // Add close button (X)
    //cartModalBody.innerHTML += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
  }
  //cartModalBody.innerHTML += '<div class="col"><button id="clearCartBtn" class="btn btn-danger">Clear Cart</button></div>'// Add Close button
  //cartModalBody.innerHTML += '<div class="col text-end"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>';
  //cartModalBody.innerHTML += '</div>';
    document.getElementById('cartButton').addEventListener('click', updateCartModal);
  // Add event listeners
  // document.getElementById('cartButton').addEventListener('click', updateCartModal);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('purchaseCartBtn').addEventListener('click', function() {
    //purchaseCart(total + tax + shipping);
    displayThanksMessage();
  });


  /*// Add buttons
  cartModalBody.innerHTML += '<div class="row mt-3">';
  cartModalBody.innerHTML += '<div class="col"><button class="btn btn-danger" onclick="clearCart()">Clear Cart</button></div>';
  cartModalBody.innerHTML += `<div class="col text-end"><button class="btn btn-success" onclick="purchaseCart(${total + tax + shipping})">Purchase for $${(total + tax + shipping).toFixed(2)}</button></div>`;
  cartModalBody.innerHTML += '</div>';
  */

  // Show the Bootstrap modal
  cartModal.show();
  
};// end of function updateCartModal


// function displayCart () {
  

//   let modalWindow = document.querySelector(`.modal`);
//   removeElements(modalWindow);

//   if (cart.length === 0) {
//     modalWindow.textContent = 'Your Cart is Empty.'
//   }

// let total = 0;
//   cart.forEach(item => {
// let cartItem = document.createElement('div');
// let title = document.createElement('h5');
// let quantity = document.createElement('p');
// let price = document.createElement('p');

// total += item.price * item.quantity; 

// cartItem.appendChild(title);
// cartItem.appendChild(price);
// cartItem.appendChild(quantity);
// searchDisplay.appendChild(cartItem);
// })

// let totalDisplay = document.createElement('p');
//   totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
//   searchDisplay.appendChild(totalDisplay);

//   // Now we calculate the tax and and display tax
//   let tax = total * 0.06; // this is the Vermont state Tax rate.  
//   let taxDisplay = document.createElement('p');
//   taxDisplay.textContent = `Tax (6%): $${tax.toFixed(2)}`;
//   searchDisplay.appendChild(taxDisplay);

//   // Display total plus the tax now. 
//   let totalPlusTaxDisplay = document.createElement('p');
//   totalPlusTaxDisplay.textContent = `Total + Tax: $${(total + tax).toFixed(2)}`;
//   modalWindow.appendChild(totalPlusTaxDisplay);

//   // Shipping cost is set to 10% of the total price of the objects
//   let shipping = total * 0.10;
//   let shippingDisplay = document.createElement('p');
//   shippingDisplay.textContent = `Shipping: $${shipping.toFixed(2)}`;
//   modalWindow.appendChild(shippingDisplay);

//   // Now we display total with the tax and the shipping amounts.
//   let grandTotal = total + tax + shipping;
//   let grandTotalDisplay = document.createElement('p');
//   grandTotalDisplay.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
//   modalWindow.appendChild(grandTotalDisplay);

//   // We need to add a Purchase button
//   let purchaseButton = document.createElement('button');
//   purchaseButton.textContent = 'Purchase for $' + grandTotal.toFixed(2);
//   purchaseButton.className = 'btn btn-success';
//   purchaseButton.addEventListener('click', function () {
//     alert('Thank you for your Purchase!  We appreciate it!');
//     cart.length = 0; // Clear the cart
//     displayCart(); // Display an updated cart
//   });
//   modalWindow.appendChild(purchaseButton);

//   // Add the Clear Cart button
//   let clearCartButton = document.createElement('button');
//   clearCartButton.textContent = 'Clear Cart';
//   clearCartButton.className = 'btn btn-danger';
//   clearCartButton.addEventListener('click', function () {
//     cart.length = 0; // Clear the cart here!
//     displayCart(); // Display an updated cart here!  
//   });
//  modalWindow.appendChild(clearCartButton);
// } // end of displayCart

// // ------------------------------------------------------------------ //

// function toggleContent(category) {
//   const content = document.getElementById(`${category}Content`);
//   if (content.style.display === 'none') {
//     content.style.display = 'block';
//     // Fetch data if not already fetched
//     if (!content.dataset.fetched) {
//       fakeStore(category);
//       content.dataset.fetched = true;
//     }
//   } else {
//     content.style.display = 'none';
//   }
// } // end of toggleContent

// // ------------------------------------------------------------------ //

// const removeElement = element => {
//   while (element.firstChild) {
//       element.removeChild(element.firstChild);
//   }
// };  // end of removeElements

// ------------------------------------------------------------------ //

// function submitToCart (item) {
//   btn.onclick = () => {
//     cart.push();
// }




// const accordions = document.querySelectorAll('.accordion-container .item_price_accordion');

// accordions.forEach(accordion => {
//   accordion.addEventListener('click', e => {
//     accordion.classList.toggle('active');
//   })

// })


       
        // let obj = {
        //   id: item.id;
        //   title: item.title;
        //   cost: item.price;
          // quantity: // ???
        // card.className = 'card';
        // card.style.width = '18rem';
        // img.src = item.image;
        // img.className = 'card-img-top';
        // img.alt = item.title;
        // body.className = 'card-body accordion.container';
        // title.className = 'card-title'; // active?
        // title.textContent = item.title;
        // btn.className = 'btn btn-primary accordion.content'; // active?
        // btn.textContent = 'Add to Cart';
        // p.textContent = `Price: $${item.price.toFixed(2)}`;
        //     btn.onclick = () => {
        //         cart.push();
        //     }
  




