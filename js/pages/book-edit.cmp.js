import { bookService } from '../services/book-service.js';

export default {
    template: `
        <section class="book-edit">
            <form v-if="bookToEdit" @submit.prevent="save" >
                <input v-model="bookToEdit.title" type="text" placeholder="Title">
                <input v-model.number="bookToEdit.publishDate" type="number" placeholder="Publish Date">
                <input v-model.number="bookToEdit.pageCount" type="number" placeholder="Page Count">
                <input v-model.number="bookToEdit.listPrice.amount" type="number" placeholder="Price">
                <input v-model.boolean="bookToEdit.listPrice.isOnSale" type="boolean" placeholder="On Sale?">
                <button>Add Book</button>
            </form>
        </section>
    `,
    data() {
        return {
            bookToEdit: null
        };
    },
    created() {
        const { bookId } = this.$route.params;
        if (bookId) {
            bookService.getById(bookId)
                .then(book => this.bookToEdit = book)
        } else {
            this.bookToEdit = bookService.getEmptyBook();
        }
    },
    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(book => this.$router.push('/book'));
        }
    }
};