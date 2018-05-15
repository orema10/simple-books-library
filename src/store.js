import Vue from 'vue'
import Vuex from 'vuex'
import bookService from './service/book.service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  getters: {
    books(state) {
      return state.books;
    }
  },
  mutations: {
    setBooks(state, {books}) {
      state.books = books;
    },
    editBooks(state, {books}) {
      state.books = books;
    }
  },
  actions: {
    getBooks(store) {
      bookService.query()
      .then(books => {
        
        store.commit({type: 'setBooks', books})
      })
    },
    updateBooks(store, {books}) {
      store.commit({type: 'editBooks', books})
    }
  }
});