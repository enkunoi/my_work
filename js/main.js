const products = [
    {
        id: 1,
        title: "Ноутбук Apple MacBook Pro 16",
        price: 99999,
        category: "laptops",
        image: "img/apple-macBook-pro16.jpg",
    },
    {
        id: 2,
        title: "Смартфон Iphone 13",
        price: 46000,
        category: "smartphones",
        image: "img/iphone13.jpg",
    },
    {
        id: 3,
        title: "Ігрова клавіатура AULA F75",
        price: 2200,
        category: "keybords",
        image: "img/aulaF75.jpg",
    },
    {
        id: 4,
        title: "Ігрова клавіатура HATOR Rockfall 3TKL",
        price: 3399,
        category: "keybords",
        image: "img/hator3TklWireless.jpg",
    },
    {
        id: 5,
        title: "Смарт-телевізор LG OLED55C3RLA",
        price: 184999,
        category: "smarttv",
        image: "img/LG-OLED55C3RLA.jpg",
    },
    {
        id: 6,
        title: "Навушники Sony WH-1000XM5",
        price: 13999,
        category: "headphones",
        image: "img/Sony-WH-1000XM5.jpg",
    },
    {
        id: 7,
        title: "Док-станція для ноутбука Dell WD19S",
        price: 8999,
        category: "stations",
        image: "img/station-Dell-WD19S.jpg",
    },
    {
        id: 8,
        title: "Ігрова мика HATOR Pulsar 3",
        price: 1569,
        category: "computermouses",
        image: "img/hatorPulsar3.jpg",
    },
    {
        id: 9,
        title: "Килим для миші EVOLVE OnePadd",
        price: 599,
        category: "mousepads",
        image: "img/evolveMousePad.jpg",
    },

]
let cart = [];

function fetchProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
    }, 1500); 
  });
}


const container = document.querySelector(".products-grid");
container.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-buy")) {
        const productId = Number(event.target.dataset.id);
        const selectedProduct = products.find((p) => p.id ===productId);
        addToCart(selectedProduct);
    }
});

function calculateTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
}

function updateUI() {
  const cartCounter = document.querySelector(".cart-counter");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCounter) {
    cartCounter.textContent = totalItems;
  }

  console.log("Поточний кошик:", cart);
  console.log("Загальна сума:", calculateTotal(), "грн");
}

function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) { 
        existingItem.quantity +=1;
    } else {
        cart.push({ ...product, quantity:1});
    }
    updateUI();
}



async function initShop() {
  const loader = document.getElementById("loader");
  const container = document.querySelector(".products-grid");

  loader.classList.remove("hidden");
  container.innerHTML = "";

  try {
    const data = await fetchProducts();

    loader.classList.add("hidden");

    const htmlString = data
      .map(
        (product) => `
            <article class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">${product.price} грн</p>
            <button class="btn btn-buy" data-id="${product.id}">Купити</button>
        </article>
        `,
      )
      .join("");

    container.innerHTML = htmlString;
  } catch (error) {
    loader.classList.add("hidden");
    container.innerHTML = `<p class="error">Помилка: ${error.message}</p>`;
  }
}

initShop();