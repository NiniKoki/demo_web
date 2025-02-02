// script.js

// Form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting us!");
  });
  
  // Dynamic shop item loading (fetch example)
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const shopContainer = document.getElementById("shop-container");
      data.slice(0, 6).forEach((item) => {
        shopContainer.innerHTML += `
          <div class="product">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
          </div>
        `;
      });
    });
  