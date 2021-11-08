export default {
    template: `
     <div class="book-filter">
            <div class="search">
                <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            </div>
            <form class="filter">
                <input  v-model.number.lazy="filterBy.fromPrice" type="number" placeholder="From...">
                <input  v-model.number.lazy="filterBy.toPrice" type="number" placeholder="To...">
                <button @click.prevent="filter">Filter price</button>
                <router-link class="btn-add" to="/book/edit" tag="button">Add a book</router-link>
            </form>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: '',
                toPrice: Infinity
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        }
    }
}