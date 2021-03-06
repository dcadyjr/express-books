var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(request, response){
  //send all the books
  Book.find(function(error, books){
    response.json(books);
  });
})

router.get('/:id', function(request, response){
  //send specific book with that id
  var id = request.params.id;
  Book.findById(id, function(error, book){
    response.json(book);
  })
})

router.post('/', function(request, response){
  //create a new book
  var book = new Book({ name: request.body.name,
                        pages: request.body.pages,
                        author: request.body.author,
                        isbn: request.body.isbn
  });
  book.save();
  response.json(book);
})

router.patch('/:id', function(request, response){
  //update a book by id
  var id = request.params.id;
  Book.findById(id, function(error, book){
    book.name = request.body.name;
    book.pages = request.body.pages;
    book.author = request.body.author;
    book.isbn = request.body.isbn;
    book.save();
    response.json(book);
  })
})

router.delete('/:id', function(request, response){
  //delete a book by id
  var id = request.params.id;
  Book.findById(id, function(error,book){
    book.remove();
    response.json("success");
  })
})

module.exports = router;
