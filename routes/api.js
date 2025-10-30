/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require('../models/schema');

module.exports = function (app) {

  app.route('/api/books')
    
    .post(async function (req, res){
      const { title } = req.body;

      if (!title) {
        return res.send({ error: 'missing required field title' });
      }

      try {
        const newBook = new Book ({
          title,
          comments: [],
        });

        const savedBook = await newBook.save();
        return res.json({ _id: savedBook._id, title: savedBook.title });
        
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'could not create a book' });
      }
    })

    .get(async function (req, res){
      try {
        const books = await Book.find({});

        if (books.length === 0) return res.send('no book exists');

        const formattedBooks = books.map(book => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        }));

        res.json(formattedBooks);
      } catch (error) {
        
      }
    })

    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    })



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
