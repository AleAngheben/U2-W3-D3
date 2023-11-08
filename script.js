const list = document.getElementById("book-list");

window.onload = () => {
  loadBooks();
};

const loadBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((resp) => resp.json())
    .then((books) => {
      // using books right away here
      createBooks(books);
      // Saving a reference for later use, without needing to fetch again
      outerBooks = books;
    })
    .catch((error) => console.log("errore nella letura libri", error));
};

function createBooks(books) {
  list.innerHTML = " ";

  books.forEach((book) => {
    list.innerHTML += `
    <div class="col">
      <div class="card shadow-sm h-100">
        <img src="${book.img}" class="img-fluid card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text badge rounded-pill bg-dark mb-2">${book.category}</p>
          <p class="fs-4">${book.price}€</p>
          <div>
              <button class="btn btn-danger" onclick="addToCart(event, '${book.asin}')">Compra ora</button>
              <button class="btn btn-outline-danger" onclick="skipMe(event)">Scarta</button>
          </div>
        </div>
      </div>
    </div>
`;
  });
}
