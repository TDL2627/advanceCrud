// content script
let guns = JSON.parse(localStorage.getItem("guns"))
  ? JSON.parse(localStorage.getItem("guns"))
  : [
      {
        title: "Desert Eagle",
        category: "Pistol",
        price: 7000,
        img: "https://cdn11.bigcommerce.com/s-kp97pt369w/images/stencil/1280x1280/guns/3558/10102/SVimg-DE50ASIMB__21050.1621622372.jpg?c=2",
      },
      {
        title: "M16",
        category: "Assualt Rifle",
        price: 1299.99,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/M16A2_noBG.jpg/1200px-M16A2_noBG.jpg",
      },
      {
        title: "M8879",
        category: "Shotgun",
        price: 10000,
        img: "https://www.taiwangun.com/img/gun_media/377001-378000/strzelby-asg-gazowe-strzelba-m8879-zasilana-green-gazem-black-golden-eagle-377376(3).JPG",
      },
      {
        title: "Glock",
        category: "Pistol",
        price: 5000,
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Glock_17-removebg-preview.png",
      },
      {
        title: "AK-47",
        category: "Assualt Rifle",
        price: 9000,
        img: "https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg",
      },
      {
        title: "M1 Garand",
        category: "Assualt Rifle",
        price: 3000,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/M1_Garand_rifle_USA_noBg.jpg/1200px-M1_Garand_rifle_USA_noBg.jpg",
      },
      {
        title: "Sawed-off Shotgun",
        category: "Shotgun",
        price: 5000,
        img: "https://www.gannett-cdn.com/-mm-/86102464e67817ea13e7e8c29f0f5046cbd894ac/c=0-0-2618-1479/local/-/media/2015/02/24/Phoenix/Phoenix/635603710886371290-87532087.jpg",
      },
      {
        title: "357",
        category: "Pistol",
        price: 11000,
        img: "https://media.istockphoto.com/photos/handgun-357-magnum-and-bullets-picture-id152998352",
      }
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// Get
function readGuns(guns) {
  document.querySelector("#guns").innerHTML = "";
  guns.forEach((gun, position) => {
    document.querySelector("#guns").innerHTML += `
      <div class="card">
        <img src="${gun.img}" class="card-img-top" alt="${gun.title}">
        <div class="card-body">
          <h5 class="card-title">${gun.title}</h5>
          <p class="card-text">R${gun.price}</p>
          <div class="d-flex mb-3">
            <input type="number" class="form-control" value=1 min=1 id="addToCart${position}">
            <button type="button" class="btn btn-secondary ms-3" onclick="addToCart(${position})"><i class="fas fa-cart-plus"></i></button>
          </div>
          
          
          
          </div>
          <div class="d-flex justify-content-end card-footer">
            <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#editgun${position}" >
              Edit
            </button>
            <button type="button" class="btn btn-danger w-50 ms-3" onclick="deletegun(${position})" >
              Delete
            </button>
          </div>
      </div>






      <div
                class="modal fade"
                id="editgun${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${gun.title}
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
                          value="${gun.title}"
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
                          value="${gun.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${gun.img}"
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
                        onclick="updategun(${position})"
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

readGuns(guns);
showCartBadge();

// CREATE
function creategun() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    guns.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("guns", JSON.stringify(guns));
    readGuns(guns);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updategun(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    guns[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("guns", JSON.stringify(guns));
    readGuns(guns);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deletegun(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected gun?"
  );

  if (confirmation) {
    guns.splice(position, 1);
    localStorage.setItem("guns", JSON.stringify(guns));
    readGuns(guns);
  }
}

// ADD TO CART
function addToCart(position) {
  let qty = document.querySelector(`#addToCart${position}`).value;
  let added = false;
  cart.forEach((gun) => {
    if (gun.title == guns[position].title) {
      alert(
        `You have successfully added ${qty} ${guns[position].title} to the cart`
      );
      gun.qty = parseInt(gun.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...guns[position], qty });
    alert(
      `You have successfully added ${qty} ${guns[position].title} to the cart`
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
    return readGuns(guns);
  }

  let foundguns = guns.filter((gun) => {
    return gun.category == category;
  });

  readGuns(foundguns);
  console.log(foundguns);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedguns = guns.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedguns.reverse();
  console.log(sortedguns);
  readGuns(guns);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedguns = guns.sort((a, b) => a.price - b.price);

  console.log(sortedguns);

  if (direction == "descending") sortedguns.reverse();
  readGuns(sortedguns);
}


