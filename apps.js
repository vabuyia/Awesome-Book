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
    
    const listedBooks = JSON.parse(localStorage.getItem('bookList') || '[]');
    listedBooks.push(book);
    localStorage.setItem('bookList', JSON.stringify(listedBooks));
  }
  
  deleteBook(id) {
    let listedBooks = JSON.parse(localStorage.getItem('bookList') || '[]');
    listedBooks = listedBooks.filter((book, index) => index !== parseInt(id, 10));
    localStorage.setItem('bookList', JSON.stringify(listedBooks));
  }
}
const theTitle = document.querySelector(".title").value;
const theAuthor = document.querySelector('.author').value;
const addBook = document.querySelector('#add');

const displayLibrary = () => {
  const listedBooks = JSON.parse(localStorage.getItem('bookList') || '[]');
  if (listedBooks.length === 0) {
    document.getElementsByClassName('listShow').innerHTML = `
    <div class="book">
      <span class="book-title">No books stored in library.</span>
    </div>`;
  } else {
    let codedBooks = '';
    for (let i = 0; i <= listedBooks.length; i++) {
      codedBooks += `
      <div class="book">
        <span class="book-title">${listedBooks[i].title}</span>
        <br>
        <span class="book-author">${listedBooks[i].author}</span>
        <br>
        <button class="remove-button" id="remove-button" data-index="${i}">Remove</button>
        <hr>
      </div>
      `;
    }
    document.getElementsByClassName('list-show').innerHTML = codedBooks;
    if (listedBooks.length > 0) {
      const deleteButton = document.querySelectorAll('#remove-button');
      deleteButton.forEach((deleteBtt) => {
        deleteBtt.addEventListener('click', () => {
          const aBook = new book('', '');
          aBook.deleteBook(deleteBtt.getAttribute('data-index'));
          displayLibrary();
        });
      });
    }
  }
};

addBook.addEventListener('click', () => {
  const newBook = new book(theTitle.value, theAuthor.value);
  newBook.addBook();
  displayLibrary();
});
