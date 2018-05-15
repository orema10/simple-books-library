<template>
    <section :id="book.id" class="modal">
        <span class="close" @click="closeModal()">&times;</span> 
        <form @submit.prevent="editBook(bookToEdit)" class="modal-content animate">
            <h1>Edit Panel</h1>
            <div class="edit-area">
                <section class="book-edit-area" v-if="bookToEdit">
                    <div class="edit-area"> <span>Title: </span><input type="text" v-model="bookToEdit.title"  maxlength="30" required /></div>
                    <div class="edit-area"> <span>Author: </span><input type="text" v-model="bookToEdit.author" maxlength="30" required /></div>
                    <div class="edit-area"> <span>Published: </span><input type="date" v-model="bookToEdit.published" required /></div>
                    <div class="edit-area"> <span>Img: </span><input type="text" v-model="bookToEdit.img" required /></div>
                </section>
                <section class="book-preview display">
                    <div class="bg-img"  :style="{ 'backgroundImage': 'url(' + bookToEdit.img + ')' }"></div>
                    <div class="details">
                        <div>
                            <p class="book-title">{{ bookToEdit.title | textFilter }}</p>
                            <p class="book-author">{{ bookToEdit.author }}</p>
                            <p class="book-published">{{ bookToEdit.published }}</p>
                        </div>
                        <div class="edit">
                            <button type = "button" class="edit-btn btn-display">Edit</button>
                            <button type = "button" class="delete-btn btn-display">Delete</button>
                        </div>
                    </div>
                </section>
            </div>
            <button type="submit" class="save-btn">Save</button>
        </form>
    </section>
</template>

<script>
import bookService from '../service/book.service'
export default {
    props: ['book'],
    data() {
        return {
            bookToEdit: null
        }
    },
    created() {
        this.bookToEdit = JSON.parse(JSON.stringify(this.book));
    },
    methods: {
        closeModal() {
            let elBook = document.getElementById(`${this.book.id}`);
            elBook.style.display = 'none';
        },
        editBook(book) {
            let books = this.$store.getters.books;
            const idx = books.findIndex(currBook => currBook.id === book.id);
            books.splice(idx, 1, book);
            this.$store.dispatch({type: 'updateBooks', books});
            this.closeModal();
            this.bookToEdit = JSON.parse(JSON.stringify(books[idx]));
        }
    },
    filters: {
    textFilter(value) {
        let nonEnglish = value.replace(/[^a-zA-Z0-9]/g,' ');
        return nonEnglish.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }).replace(/\s+/g, ' ')
    }
  }

}
</script>
