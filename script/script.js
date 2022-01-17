// content script
let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "bananas",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/FHrjH935/banana.jpg",
      },
      {
        title: "apples",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/W4Kr8gKT/apple.jpg",
      },
      {
        title: "peaches",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/Vv9CzTNk/peach.jpg",
      },
      {
        title: "grapes",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/SKw2Cq2K/grapes.jpg",
      },
      {
        title: "kiwi",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/43TbRzPP/Kiwi-Fruit.jpg",
      },
      {
        title: "oranges",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/5NKQm8Dy/Oranges.jpg",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <div class="d-flex mb-3">
            <input type="number" class="form-control" value=1 min=1 id="addToCart${position}">
            <button type="button" class="btn btn-secondary ms-3" onclick="addToCart(${position})"><i class="fas fa-cart-plus"></i></button>
          </div>
          
          
          
          </div>
          <div class="d-flex justify-content-end card-footer">
            <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
              Edit
            </button>
            <button type="button" class="btn btn-danger w-50 ms-3" onclick="deleteProduct(${position})" >
              Delete
            </button>
          </div>
      </div>






      <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Fruit">Fruit</option>
                          <option value="Vegetables">Vegetables</option>
                          <option value="Meat">Meat</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });
}

readProducts(products);
showCartBadge();

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

// ADD TO CART
function addToCart(position) {
  let qty = document.querySelector(`#addToCart${position}`).value;
  let added = false;
  cart.forEach((product) => {
    if (product.title == products[position].title) {
      alert(
        `You have successfully added ${qty} ${products[position].title} to the cart`
      );
      product.qty = parseInt(product.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...products[position], qty });
    alert(
      `You have successfully added ${qty} ${products[position].title} to the cart`
    );
  }

  showCartBadge();

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Badge
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

// SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}


// cart script
const cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
console.log(cart);
function readCart(cart) {
  document.querySelector("#cart").innerHTML = "";

  let total = cart
    .reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
    .toFixed(2);

  cart.forEach((product, position) => {
    document.querySelector("#cart").innerHTML += `
      <div class="card mb-3 w-100  position-relative" >
      <button type="button" class="position-absolute top-0 start-100 translate-middle badge btn btn-danger" onclick="removeFromCart(${position})">X</button>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.img}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column container">
              <h5 class="card-title mb-3">${product.title}</h5>
              <div class="d-flex mb-3 justify-content-between">
                <p class="card-text">Individual price: </p>
                <span>R${product.price}<span>
              </div>
              <div class="d-flex mb-3 justify-content-between">
                <label class="form-label">Quantity:</label>
                <input type="number" min=1 id="remove${position}" value=${
      product.qty
    } onchange="updateCart(${position})" />
              </div>
              <div class="card-footer bg-white d-flex justify-content-between  p-0 pt-3">
                <p>Total Cost: </p>
                <span>R${(
                  parseFloat(product.price) * parseInt(product.qty)
                ).toFixed(2)}</span>
              </div>
            </div>  
          </div>
        </div>
      </div>
    `;
  });
  showCartBadge();
  document.querySelector("#cart-footer").innerHTML += `
    <h3>Total cost: R${total}</h3>
    <button class="btn btn-primary btn-lg" onclick="checkout()">
      Checkout
    </button>
  `;
}

// Update Cart Badge
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

readCart(cart);

// UPDATE
function updateCart(position) {
  let qty = document.querySelector(`#remove${position}`).value;
  cart[position] = { ...cart[position], qty };
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}

// REMOVE
function removeFromCart(position) {
  let confirmation = confirm(
    "Are you sure you want to remove this product from the cart?"
  );

  if (confirmation) {
    cart.splice(position, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    readCart(cart);
  }
}

// CHECKOUT
function checkout() {
  let total = cart
    .reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
    .toFixed(2);
  try {
    if (parseInt(total) == 0) throw new Error("Nothing in cart");
    let confirmation = confirm(`Total payment needed: R${total}`);

    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
      readCart(cart);
    }
  } catch (err) {
    alert(err);
  }
}
