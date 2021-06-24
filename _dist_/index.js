/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const API = "/api/avo";

// Intl API to FORMAT NUMBERS (CURRENCY)
const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(price);
  return newPrice;
};

const details = {};
const handleDetails = (id) => {
  const detail = document.querySelector(`#${id}`);
  const parent = document.querySelector(`#${id}`).parentElement;
  if (!id in details) {
    details[id] = false;
  }
  if (details[id]) {
    detail.className =
      "col-start-1 col-end-3 text-left mx-9 my-3 text-gray-600 hidden";
    parent.classList.remove("bg-gray-100");
    details[id] = false;
  } else {
    detail.className =
      "col-start-1 col-end-3 text-left mx-9 my-3 text-gray-600";
    parent.classList.add("bg-gray-100");
    details[id] = true;
  }
};

const appNode = document.querySelector("#app");

// web API Fetch
// WHIT ASYNC AWAIT
const fetchAvocados = async () => {
  const response = await fetch(`${baseUrl}${API}`);
  return await response.json();
};

const avocados = await fetchAvocados();
const allItems = [];
avocados.data.forEach((item, index) => {
  // Create image
  const image = document.createElement("img");
  image.src = `${baseUrl}${item.image}`;
  image.className =
    "rounded-full h-28 w-28 my-2 col-start-1 row-start-1 row-end-3 self-center mx-auto";
  // Create Title
  const title = document.createElement("h2");
  title.textContent = item.name;
  title.className = "text-xl self-end font-semibold text-left leading-5 mr-3";
  // Create Price
  const price = document.createElement("div");
  price.textContent = formatPrice(item.price);
  price.className = "text-base text-gray-600 self-start font-medium text-left";

  //Adding Details
  const description = document.createElement("p");
  description.innerHTML = `<b>Description: </b>${item.attributes.description}`;
  const shape = document.createElement("p");
  shape.innerHTML = `<b>Shape: </b>${item.attributes.shape}`;
  const taste = document.createElement("p");
  taste.innerHTML = `<b>Taste: </b>${item.attributes.taste}`;

  const detailsContainer = document.createElement("div");
  detailsContainer.id = `details-${index}`;
  detailsContainer.append(description, shape, taste);
  detailsContainer.className =
    "col-start-1 col-end-3 text-left mx-9 my-3 text-gray-600 hidden";

  // Create container for every item
  const container = document.createElement("div");
  container.append(image, title, price, detailsContainer);
  container.className =
    "grid grid-rows-2 grid-cols-2 bg-gray-50 h-auto m-2 rounded-2xl cursor-pointer hover:bg-gray-100 self-start";
  container.onclick = () => {
    handleDetails(`details-${index}`);
  };

  allItems.push(container);
});

// Adding all nodes one time
appNode.append(...allItems);
