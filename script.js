const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search-input");
const listMenu = document.getElementById("list-menu");
const gridMenu = document.getElementById("grid-menu");

// list Menu
listMenu.onclick = () => {
  productsContainer.classList.add("list-menu");
};

// grid Menu
gridMenu.onclick = () => {
  productsContainer.classList.remove("list-menu");
};

// search input
searchInput.addEventListener("change", (e) => {
  const elements = document.getElementsByClassName("variants");
  for (let i = 0; i < elements.length; i++) {
    const variantElement = elements[i];
    if (e.target.value !== "") {
      if (
        variantElement.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        variantElement.classList.add("selected");
      } else {
        variantElement.classList.remove("selected");
      }
    } else {
      variantElement.classList.remove("selected");
    }
  }
});

function productCard(product) {
  const { product_badge, product_image, product_title, product_variants } =
    product;

  const productCardContainer = document.createElement("div"); // product card container
  productCardContainer.classList.add("product-card");
  //   section 1
  const productImgContainer = document.createElement("div");
  productImgContainer.classList.add("product-img-container");
  // badge
  const badgeElement = document.createElement("a");
  badgeElement.textContent = product_badge;
  badgeElement.classList.add("badge");
  productImgContainer.appendChild(badgeElement);
  // img
  const imageElement = document.createElement("img");
  imageElement.src = product_image;
  imageElement.classList.add("image");
  productImgContainer.appendChild(imageElement);
  productCardContainer.appendChild(productImgContainer);
  //   section 2
  const productDetailsContainer = document.createElement("div");
  productDetailsContainer.classList.add("product-details-container");
  //   title
  const titleElement = document.createElement("h1");
  titleElement.textContent = product_title;
  titleElement.classList.add("title");
  productDetailsContainer.appendChild(titleElement);
  // variants
  for (let i = 0; i < product_variants.length; i++) {
    const element = product_variants[i];
    const vElement = document.createElement("p");
    vElement.classList.add("variants");
    vElement.textContent = textContent = element["v" + (i + 1)];
    productDetailsContainer.appendChild(vElement);
  }
  productCardContainer.appendChild(productDetailsContainer);
  productsContainer.appendChild(productCardContainer);
}

// get data from server
async function getAPiData() {
  const res = await fetch(
    "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
  );
  const { data } = await res.json();
  for (let i = 0; i < data.length; i++) {
    const productData = data[i];
    productCard(productData);
  }
}
getAPiData();
