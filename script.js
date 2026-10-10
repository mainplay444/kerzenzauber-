"use strict";

const shopEmail = "HIER_E-MAIL_EINFUEGEN";

const products = [
  {
    name: "Kerze Wolkenseide",
    price: 5.00,
    description: "Ein sanfter Lichtblick für entspannte Momente.",
    image: "HIER_FOTO_URL_EINFUEGEN",
    link: "https://buy.stripe.com/test_dRm14ogqqe3x2Fc3Ep00000",
    bg: "#eee1d1",
    wax: "#f2d9b9"
  },
  {
    name: "Kerze Kaffeepause",
    price:  5.00,
    description: "Für gemütliche Pausen und kleine Auszeiten.",
    image: "HIER_FOTO_URL_EINFUEGEN",
    link: "https://buy.stripe.com/test_14A3cwgqq0cH4Nk5Mx00002",
    bg: "#f0dedc",
    wax: "#e6b9b4"
  },
  {
    name: "Kerze Vanilletraum",
    price: 5.00,
    description: "Ein Hauch von Wärme für dein Zuhause.",
    image: "HIER_FOTO_URL_EINFUEGEN",
    link: "https://buy.stripe.com/test_8x200kfmm4sX4Nk0sd00005",
    bg: "#e3e7d9",
    wax: "#d2d9c4"
  },
  {
    name: "Kerze Rosengarten",
    price: 5.00,
    description: "Ein romantischer Akzent für besondere Momente.",
    image: "HIER_FOTO_URL_EINFUEGEN",
    link: "https://buy.stripe.com/test_8x200k2zA9Nh6Vsfn700006",
    bg: "#efe4c9",
    wax: "#ead5a4"
  },
  {
    name: "Kerze Waldzauber",
    price: 5.00,
    description: "Inspiriert von der Schönheit der Natur.",
    image: "HIER_FOTO_URL_EINFUEGEN",
    link: "https://buy.stripe.com/test_eVqfZifmm0cH5Rofn700007",
    bg: "#eadfe9",
    wax: "#d8c1d9"
  },
  {
    name: "Kerze Goldener Abend",
    price: 5.00,
    description: "Ein warmes Licht für entspannte Abende.",
    image: "HIER_FOTO_URL_EINFUEGEN",
    link: "https://buy.stripe.com/test_00w9AUa22aRl4NkcaV00009",
    bg: "#f0e0d4",
    wax: "#e6bfa9"
  }
];

const container = document.getElementById("products");

function formatPrice(price) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}

function renderProducts() {
  if (!container) return;

  container.replaceChildren();

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageArea = document.createElement("div");
    imageArea.className = "product-image";
    imageArea.style.setProperty("--product-bg", product.bg);
    imageArea.style.setProperty("--wax", product.wax);

    if (
      product.image &&
      product.image !== "HIER_FOTO_URL_EINFUEGEN"
    ) {
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.loading = "lazy";

      img.addEventListener("error", () => {
        img.remove();
        const placeholder = document.createElement("div");
        placeholder.className = "image-placeholder";
        placeholder.textContent = "Bild konnte nicht geladen werden";
        imageArea.appendChild(placeholder);
      });

      imageArea.appendChild(img);
    } else {
      const candle = document.createElement("div");
      candle.className = "candle-art";
      candle.setAttribute("role", "img");
      candle.setAttribute("aria-label", product.name);

      const placeholder = document.createElement("div");
      placeholder.className = "image-placeholder";
      placeholder.textContent = "HIER FOTO URL EINFÜGEN";

      imageArea.append(candle, placeholder);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = product.description;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const buy = document.createElement("a");
    buy.className = "button";
    buy.href = product.link;
    buy.target = "_blank";
    buy.rel = "noopener noreferrer";
    buy.textContent = "Jetzt kaufen";

    const add = document.createElement("button");
    add.className = "button-secondary";
    add.type = "button";
    add.textContent = "In den Warenkorb";

    add.addEventListener("click", () => {
      add.textContent = "Hinzugefügt ✓";
      add.setAttribute("aria-label", product.name + " hinzugefügt");

      const status = document.createElement("p");
      status.className = "cart-status";
      status.setAttribute("role", "status");
      status.textContent =
        product.name + " wurde ausgewählt. " +
        "Bitte nutze „Jetzt kaufen“, um dieses Produkt separat zu bezahlen.";

      const previous = actions.querySelector(".cart-status");
      if (previous) previous.remove();

      actions.appendChild(status);
    });

    actions.append(buy, add);
    info.append(title, description, price, actions);
    card.append(imageArea, info);
    container.appendChild(card);
  });
}

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("customer-email").value.trim();
    const message = document.getElementById("customer-message").value.trim();
    const status = document.getElementById("contact-status");

    if (!shopEmail || shopEmail === "HIER_E-MAIL_EINFUEGEN") {
      status.textContent =
        "Bitte trage zuerst deine E-Mail-Adresse im script.js ein.";
      return;
    }

    const subject = encodeURIComponent("Nachricht über Kerzenzauber");
    const body = encodeURIComponent(
      "Kunden-E-Mail: " + email + "\n\nNachricht:\n" + message
    );

    status.textContent =
      "Dein E-Mail-Programm wird geöffnet. Bitte sende die Nachricht dort ab.";

    window.location.href =
      "mailto:" + shopEmail +
      "?subject=" + subject +
      "&body=" + body;
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

renderProducts();