import { bookService } from '../services/book-service.js';

export default {
    props: [book],
    template: `
     <div class="book-review">
            <form class="review">
                <input type="text" id="fname" name="fname">
                <input  v-model.lazy="review.fromPrice" type="" placeholder="From...">
                <input  v-model.number.lazy="filterBy.toPrice" type="number" placeholder="To...">
                <button @click.prevent="filter">Filter price</button>
                <router-link class="btn-add" to="/book/edit" tag="button">Add a book</router-link>
            </form>
        </div>
    `,
    data() {
        return {
            review: {
                fName: '',
                numStars: 0,
                date: '',
                txt: ''
            }
        };
    },
    methods: {
        addReview() {
            this.$emit('reviewed', {...this.review });
        }
    }
}