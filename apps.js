class book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  };
  
  addBook() {
    const book = {
      title: this.title,
      author: this.author,
    };
    
    const listedBooks = JSON.parse(localStorage.getItem('bookList') || "[]");
    listedBooks.push(book);
    localStorage.setItem('bookList', JSON.stringify(listedBooks));
  };
  
  deleteBook(index) {
    let listedBooks = JSON.parse(localStorage.getItem('bookList') || '[]');
    listedBooks = listedBooks.filter((book, index) => index !== parseInt(id, 10));
    localStorage.setItem('bookList', JSON.stringify(listedBooks));
  }
}

const title = document.querySelector('.title').value;
const author = document.querySelector('.author').value;
const addBook = document.querySelector('.add');
const listShowContainer = document.querySelector('.listShow');

const displayLibrary = () => {
  const listedBooks = JSON.parse(localStorage.getItem('bookList') || "[]");
  if (listedBooks.length == 0) {
    document.getElementsByClassName('listShow').innerHTML = `
    <div class="book">
      <span class="book-title">No books stored in library.</span>
    </div>`;
  } else {
    let codedBooks = '';
    for (let i = 0; i <= bookList.length; i++) {
      codedBooks += `
      <div class="book">
        <span class="book-title">${bookList[i].title}</span>
        <br>
        <span class="book-author">${bookList[i].author}</span>
        <br>
        <button class="remove-button" id="remove-button" data-index="${i}">Remove</button>
        <hr>
      </div>
      `;
    }
    document.getElementsByClassName('list-show').innerHTML = codedBooks;
    if (listedBooks.length > 0) {
      const deleteButton = document.querySelectorAll('#remove-button');
      deleteButton.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
          const aBook = new book('', '');
          aBook.deleteBook(deleteButton.getAttribute('data-index'));
          displayLibrary();
        });
      });
    }
  }
};

addBook.addEventListener('click', () => {
  const newBook = new book(title.value, author.value);
  newBook.addBook();
  displayLibrary();
});
