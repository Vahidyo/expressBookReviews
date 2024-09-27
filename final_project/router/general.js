const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  const user = users.filter((user)=> user.username === username);
  
  if(user.length === 0 && username && password){
    users.push({"username" : username , "password" : password});
    res.send(`user ${username} successfuly created!`);
    console.log(users);
  }else{
    res.send("user not valid for registration")
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Get the book info by isbn
  isbn = req.params.isbn;
  book = books[isbn];
  if(book){
    return res.send(JSON.stringify(book,null,4));
  }else{
    return res.send("there is no book with this ISBN");
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  author = req.params.author;
  booksOfAuthor = [];
  
  for(let key in books){
    if(books[key].author === author){
      booksOfAuthor.push(books[key]);
  }}

  if( booksOfAuthor.length > 0 ){
    res.send(JSON.stringify(booksOfAuthor,null,4));
  }else{
    res.send("No books for the author")
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  title = req.params.title;
  let book = null;
  
  for(let key in books){
    if(books[key].title === title){
      book = books[key];
  }}
  

  if(book){
    res.send(JSON.stringify(book,null,4));
  }else{
    res.send("No books with this title")
  }
 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  isbn = req.params.isbn;
  book = books[isbn];
  
  if(book){
    return res.send(JSON.stringify(book.reviews,null,4));
  }else{
    return res.send("there is no book with this ISBN");
  }
});

module.exports.general = public_users;
