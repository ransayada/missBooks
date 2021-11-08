import longText from "../cmps/long-text.cmp.js";
import { bookService } from "../services/book-service.js";


export default {
    template: `
    <div  v-if="book" class="book-details">
        <router-link to="/book" tag="button">X</router-link>
        <h1>{{book.title}}</h1>
        <h1>{{pageCountForShow}}</h1>
        <h1>{{publishedDateForShow}}</h1>
        <long-text :txt="book.description"/>
        <img class="sale-img" v-if="book.listPrice.isOnSale" src='./../img/sale.png'/>
        
    </div>
    <div v-else class="loader">
        <h2>Loading...</h2>
    </div>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);
    },
    computed: {
        pageCountForShow() {
            if (this.book.pageCount < 100) return 'Light Reading'
            if (this.book.pageCount > 200 && this.pageCount < 500) return 'Decent Reading'
            if (this.book.pageCount > 500) return 'Long reading'
            return ''
        },
        publishedDateForShow() {
            if ((new Date().getFullYear() - this.book.publishedDate) > 10) return 'Veteran Book'
            if ((new Date().getFullYear() - this.book.publishedDate) < 1) return 'New!'

        },
        pageCountStyle() {
            return { red: this.book.listPrice.amount > 150, green: this.book.listPrice.amount < 20 }
        }
    },
    components: {
        longText
    }
}