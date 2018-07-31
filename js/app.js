function Book(title, author, isbn)  {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI()   {}

UI.prototype.addBookToList = function(book) {
    const table = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="delete">x</a></td>`;
    table.appendChild(row);
}

UI.prototype.clearInputs = function()   {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

document.querySelector('#book-form').addEventListener('submit', function(event) {
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    ui.addBookToList(book);
    ui.clearInputs();

    event.preventDefault();
});
