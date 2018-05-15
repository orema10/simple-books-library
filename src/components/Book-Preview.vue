<template>
    <section class="book-preview">
        <div class="bg-img"  :style="{ 'backgroundImage': 'url(' + book.img + ')' }"></div>
        <div class="details">
            <div>
                <p class="book-title">{{  book.title | textFilter  }}</p>
                <p class="book-author">{{ book.author }}</p>
                <p class="book-published">{{ book.published }}</p>
            </div>
            <div class="edit">
                <button class="edit-btn" @click="openBookEditor(book)">Edit</button>
                <button class="delete-btn" @click="deleteBook(book)">Delete</button>
            </div>
        </div>
        <book-edit :book="book"></book-edit>
    </section>
</template>

<script>

import bookEdit from './Book-Edit';

export default {
  props: ['book'],
  methods: {
    openBookEditor(book) {
      let elBook = document.getElementById(`${book.id}`);
      elBook.style.display = 'block';
    },
    deleteBook(book) {
      const isSure = confirm('Are you sure ?');
      if (isSure) {
        let books = this.$store.getters.books;
        const idx = books.findIndex(currBook => currBook.id === book.id);
        if(idx !== -1) {
          books.splice(idx, 1);
          this.$store.commit({ type: 'setBooks', books });
        }
      }
    }
  },
  filters: {
    textFilter(value) {
        let nonEnglish = value.replace(/[^a-zA-Z0-9]/g,' ');
        return nonEnglish.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }).replace(/\s+/g, ' ')
    }
  },
  components: {
    bookEdit
  }
};
</script>
