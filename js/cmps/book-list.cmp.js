import bookPreview from "./book-preview.cmp.js"

export default {
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container">
            <book-Preview :book="book" />
            <img class="sale-img" v-if="book.listPrice.isOnSale" src='./img/sale.png'/>
            <div class="actions">
                    <button @click="remove(book.id)" >X</button>
                    <router-link :to="'/book/'+book.id" tag="button">Details</router-link>
            </div>
        </li>
    </ul>
    `,
    methods: {
        select(book) {
            this.$emit('selected', book);
        },
        remove(bookId) {
            this.$emit('remove', bookId);
        }
    },
    components: {
        bookPreview
    }
}