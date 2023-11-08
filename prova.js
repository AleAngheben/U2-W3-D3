const booksWrapper = document.querySelector("#books-wrapper");
const shoppingCart = document.querySelector("#shopping-cart");

let outerBooks = [];
let shoppingCartList = JSON.parse(localStorage.getItem("shoppingCart")) || [];

window.onload = () => {
  loadBooks();
  loadShoppingCart();
};

const loadBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((resp) => resp.json())
    .then((books) => {
      // using books right away here
      displayBooks(books);
      // Saving a reference for later use, without needing to fetch again
      outerBooks = books;
    })
    .catch((err) => console.error(err.message));
};

function displayBooks(books) {
  booksWrapper.innerHTML = "";

  books.forEach((book) => {
    const isBookInCart =
      shoppingCartList.findIndex(
        (cartBook) => cartBook.title === book.title
      ) !== -1;

    booksWrapper.innerHTML += `
    <div class="col">
      <div class="card shadow-sm h-100 ${isBookInCart ? "selected" : ""}">
        <img src="${book.img}" class="img-fluid card-img-top" alt="${
      book.title
    }">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text badge rounded-pill bg-dark mb-2">${
            book.category
          }</p>
          <p class="fs-4">${book.price}€</p>
          <div>
              <button class="btn btn-danger" onclick="addToCart(event, '${
                book.asin
              }')">Compra ora</button>
              <button class="btn btn-outline-danger" onclick="skipMe(event)">
                Scarta
              </button>
          </div>
        </div>
      </div>
    </div>
  `;
  });
}
