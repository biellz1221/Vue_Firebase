<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="panel-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Link</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key='index'>
            <td>{{book.title}}</td>
            <td>{{book.author}}</td>
            <td><a v-bind:href="book.url" target="_blank">Comprar <span class="glyphicon glyphicon-share-alt"></span></a></td>
            <td>{{book.isbn}}</td>
            <td>
              <span class="glyphicon glyphicon-edit" @click="updateBook(book)"></span>
              <span class="glyphicon glyphicon-trash" style="color: crimson" @click="removeBook(book)"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ bookaction }}</h3>
      </div>
      <div class="panel-body">
         <form id="form" class="form-inline" @submit.prevent="addBook(edbook)">
          <div class="form-group">
            <label for="bookTitle">Title:</label>
            <input type="text" id="bookTitle" class="form-control" v-model="newBook.title">
          </div>
          <div class="form-group">
            <label for="bookAuthor">Author:</label>
            <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author">
          </div>
          <div class="form-group">
            <label for="bookUrl">Url:</label>
            <input type="text" id="bookUrl" class="form-control" v-model="newBook.url">
          </div>
          <div class="form-group">
            <label for="bookISBN">ISBN:</label>
            <input type="text" id="bookISBN" class="form-control" v-model="newBook.isbn">
          </div>
          <button class="btn btn-primary">{{ submitAction }}</button>
        </form>
        <button class="btn btn-danger" v-if="edbook.edit" @click="fazLimpa()">Cancelar</button>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-new */
import Firebase from 'firebase'
let fbConfig = {
  apiKey: "AIzaSyAViutLQp0zv28bv1PkXyg_vA5pLj58lj0",
  authDomain: "xpvuejsfirebase.firebaseapp.com",
  databaseURL: "https://xpvuejsfirebase.firebaseio.com",
  projectId: "xpvuejsfirebase",
  storageBucket: "xpvuejsfirebase.appspot.com",
  messagingSenderId: "397514491381"
};

let fbApp = Firebase.initializeApp(fbConfig)
let fbDB = fbApp.database()
let booksRef = fbDB.ref('books')
export default {
  name: 'fbApp',
  firebase: {
    books: booksRef
  },
  data: () => {
    return {
      newBook: {
        title: '',
        author: '',
        isbn: '',
        url: '',
        edit: false,
      },
      edbook: '',
      bookaction: 'Adicionar Livro',
      submitAction: 'Add Book'
    }
  },
  methods: {
    fazLimpa: function() {
        this.newBook.title = '';
        this.newBook.author = '';
        this.newBook.url = '';
        this.newBook.isbn = '';
        this.newBook.edit = false;
        this.edbook = '';
        this.bookaction = "Adicionar Livro"
        this.submitAction = "Add Book"
    },
    addBook: function (book) {
      if (book === '') {
        booksRef.push(this.newBook);
        this.fazLimpa();
      } else {
        booksRef.child(book['.key']).update({ 
          title: this.newBook.title,
          author: this.newBook.author,
          isbn: this.newBook.isbn,
          url: this.newBook.url,
          edit: false
        });
        this.fazLimpa();
      }
    },
    removeBook: function(book) {
      booksRef.child(book['.key']).remove();
    },
    updateBook: function(book) {
      this.newBook.edit = true;
      this.edbook = book;
      
      booksRef.child(book['.key']).update({ edit: true });

      this.newBook.title = book.title;
      this.newBook.author = book.author;
      this.newBook.url = book.url;
      this.newBook.isbn = book.isbn;

      this.bookaction = "Editando o Livro: "+this.newBook.title;
      this.submitAction = "Editar Livro"
    }
  }
}
</script>
