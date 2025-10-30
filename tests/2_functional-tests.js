/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Rose Madder'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body,'_id');
          })
        done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: ''
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error');
            assert.property(res.body.error, 'missing required field title');
         })
        done();
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'A resposta deve ser um array');
            if (res.body.length > 0) {
              assert.property(res.body[0], '_id');
              assert.property(res.body[0], 'title');
              assert.property(res.body[0], 'commentcount')
            }
          })
        done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        const fakeId = 'abcdef0123456789abcdef00';

        chai.request(server)
          .get('/api/books/' + fakeId)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'A resposta deve ser uma string');
            assert.equal(res.text, 'no book exists');
          })
        done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        // Cria um livro para ter id valido
        chai.request(server)
          .post('/api/books')
          .send({ title: 'Livro para teste automatizado' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            const id = res.body._id;
          
          // Faz o get com o id criado
          chai.request(server)
            .get('/api/books/' + id)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'A resposta deve ser um objeto');
              assert.property(res.body, '_id');
              assert.property(res.body, 'title');
              assert.property(res.body, 'comments');
              assert.isArray(res.body.comments, 'comments deve ser um array');
              assert.equal(res.body._id, id);
              assert.equal(res.body.title, 'Livro para teste automatizado');
              done();
            });
        });
      });     
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        //done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        //done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        //done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        //done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        //done();
      });

    });

  });

});
