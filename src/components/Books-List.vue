<template>
  <section class="books-list">
        <button @click="openBookCreator" class="new-book-btn"><h1>+</h1></button>
        <ul>
            <li v-for="book in books" :key="book.name"><book-preview :book="book"></book-preview></li>
        </ul>
        <book-create></book-create>
    </section> 
</template>

<script>
import bookPreview from './Book-Preview';
import bookCreate from './Book-Create';
export default {
    props: ['books'],
    methods: {
        openBookCreator() {
            let elBook = document.querySelector('#new-book');
            elBook.style.display = 'block';
        }
    },
    components: {
        bookPreview,
        bookCreate
    }
};
</script>
