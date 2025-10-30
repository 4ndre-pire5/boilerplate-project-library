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
        console.error(error);
        res.status(500).send({ error: 'error fetching a book' });
      }
    })

    .delete(async function(req, res){
      try {
        await Book.deleteMany({});

        return res.json({ result: 'complete delete sucessful' });

      } catch (error) {
        console.error(error);
        return res.json({ error: 'could not delete all books' });
      }
    })

  app.route('/api/books/:id')
    .get(async function (req, res){
      const { id } = req.params;

      try {
        const book = await Book.findById(id);

        if (!book) {
          return res.send('no book exists');
        }

        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'error fetching a book' });
      }

    })
    
    .post(async function(req, res){
      const { id } = req.params;
      const { comment } = req.body;

      if (!comment) {
        return res.send({ error: 'missing required field comment' });
      }

      try {

        const book = await Book.findById(id);

        if (!book) return res.send('no book exists');

        book.comments.push(comment);
        await book.save();

        //const commentsObject = Object.assign({}, book.comments);

        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length
        })
        
      } catch (error) {
        console.error(error);
        res.send({ error: 'no book exists' });
      }
    })
    
    .delete(async function(req, res){
      const { id } = req.params;

      if (!id) return res.json({ error: 'no book exists' });

      try {
        const deleted = await Book.findByIdAndDelete(id);

        if(!deleted) return res.json({ error: 'coul not delete' });
        return res.json({ result: 'delete sucessful' });

      } catch (error) {
        console.error(error);
        return res.json({ error: 'no book exists' });
      }
    });
  
};
