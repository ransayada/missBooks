import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'
import bookFilter from './../cmps/book-filter.cmp.js'
import bookDetails from './../pages/book-details.cmp.js'
import bookList from './../cmps/book-list.cmp.js'

export default {
    template: `
    <section class="book-app">
        <book-filter @filtered="setFilter" /> 
        <book-list  :books="booksToShow" @remove="removeBook"  /> 
    </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted successfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.loadBooks();
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        closeDetails() {
            this.selectedBook = null
        },
        // selectBook(book) {
        //     this.selectedBook = book;
        // },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const { title, toPrice, fromPrice } = this.filterBy
            const searchStr = title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= fromPrice &&
                    book.listPrice.amount <= toPrice || !toPrice
            });
            return booksToShow;
        }

    },
    components: {
        bookFilter,
        bookDetails,
        bookList
    }
}