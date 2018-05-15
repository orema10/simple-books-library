<template>
        <section class="books-app" v-if="books">
            <h1 class="app-title">Books Library</h1>
            <books-list :books="books"></books-list>
        </section>

        <section v-else>
            <h1>Can't load this page!</h1>
        </section>
</template>

<script>
import booksList from './components/Books-List';
export default {
  computed: {
    books() {
      return this.$store.getters.books;
    }
  },
  created() {
    this.$store.dispatch({ type: "getBooks" });
  },
  components: {
    booksList
  }
};
</script>


<style>
  @import url('./css/style.css');
</style>
