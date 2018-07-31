class Book  {
    constructor(title, author, isbn)    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI    {
    addBookToList(book) {
        const table = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="delete">x</a></td>`;
        table.appendChild(row);
    }
    showAlert(message, className) {
        const newDiv = document.createElement('div');
        newDiv.className = `alert ${className}`;
        newDiv.appendChild(document.createTextNode(message));
        document.querySelector('.container').insertBefore(newDiv, document.querySelector('#book-form'));
        setTimeout(function()   {
            document.querySelector('.alert').remove();
        }, 5000);
    }
    deleteBook(element)    {
        if (element.className === 'delete' && confirm('Are you sure?')) {
            element.parentElement.parentElement.remove();
        }
    }
    clearInputs()   {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

class Store {
    static getBooks()  {
        return localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
    }
    static displayBooks()    {
        const books = Store.getBooks();
        const ui = new UI();
        books.forEach(function(book)    {
            ui.addBookToList(book);
        });
    }
    static addBook(book)  {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn)    {
        const books = Store.getBooks();
        books.forEach(function(book, index)    {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function(event) {
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title !== '' && author !== '' && isbn !== '')   {
        ui.addBookToList(book);
        Store.addBook(book);
        ui.clearInputs();
        ui.showAlert('Book added successfully', 'success');
    }
    else    {
        ui.showAlert('Please fill all the fields first', 'error');
    }

    event.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(event)  {
   const ui = new UI();
   ui.deleteBook(event.target);
   Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
   ui.showAlert('Book deleted successfully', 'success');
   event.preventDefault();
});
