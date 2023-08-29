const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    // Code to check if the username is valid
    return users.includes(username);
}

const authenticatedUser = (username, password) => {
    // Code to check if username and password match the one we have in records
    const user = users.find(users => users.username === username && users.password === password);
    return user !== undefined;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (isValid(username) || authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Sign a JWT token
    const token = jwt.sign({ username }, 'your_secret_key_here', { expiresIn: '1h' });

    return res.status(200).json({ message: "Customer successfully logged in", token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review; // Assuming the review is sent as a query parameter
    const token = req.headers.authorization; // Retrieve the token from headers
    const username = req.user.username; // Assuming req.user contains the authenticated user's information

    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }

    if (token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    if (!books.hasOwnProperty(isbn)) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check and verify the token
    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err || decoded.username !== username) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (!books[isbn].reviews) {
            books[isbn].reviews = {};
        }

        // Store or update the review for the book under the user's username
        books[isbn].reviews[username] = review;

        return res.status(200).json({ message: "Review added/modified successfully" });
    });
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username; // Assuming req.user contains the authenticated user's information

    if (!books.hasOwnProperty(isbn)) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found for this user" });
    }

    // Delete the user's review for the book
    delete books[isbn].reviews[username];

    return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
