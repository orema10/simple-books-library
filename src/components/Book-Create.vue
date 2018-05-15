<template>
  <section id="new-book" class="modal">
        <span class="close" @click="closeModal()">&times;</span> 
        <form @submit.prevent="saveBook(book)" class="modal-content animate">
            <h1>Create Book</h1>
            <div class="create-area">
                <section class="book-edit-area" v-if="book">
                    <div class="edit-area"> <span>Title: </span><input type="text" v-model="book.title" maxlength="30" required /></div>
                    <div class="edit-area"> <span>Author: </span><input type="text" v-model="book.author" maxlength="30" required /></div>
                    <div class="edit-area"> <span>Published: </span><input type="date" v-model="book.published" required /></div>
                    <div class="edit-area"> <span>Img: </span><input type="web" v-model="book.img" required /></div>
                </section>
                <section class="book-preview display">
                    <div class="bg-img"  :style="{ 'backgroundImage': 'url(' + book.img + ')' }"></div>
                    <div class="details">
                        <div>
                            <p class="book-title">{{ book.title | textFilter }}</p>
                            <p class="book-author">{{ book.author }}</p>
                            <p class="book-published">{{ book.published }}</p>
                        </div>
                        <div class="edit">
                            <button type = "button" class="edit-btn" style="opacity: 0.3;">Edit</button>
                            <button type = "button" class="delete-btn" style="opacity: 0.3;">Delete</button>
                        </div>
                    </div>
                </section>
            </div>
            <button type="submit" class="save-btn">Save</button>
        </form>
    </section>
</template>

<script>
import bookService from '../service/book.service';
export default {
    data() {
        return {
            book: null
        }
    },
    created() {
        this.book = bookService.getEmptyBook();
    },
    methods: {
        closeModal() {
            let elBook = document.querySelector('#new-book');
            elBook.style.display = 'none';
        },
        saveBook(book) {
            let books = this.$store.getters.books;
            const bookIndex = books.findIndex(currBook => currBook.title === book.title);
            if(bookIndex === -1) {
                books.push(book);
                this.$store.dispatch({type: 'updateBooks', books})
                this.closeModal();
                this.book = bookService.getEmptyBook();
            } else {
                alert('The name of the book exists in the database');
            }
        }
    },
    filters: {
        textFilter(title) {
            let nonEnglish = title.replace(/[^a-zA-Z0-9]/g,' ');
            return nonEnglish.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }).replace(/\s+/g, ' ')
        }
    }
}
</script>