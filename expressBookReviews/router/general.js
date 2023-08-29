const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users.hasOwnProperty(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    users[username] = password;

    return res.status(201).json({ message: "Customer successfully registered. Now you can login" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const bookList = JSON.stringify(books, null, 2);
    return res.status(200).send(bookList);
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; 
    if (books.hasOwnProperty(isbn)) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author; 
    const matchingBooks = [];

    for (let keys=1; keys<=10; keys++ ) {
        if (books[keys].author === author) {
            matchingBooks.push(books[keys]);
        }
    }

    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    } else {
        return res.status(404).json({ message: "Books by this author not found" });
    }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const matchingBooks = [];

    for (const isbn in books) {
        if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push(books[isbn]);
        }
    }

    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    } else {
        return res.status(404).json({ message: "Books with this title not found" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books.hasOwnProperty(isbn)) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
