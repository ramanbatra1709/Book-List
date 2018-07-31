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

UI.prototype.showAlert = function(message, className) {
    const newDiv = document.createElement('div');
    newDiv.className = `alert ${className}`;
    newDiv.appendChild(document.createTextNode(message));
    document.querySelector('.container').insertBefore(newDiv, document.querySelector('#book-form'));
    setTimeout(function()   {
        document.querySelector('.alert').remove();
    }, 5000);
}

document.querySelector('#book-form').addEventListener('submit', function(event) {
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title !== '' && author !== '' && isbn !== '')   {
        ui.addBookToList(book);
        ui.clearInputs();
        ui.showAlert('Book added successfully', 'success');
    }
    else    {
        ui.showAlert('Please fill all the fields first', 'error');
    }

    event.preventDefault();
});
