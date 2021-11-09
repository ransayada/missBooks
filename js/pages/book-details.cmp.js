import bookDescription from "../cmps/book-description.cmp.js";
import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/event-bus-service.js";
import addReview from '../cmps/add-review.cmp.js';


export default {
    template: `
    <div  v-if="book" class="book-details">
        <router-link :to="'/book/'+nextBookId">Next book ></router-link>
        <legend>Book Details:</legend>
        <router-link to="/book" tag="button">X</router-link>
        <h1>Title: {{book.title}}</h1>
        <h1>Author: {{book.author}}</h1>
        <h1>Number Of Pages: {{pageCountForShow}}</h1>
        <h1>Publish Date: {{publishedDateForShow}}</h1>
        <book-description :txt="book.description"/>
        <add-review />
        <fieldset class="reviews">
            <legend>Book Reviews:</legend>
            <div class="review"  v-for="(review, idx) in book.reviews" :key="review.id">
                <p><span>Review: </span>{{review.txt}}</p>
                <a class="close-btn" @click="removeReview(idx)">x</a>
                <p><span>Published date:</span> {{review.date}}</p>
                <p><span>Full Name: </span>{{review.fullName}}</p>
                <p><span>Rate: </span>{{review.rate}}</p>
            </div>
        </fieldset >   
    </div>
    <div v-else class="loader">
        <h2>Loading...</h2>
    </div>
    `,
    data() {
        return {
            book: null,
            nextBookId: null
        }
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);
    },
    methods: {
        saveReview(review) {
            bookService.addReview(review, this.book.id)
                .then(book => this.book = book)
                .then(() => {
                    const msg = {
                        txt: `The review on book: ${this.book.id}  was Added!`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    console.log('Error: ', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                })
        },
        removeReview(idx) {
            this.book.reviews.splice(idx, 1)
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: `Review was remove`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        }
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params.bookId;
                bookService.getById(bookId).then(book => this.book = book);
                bookService.getNextBookId(bookId).then(bookId => this.nextBookId = bookId)
            },
            immediate: true
        }
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
        bookDescription,
        addReview,
        eventBus
    }
}