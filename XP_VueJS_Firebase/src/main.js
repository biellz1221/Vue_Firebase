// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire);

Vue.config.productionTip = false

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  name: fbApp,
  firebase: {
    books: booksRef
  },
  router,
  template: '<App/>',
  components: { App }
})
